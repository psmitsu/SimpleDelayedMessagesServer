const express = require('express'),
      logger = require('morgan'),
      handleMessage = require('./modules/handleMessage.js'),
      deleteMessage = require('./modules/deleteMessage.js');

let app = express();
let port = process.env.port || 3000;

app.use(logger('dev'));

app.listen(port, (err) => {
  if (err) {
    console.log("Error: %s", err.message);
    process.exit(1);
  }
  console.log(`App listening on port ${port}`);
});

app.get('/', (req, res) => {
  const message = "Usage: make request to /send with parameters msg='yourtext' and time='your time'<br>To delete message make request /delete with key='yourkey' parameter";
  res.send(message);
})

app.get('/send', (req, res) => {
  let message = req.query.msg,
      time = req.query.time;
  let key = handleMessage(message, time);
  let result;
  if (typeof message !== 'undefined' && message !== '' && typeof time !== 'undefined' && time !== '') {
    result = { 'error' : null, 'response' : "Message was added succesfully", 'message' : message, 'key' : key};
  }
  else {
    res.status(400);
    result = { 'error' : true, 'message' : 'Wrong data'}
  }
  res.json(result);
})

app.get('/delete', (req, res) => {
  let key = req.query.key;
  let isDeleted, result;
  if (typeof key !== 'undefined' && key !== '') {
    isDeleted = deleteMessage(key);
  }
  else {
    res.status(400);
    result = { 'error' : true, 'message' : "Wrong request" };
    res.send(result);
    return;
  }
  let message = "Message was ";
  isDeleted ? message += "deleted" : message += "not deleted";
  result = { 'error' : null, 'message' : message};
  res.json(result);
})
