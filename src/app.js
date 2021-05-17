const app = require('express')();
const Correios = require('../lib/correios.scraper');

app.get('/v1/cep/:value', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

  const { value } = req.params;

  const client = await Correios.init();
  const data = await client.fetch(value)
  await client.close();

  res.json(data);
});

app.get('/v2/cep/:value', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

  const { value } = req.params;

  try {
    const data = await Correios.fetchBySoapService(value);
    res.json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = app;
