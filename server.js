const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression());

app.use('/', express.static('./dist'));

app.listen(3030, () => {
  console.log(`Ready at http://localhost:3030`);
});
