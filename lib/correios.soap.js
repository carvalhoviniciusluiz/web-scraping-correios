const fetch = require('node-fetch')

const fetchByZipCode = async (cep) => {
  const baseUrl = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente'
  const options = {
    method: 'POST',
    body: `<?xml version="1.0"?>\n
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">\n
        <soapenv:Header />\n
        <soapenv:Body>\n
          <cli:consultaCEP>\n
            <cep>${cep}</cep>\n
          </cli:consultaCEP>\n
        </soapenv:Body>\n
      </soapenv:Envelope>`,
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      'cache-control': 'no-cache'
    },
    timeout: 30000
  }

  try {
    const res = await fetch(baseUrl, options);
    return parseSuccess(res);
  } catch(e) {
    throwError(e)
  }
}

const parseSuccess = async (response) => {
  try {
    const xmlString = await response.text();

    if (response.ok) {
      return parseSuccessXML(xmlString);
    }

    const errorMessage = extractErrorMessage(xmlString);

    throw new Error(errorMessage);
  } catch(e) {
    throwError(e)
  }
}

const parseSuccessXML = (xmlString) => {
  try {
    const returnStatement = xmlString.replace(/\r?\n|\r/g, '').match(/<return>(.*)<\/return>/)[0] ?? ''
    const cleanReturnStatement = returnStatement.replace('<return>', '').replace('</return>', '')
    const parsedReturnStatement = cleanReturnStatement
      .split(/</)
      .reduce((result, exp) => {
        const splittenExp = exp.split('>')
        if (splittenExp.length > 1 && splittenExp[1].length) {
          result[splittenExp[0]] = splittenExp[1]
        }
        return result
      }, {})

    return parsedReturnStatement
  } catch (e) {
    throw new Error('Não foi possível interpretar o XML de resposta.')
  }
}

const extractErrorMessage = (xmlString) => {
  try {
    const returnStatement = xmlString.match(/<faultstring>(.*)<\/faultstring>/)[0] ?? ''
    const cleanReturnStatement = returnStatement.replace('<faultstring>', '').replace('</faultstring>', '')
    return cleanReturnStatement
  } catch (e) {
    throw new Error('Não foi possível interpretar o XML de resposta.')
  }
}

function throwError (error) {
  const serviceError = new Error(
    typeof error === 'string' ? error : error.message
  )

  if (error.name === 'FetchError') {
    serviceError.message = 'Erro ao se conectar com o serviço dos Correios.'
  }

  throw serviceError
}

module.exports = fetchByZipCode;
