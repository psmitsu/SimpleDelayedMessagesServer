const express = require('express'),
      logger = require('morgan'),
      handleMessage = require('./modules/handleMessage.js'),
      deleteMessage = require('./modules/deleteMessage.js'),
      rsmqPromise = require('./modules/establishRSMQ.js')(process.argv[2]);

rsmqPromise.then( (rsmq) => {

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
    const message = "Usage: make request to /send with parameters msg='yourtext' and time='your time(in seconds)'<br>To delete message make request /delete with key='yourkey' parameter";
    res.send(message);
  })

  app.get('/send', (req, res) => {
    let message = req.query.msg,
        time = req.query.time;
    if (typeof message === 'undefined' || message === '' || typeof time === 'undefined' || time === '') {
      let result = { 'error' : true, 'message' : 'Wrong data'};
      res.status(400);
      res.json(result);
      return;
    }
    handleMessage(message, time, rsmq).then( (key) => {
      res.json( {'error' : null, 'message' : message, 'key' : key} );
    }, (err) => {
      res.status(500);
      res.json( {'error' : true, 'message' : err.message} );
    })

  })

  app.get('/delete', (req, res) => {
    let key = req.query.key;
    if (typeof key === 'undefined' || key === '') {
      res.status(400);
      res.json( {'error' : true, 'message' : 'Wrong key parameter'} );
      return;
    }
    deleteMessage(key, rsmq).then( (yes) => {
      result = { 'error' : null, 'message' : "Message was deleted"};
      res.json(result);
    }, (err) => {

      res.status(400);
      result = { 'error' : true, 'message' : err.message };
      res.json(result);

      return;
    });

  })
}, (err) => {
  console.log(err.message);
})
