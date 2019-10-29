const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h1>Lambda Posts API</h1>`);
});

server.use('/api/posts', postsRouter);

const port = 4000;

server.listen(port, () => {
    console.log(`\n*** Server running on port ${port} ***\n`);
});