const RedisSMQ = require('rsmq');

module.exports = function(queueName) {
  let p = new Promise( (resolve, reject) => {
    let module = {};
    let rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

    rsmq.createQueue({qname: queueName}, (err, resp) => {
      if (resp===1) {
        console.log("queue created");

        module.rsmq_handler = rsmq;
        module.qname = queueName;

        resolve(module);
      }
      if (err) {
        console.log("error: " + err.message);
        reject(err);
      }
    });
  })
  
  return p;
}
