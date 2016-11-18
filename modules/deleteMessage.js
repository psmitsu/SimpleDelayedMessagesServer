module.exports = function(key, handler) {

  let p = new Promise( (resolve, reject) => {
    handler.rsmq_handler.deleteMessage( {qname : handler.qname, id:key}, (err, resp) => {
      if (resp === 1) {
        resolve(resp);
      }
      if (err) {
        reject(err);
      }
    })
  });

  return p;
}
