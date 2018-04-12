var dynamicTimeWarping = require("dynamic-time-warping")
var ser1 = [ 9, 93, 15, 19, 24 ];
var ser2 = [ 31, 97, 81, 82, 39 ];
var distFunc = function( a, b ) {
    return Math.abs( a - b );
};

var dtw = new dynamicTimeWarping(ser1, ser2, distFunc);
var dist = dtw.getDistance();
console.log(dist)
