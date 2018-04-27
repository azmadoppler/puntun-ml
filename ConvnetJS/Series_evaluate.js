var convnetjs = require('convnetjs')
var fs = require('fs');
var data = require('../songs.json')
var model = require('./15k_model.json')
var dynamicTimeWarping = require("dynamic-time-warping")

var fs = require('fs');

//benchmark
var start = Date.now();


let json = JSON.parse(model)
console.log(typeof json)
var net = new convnetjs.Net(); 
net.fromJSON(json)

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
    let temp_vol =  new convnetjs.Vol(1024, 1, 1);
    for(let i =0 ; i<waveMean.length;i++){
      temp_vol.w[i] = waveMean[i]
    }
    el.waveMean = waveMean
    
    let stat = net.forward(temp_vol)
    el.waveDeep = net.layers[6].out_act.w
  })


  var train_set = [];

  data = data.filter(function(el) {
    if(el.title === "アカツキ"){
      test_song = el;
    // console.log(JSON.parse(el.waveMax.split(",")))
      return false;
    }
    else {
      return true;
    }
  });
  
  //dtw helper function
var distFunc = function( a, b ) {
  return Math.abs( a - b );
};


var train_set = [];
var return_set = [];
var current_set = [];
for (var i = 0 ; i < data.length ; ){

    for(let j = 0; j <data.length;j++){
        let current_song_name = data[j].title;
        //using waveMean
        let dtw = new dynamicTimeWarping(test_song.waveDeep, data[j].waveDeep, distFunc);
        
        //using waveMax
        // let dtw = new dynamicTimeWarping(JSON.parse(test_song.waveMax), JSON.parse(data[i].waveMax), distFunc);
        
        //using waveMin
        // let dtw = new dynamicTimeWarping(JSON.parse(test_song.waveMin), JSON.parse(data[i].waveMin), distFunc);
        
        var dist = dtw.getDistance();
        data[j].distance = dist
        //   console.log(current_song_name + " : " + dist)
    }
    data.sort(compareWave)
    return_set.push(data[0])
    test_song = data[0]
    console.log("Current Song" + test_song.title)
    data.shift()
}



train_set.sort(compareWave)

// console.log(train_set)

var millis = Date.now() - start;

return_set.forEach(function(el){
    console.log(el.title)
})

console.log("millsec elapsed = " + millis);

//sorting helper function
function compareWave(a, b) {
  if (a.distance < b.distance) { return -1; }
  if (a.distance > b.distance) { return 1; }
  return 0;
}
function compareIndex(a, b) {
    if (a.rank < b.rank) { return -1; }
    if (a.rank > b.rank) { return 1; }
    return 0;
}