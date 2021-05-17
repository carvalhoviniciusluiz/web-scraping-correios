const fetchBySoapService = require('./correios.soap');

const baseUrl = 'https://buscacepinter.correios.com.br/app/endereco/index.php?t';

const Correios = {
  browser: null,
  page: null,

  bootstrap: async () => {
    let chrome = {};
    let puppeteer;

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      chrome = require('chrome-aws-lambda');
      puppeteer = require('puppeteer-core');
    } else {
      puppeteer = require('puppeteer');
    }

    try {
      Correios.browser = await puppeteer.launch(process.env.AWS_EXECUTION_ENV ? {
        args: [...chrome?.args , '--start-maximized'],
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      } : {
        args: ['--start-maximized'],
        headless: true,
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  init: async () => {
    await Correios.bootstrap();
    Correios.page = await Correios.browser.newPage();

    return Correios;
  },

  fetch: async (cep) => {
    await Correios?.page?.goto(baseUrl, { waitUntil: ['networkidle0'] });
    await Correios?.page?.type('#endereco', cep);

    Correios?.page?.click('#btn_pesquisar');

    await Correios?.page?.waitForTimeout(2000);

    const response = await Correios?.page?.evaluate(() => {
      const normalize = (value) => value?.toLowerCase().replace('/', '_')

      const content = [];
      const titles = document.querySelectorAll('#resultado-DNEC thead th');
      const lines = document.querySelectorAll('#resultado-DNEC tbody tr');

      lines?.forEach(tr => {
        const address = {};
        const columns = tr?.querySelectorAll('td');

        for (let i = 0; i < 4; i++) {
          address[normalize(titles[i]?.textContent)] = columns[i]?.textContent;
        }
        content.push(address);
      })
      return content;
    });

    return response;
  },

  fetchBySoapService,

  close: async () => {
    await Correios.browser.close();
  }
}

module.exports = Correios;
