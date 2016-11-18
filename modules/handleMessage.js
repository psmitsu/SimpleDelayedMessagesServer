module.exports = function(message, time) {
  let key = Math.ceil( Math.random() * 1000);
  console.log("Message " + message + " will be delivered in " + time);
  return key;
}
