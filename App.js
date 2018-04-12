var fs = require('fs');
var dynamicTimeWarping = require("dynamic-time-warping")
//Reach Data from txt and remove dupplicate

var array = fs.readFileSync('./raw audio/tranposed_sample.csv').toString().split("\r\n");
array.pop()
console.log(array.length)
var distFunc = function( a, b ) {
    return Math.abs( a - b );
};
//create the first element to be test set
var test_set = array[0].split(',');
test_set = test_set.filter(function(e) { return e !== '' })
// console.log("test" + filteredAry)
test_set_song_name = test_set.shift()
array.shift()

//benchmark
var start = Date.now();

//create the train set
var train_set = [];
for (var i = 0 ; i < array.length ; i++){
  let split_elem =  array[i].split(',').filter(function(e) { return e !== '' })
  // console.log(split_elem)
  let current_song_name = split_elem.shift();
  // let current_data = split_elem;
  let dtw = new dynamicTimeWarping(test_set, split_elem, distFunc);
  var dist = dtw.getDistance();
  console.log(dist)
  let current_song = { name : current_song_name , distance : dist }
  train_set.push(current_song)
}

var result = {};
//DTW TIME


console.log(train_set)

var doDTW = function(){
  for(let i = 0 ; i < train_set.length; i ++){
    console.log(train_set[i].name)
    let dtw = new dynamicTimeWarping(test_set, train_set[i].data, distFunc);
    var dist = dtw.getDistance();
    console.log(dist)
    break;
  }
}

var millis = Date.now() - start;

console.log("seconds elapsed = " + Math.floor(millis/1000));

// console.log(train_set.length)

// for(var elem in array){
//   console.log(elem)
// }

// var ser1 = [ 9, 93, 15, 19, 24 ];
// var ser2 = [ 31, 97, 81, 82, 39 ];
// var distFunc = function( a, b ) {
//     return Math.abs( a - b );
// };
//
// var dtw = new dynamicTimeWarping(ser1, ser2, distFunc);
// var dist = dtw.getDistance();
// console.log(dist)

// var unique = array.filter(function(elem, index, self) {
//   return index == self.indexOf(elem);
// })
