const RedisSMQ = require("rsmq");
let rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );

rsmq.deleteQueue({qname : process.argv[2]});
