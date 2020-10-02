const express = require('express');
const path = require('path');
const getLinks = require('./src/getLinks');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => index);

app.get('/api/external-links', async (req, res) => {
    const data = await getLinks(req.query.url);
    res.json(data)
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})