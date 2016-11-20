const RSMQWorker = require('rsmq-worker');

let worker = new RSMQWorker(process.argv[2]);

worker.on("message", ( msg, next, id ) => {
  console.log("Message id: " + id);
  console.log(msg);
  next();
})

worker.on('error', ( err, msg ) => {
      console.log( "ERROR", err, msg.id );
});

worker.on('exceeded', ( msg ) => {
      console.log( "EXCEEDED", msg.id );
});

worker.on('timeout', ( msg ) => {
      console.log( "TIMEOUT", msg.id, msg.rc );
});

worker.start();
