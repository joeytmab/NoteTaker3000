//install dependencies
const express = require("express");



//express
const app = express();
const PORT = process.env.PORT || 3001;

//linkup to assets (HTML, CSS)
app.use(express.static('public'));

//routes
app.use(require('./routes/view-html'));
app.use(require('./routes/write-api'));

//data parsing via middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Application active and listening on localhost:${PORT}.`)
});


