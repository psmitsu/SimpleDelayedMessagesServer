const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  if (err) {
    console.log(error.toString());
    process.exit(1);
  }
  conn.createChannel( (err, ch) => {
    if (err) {
      console.log(error.toString());
      process.exit(1);
    }
    let q = 'task_queue';

    ch.assertQueue(q);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, (msg) => {
      let secs = msg.content.toString().split('.').length - 1;
      console.log(" [x] Recieved %s", msg.content.toString());
      setTimeout( () => {
        console.log(" [x] Done");
      }, secs * 1000);
    }, {noAck : true});
  });
})
