require('dotenv').config()
const express = require ('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const http = require ('http');
const cors = require ('cors');
const { routes } = require ('./src/routes/index.js');

// setup database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo OK'))
    .catch((err) => console.log('Mongo error', err));

// init app
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

routes.forEach((item) => {
    app.use(`/api/v1/${item}`, require(`./src/routes/${item}`));
});

// create routes
const PORT = 3000
http.createServer({}, app).listen(PORT);
console.log(`Server running at ${PORT}`);