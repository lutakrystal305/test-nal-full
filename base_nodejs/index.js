require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const router = require('./src/router/posts.router');

const password = process.env.PASSWORD;

//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
//mongoose.set('useCreateIndex', true);
//mongoose.set('useUnifiedTopology', true);

const server = require('http').createServer(app);

app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/post', router);

const port = process.env.PORT || 9999;

server.listen(port, () => {
  console.log('listen on port ', port);
});
//npm run dev
