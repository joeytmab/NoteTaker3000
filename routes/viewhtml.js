const path = require('path');
//const router = require('express').Router();



//GET routes
module.exports = function(app) {

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

}

//module.exports = router;
