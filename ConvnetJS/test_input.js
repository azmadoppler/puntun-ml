var convnetjs = require('convnetjs')
var data = require('../songs.json')

let train_set = [];

console.log(data.length)

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
// layer_defs.push({type:'conv', sx:3, filters:8, stride:1, pad:1, activation:'relu'});
// layer_defs.push({type:'pool', sx:2 ,sy:1, stride:2});
// layer_defs.push({type:'conv', sx:3, filters:16, stride:1, pad:1, activation:'relu'});
// layer_defs.push({type:'pool', sx:2 ,sy:1, stride:2});
layer_defs.push({type:'fc', num_neurons:3, activation:'relu'}); 
// layer_defs.push({type:'softmax', num_classes:3});

net = new convnetjs.Net();
net.makeLayers(layer_defs);

console.log(train_set[0])

trainer = new convnetjs.SGDTrainer(net, {method:'adadelta', batch_size:10, l2_decay:0.001});

for(let i = 0 ; i < train_set.length ; i++){
    let stat = trainer.train(train_set[i],0)
    console.log(stat)
}

let prob = net.forward(train_set[0])
console.log(prob)




// console.log(v)