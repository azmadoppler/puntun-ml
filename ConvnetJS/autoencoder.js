var convnetjs = require('convnetjs')
var data = require('../16ksongs.json')
var fs = require('fs');

let train_set = [];


//extract 
data.forEach(function(el){
    let waveMax = JSON.parse(el.waveMax)
    let waveMin = JSON.parse(el.waveMin)
    if( waveMax.length != 1024){
      waveMax.length = 1024
      waveMin.length = 1024
    }
    let waveMean = []
    
    for (let index = 0; index < waveMax.length; index++) {
      let curentMean = (waveMax[index] + waveMin[index])/2.0
      waveMean.push(curentMean)
      
    }
    
    el.waveMean = waveMean
  })



data.forEach(element => {
    let temp_vol =  new convnetjs.Vol(1024, 1, 1);
    for(let i = 0 ; i < element.waveMean.length ; i++){
        temp_vol.w[i] = element.waveMean[i]
    }
    train_set.push(temp_vol)
});

layer_defs = [];
layer_defs.push({type:'input', out_sx:1024, out_sy:1, out_depth:1});
layer_defs.push({type:'fc', num_neurons:256, activation:'sigmoid'});
layer_defs.push({type:'fc', num_neurons:128, activation:'sigmoid'});
layer_defs.push({type:'fc', num_neurons:8});
layer_defs.push({type:'fc', num_neurons:128, activation:'sigmoid'});
layer_defs.push({type:'fc', num_neurons:256, activation:'sigmoid'});
layer_defs.push({type:'regression', num_neurons:1024});

net = new convnetjs.Net();
net.makeLayers(layer_defs);


console.log(train_set[0].w.length)

// var trainer = new convnetjs.Trainer(net, {learning_rate:1, method:'adadelta', batch_size:10, l2_decay:0.001});
// var trainer = new convnetjs.SGDTrainer(net, {learning_rate:1, method:'adadelta', batch_size:10, l2_decay:0.001, l1_decay:0.001});
var trainer = new convnetjs.Trainer(net, {method: 'adadelta', l2_decay: 0.001,batch_size: 10});
// trainer = new convnetjs.SGDTrainer(net, {method:'adadelta', batch_size:10, l2_decay:0.001});

let prob = net.forward(train_set[0])
// console.log(train_set[0].w)
var normalArray = [].slice.call(train_set[0].w);
// console.log(normalArray)


// var json = net.toJSON();
// var str = JSON.stringify(json);
// fs.writeFile('autoencoder_model.txt',JSON.stringify(str),function(err){ if(err) throw err; })
for(let i = 0 ; i < train_set.length ; i++){
    var normalArray = [].slice.call(prob.w);
    
    
    let temp_vol =  new convnetjs.Vol(1024, 1, 1);
    for(let index = 0; index<normalArray.length;index++){
        temp_vol.w[index] = prob.w[index]
    }
    let stat = trainer.train(train_set[i] , temp_vol)
    // break
    
        
    
    if(i%1000 == 0){
        console.log("Save file at step #" + i)
        console.log(stat)
        var json = net.toJSON();
        var str = JSON.stringify(json);
        fs.writeFile('autoencoder_model.json',JSON.stringify(str),function(err){ if(err) throw err; })
        break
    }
    // break;
}

// let prob = net.forward(train_set[0])
// console.log(prob)

// console.log(train_set[0].x)
// console.log(net.layers[6].out_act.w.length)


// console.log(v)