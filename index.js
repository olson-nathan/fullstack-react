const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({
        hi: 'there'
    });
});
// constant getting PORT for process.env
// use 5000 for development default
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});