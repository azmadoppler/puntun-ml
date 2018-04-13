var data = require('./songs.json')
//load data into array/

var dynamicTimeWarping = require("dynamic-time-warping")

let test_song;

// console.log(data.length)
// data = data.filter(function(el) {
//   return el.title !== "MEGALOVANIA";
// });

data.forEach(function(el){
  
  // console.log(JSON.parse(el.waveMax))


  //extract 
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

  // for(let index  = 0 ; index < .length ; index++){
  //   // console.log("Song:"+ el.title +el.waveMax[index])
  //   // el.waveMax[index] =(el.waveMax[index] + el.waveMin[index]) /2
  //   // console.log(el.waveMax[index])
  //   console.log(el.waveMax[0])
  // }

})


data = data.filter(function(el) {
  if(el.title === "アカツキ"){
    test_song = el;
  // console.log(JSON.parse(el.waveMax.split(",")))
    return false;
  }
  else {
    // console.log(el.waveMax.length)
    // console.log(el.waveMin.length)
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


var train_set = [];
for (var i = 0 ; i < data.length ; i++){
  let current_song_name = data[i].title;
  let dtw = new dynamicTimeWarping(JSON.parse(test_song.waveMax), JSON.parse(data[i].waveMax), distFunc);
  var dist = dtw.getDistance();
  console.log(current_song_name + " : " + dist)
  let current_song = { name : current_song_name , distance : dist }
  train_set.push(current_song)
}



// var sorted_array = {};
train_set.sort()

train_set.sort(compareWave)
//printed sorted 

console.log(train_set)

var millis = Date.now() - start;

console.log("seconds elapsed = " + Math.floor(millis/1000));

//sorting helper function
function compareWave(a, b) {
  if (a.distance < b.distance) { return -1; }
  if (a.distance > b.distance) { return 1; }
  return 0;
}
