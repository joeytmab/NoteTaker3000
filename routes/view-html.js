const path = require('path');
const router = require('express').Router();


//GET routes

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () => {
    console.log(`Application active and listening on localhost:${PORT}.`)
});

module.exports = router;