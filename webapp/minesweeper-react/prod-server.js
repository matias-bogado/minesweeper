const express = require('express');
const server = express();
const port = process.env.PORT || '9001';

server
  .disable('x-powered-by')
  .use(express.static('./build'))
  .get('/*', (req, res) => {
    res.status(404).send('404'); // We only serve the public folder.
  });

server.listen(port, function () {
  console.log(`$Minesweeper running on port ${port}`);
});

