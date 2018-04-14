var convnetjs = require('convnetjs')
var fs = require('fs');

var layer_defs = [];
// input layer of size 1x1x2 (all volumes are 3D)
layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:2});
// some fully connected layers
layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
// a softmax classifier predicting probabilities for two classes: 0,1
layer_defs.push({type:'softmax', num_classes:10});

// create a net out of it
var net = new convnetjs.Net();
net.makeLayers(layer_defs);
var json = net.toJSON();

// the network always works on Vol() elements. These are essentially
// simple wrappers around lists, but also contain gradients and dimensions
// line below will create a 1x1x2 volume and fill it with 0.5 and -1.3

var x = new convnetjs.Vol([0.5, -1.3]);
// //WRITE FILE
// console.log(JSON.stringify(json))
// fs.writeFile('data.txt',JSON.stringify(json),function(err){
//     if(err) throw err;
//   })
// prints 0.50101

var trainer = new convnetjs.Trainer(net, {method: 'adadelta', l2_decay: 0.001,batch_size: 1});
// var probability_volume = net.forward(x);
var stats = trainer.train(x);
console.log(stats)

var chk = net.getParamsAndGrads();
fs.writeFile('chk1.txt',JSON.stringify(net.toJSON()),function(err){
    if(err) throw err;
  })

var x = new convnetjs.Vol([Math.random(), Math.random()]);
trainer.train(x);
var x = new convnetjs.Vol([Math.random(), Math.random()]);
trainer.train(x);
var x = new convnetjs.Vol([Math.random(), Math.random()]);
trainer.train(x);
var x = new convnetjs.Vol([Math.random(), Math.random()]);
trainer.train(x);
var x = new convnetjs.Vol([Math.random(), Math.random()]);
trainer.train(x);
var chk2 = net.getParamsAndGrads();
var json2 = net.toJSON();
  fs.writeFile('chk2.txt',JSON.stringify(net.toJSON()),function(err){
    if(err) throw err;
  })
// console.log('probability that x is class 0: ' + probability_volume.w);
// for (let index = 0; index < probability_volume.w.length; index++) {
//   console.log("prob #" + index + " = " + probability_volume.w[index])
  
// }