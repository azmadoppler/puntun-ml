var data = require('./raw/songs_v2.json')
//load data into array

var dynamicTimeWarping = require("dynamic-time-warping")

let test_song;

console.log(data.length)
//filter data get only undertale song





// data = data.filter(function(el) {
//   return el.title !== "MEGALOVANIA";
// });


data = data.filter(function(el) {
  if(el.title === "MEGALOVANIA"){
    test_song = el;
    return false;
  }
  else if(el.album !== "UNDERTALE Soundtrack"){
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





var train_set = [];
for (var i = 6 ; i < data.length ; i++){
  let current_song_name = data[i].title;
  let dtw = new dynamicTimeWarping(JSON.parse(test_song.waveMax), JSON.parse(data[i].waveMax), distFunc);
  var dist = dtw.getDistance();
  console.log(current_song_name + " : " + dist)
  let current_song = { name : current_song_name , distance : dist }
  train_set.push(current_song)
}


console.log(train_set)


var millis = Date.now() - start;

console.log("seconds elapsed = " + Math.floor(millis/1000));
