const app = require('express')();
const Correios = require('../lib/correios.scraper');

app.get('/v1/cep/:term', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

  const { term } = req.params;

  const client = await Correios.init();
  const data = await client.fetch(term);
  res.json(data);
});

app.get('/', (req, res) => {
  const wellcome = `
  <h1>Acessando o webservice de CEP dos correios</h1>

  <p>Para acessar o webservice, um CEP no formato de {8} digitos ou um endereco deve ser fornecido, por exemplo: "01001000" ou "0100"</p>

  <p>Exemplo de pesquisa por CEP: <a href="http://localhost:3000/v1/cep/68900075" target="__blank">http://localhost:3000/v1/cep/68900075</a></p>

  <p>Exemplo de pesquisa por Endereco: <a href="http://localhost:3000/v1/cep/1852" target="__blank">http://localhost:3000/v1/cep/1852</a></p>

  <p>Caso tenha duvidas utilize a plataforma dos correios <a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t" target="__blank">https://buscacepinter.correios.com.br/app/endereco/index.php?t</a> para facilitar o entendimento.</p>
  `;

  res.end(wellcome)
})

module.exports = app;
