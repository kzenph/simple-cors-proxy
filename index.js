const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/*', (req, res) => {
  const targetUrl = req.originalUrl.slice(1); // remove initial slash
  if (!targetUrl.startsWith('http')) {
    return res.status(400).send('Invalid URL');
  }

  req.pipe(request(targetUrl)).pipe(res);
});

app.listen(PORT, () => {
  console.log(`CORS Proxy running on port ${PORT}`);
});
