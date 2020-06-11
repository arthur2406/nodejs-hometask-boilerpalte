const express = require('express')
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'config/.env') });

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/index');
routes(app);


app.use('/', express.static('./client/build'));

const port = 3050;
app.listen(port, () => {console.log('Server is running')});

exports.app = app;