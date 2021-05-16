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

module.exports = app;
