const express = require('express')
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const passport = require('passport');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------SESSION SETUP -----
 */

app.use(session({
  store: new PgSession({
    tableName: 'sessions'
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000* 60 * 60 * 24
  }
}));

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());


const routes = require('./routes/index');

routes(app);


app.use('/', express.static('./client/build'));

const port = 3050;
app.listen(port, () => { console.log('Server is running') });

exports.app = app;