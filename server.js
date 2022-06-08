//install dependencies
const express = require("express");



//express
const app = express();
const PORT = process.env.PORT || 3001;

//linkup to assets (HTML, CSS)
app.use(express.static('public'));

//routes
const viewHTML = require('./routes/view-html')(app);
const writeAPI = require('./routes/write-api')(app);

//data parsing via middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(viewHTML);
app.use(writeAPI);

app.listen(PORT, () => {
    console.log(`Application active and listening on localhost:${PORT}.`)
});


