const express = require('express');
const cons = require('consolidate');

const app = require('./src/app');
const port = 3000

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('page');
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
