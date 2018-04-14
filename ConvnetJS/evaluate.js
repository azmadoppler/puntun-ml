var convnetjs = require('convnetjs')
var fs = require('fs');

var json;

fs.readFile('data.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  json = JSON.parse(data)
  var net = new convnetjs.Net(); 
  net.fromJSON(json)
  var x = new convnetjs.Vol([0.5, -1.3]);
  var probability_volume = net.forward(x);
  console.log('probability that x is class 0: ' + probability_volume.w[1]);
  
  
});
// console.log(json)