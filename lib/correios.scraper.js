const puppeteer = require('puppeteer');

const baseUrl = 'https://buscacepinter.correios.com.br/app/endereco/index.php?t';

const Correios = {
  browser: null,
  page: null,

  init: async () => {
    const launchOptions = { headless: true, args: ['--start-maximized'] };

    Correios.browser = await puppeteer.launch(launchOptions);
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

        address[normalize(titles[0]?.textContent)] = columns[0]?.textContent;
        address[normalize(titles[1]?.textContent)] = columns[1]?.textContent;
        address[normalize(titles[2]?.textContent)] = columns[2]?.textContent;
        address[normalize(titles[3]?.textContent)] = columns[3]?.textContent;

        content.push(address);
      })

      return content;
    });

    return response;
  }
}

module.exports = Correios;
