var convnetjs = require('convnetjs')
var fs = require('fs');
var data = require('../training_song.json')
var old_data = require('./autoencoder_model.json')

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


var json;

fs.readFile('autoencoder_model.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  // console.log(data);
  json = JSON.parse(old_data)
  var net = new convnetjs.Net(); 
  net.fromJSON(json)
  
  
  var trainer = new convnetjs.SGDTrainer(net, {learning_rate:1, method:'adadelta', batch_size:10, l2_decay:0.001});
  
  
  // let prob = net.forward(train_set[0])

  // console.log(prob)


});
// console.log(json)