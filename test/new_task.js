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
    let msg = process.argv.slice(2).join(' ') || "Hello, World!";
    ch.assertQueue(q, {durable : true});
    ch.sendToQueue(q, new Buffer(msg), {persistent : true});
    console.log(' [x] sent "%s"', msg);
  });
  setTimeout( () => { conn.close(); process.exit(0); }, 500);
})
