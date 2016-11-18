module.exports = function(message, time, handler) {
  let p =  new Promise( (resolve, reject) => {
    handler.rsmq_handler.sendMessage( {qname : handler.qname,
        message : message,
        delay : time}, (err, resp) => {
          if (resp) {
            resolve (resp); // message id
          }
          else {
            reject(Error("Message was not send"));
          }
        });
  });
  
  return p;
}
