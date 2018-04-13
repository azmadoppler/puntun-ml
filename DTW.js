var data = require('./songs.json')
//load data into array/

var dynamicTimeWarping = require("dynamic-time-warping")

let test_song;

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

//filter the song to be tested 
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

//benchmark
var start = Date.now();
console.log("test")

//do DTW 
var train_set = [];
for (var i = 0 ; i < data.length ; i++){
  let current_song_name = data[i].title;
  //using waveMean
  let dtw = new dynamicTimeWarping(test_song.waveMean, data[i].waveMean, distFunc);

  //using waveMax
  // let dtw = new dynamicTimeWarping(JSON.parse(test_song.waveMax), JSON.parse(data[i].waveMax), distFunc);
  
  //using waveMin
  // let dtw = new dynamicTimeWarping(JSON.parse(test_song.waveMin), JSON.parse(data[i].waveMin), distFunc);

  var dist = dtw.getDistance();
  console.log(current_song_name + " : " + dist)
  let current_song = { name : current_song_name , distance : dist }
  train_set.push(current_song)
}



train_set.sort(compareWave)

console.log(train_set)

var millis = Date.now() - start;

console.log("seconds elapsed = " + Math.floor(millis/1000));

//sorting helper function
function compareWave(a, b) {
  if (a.distance < b.distance) { return -1; }
  if (a.distance > b.distance) { return 1; }
  return 0;
}
