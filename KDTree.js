var kdt = require('kdt')

var points = [
  {ch1: 1, ch2: 2,ch3: 12,ch4: 13,ch5: 14,ch6: 15,ch7: 17,ch8: 12, ch9: 15,ch10: 12, ch11: 10,ch12: 41},
  {ch1: 2, ch2: 2,ch3: 13,ch4: 13,ch5: 14,ch6: 15,ch7: 17,ch8: 12, ch9: 15,ch10: 12, ch11: 10,ch12: 41},
  {ch1: 3, ch2: 2,ch3: 14,ch4: 13,ch5: 14,ch6: 15,ch7: 17,ch8: 12, ch9: 15,ch10: 12, ch11: 10,ch12: 41},
  {ch1: 4, ch2: 2,ch3: 15,ch4: 13,ch5: 14,ch6: 15,ch7: 17,ch8: 12, ch9: 15,ch10: 12, ch11: 10,ch12: 41}
];
var test1 = {ch1: 5, ch2: 2,ch3: 12,ch4: 13,ch5: 14,ch6: 15,ch7: 17,ch8: 12, ch9: 15,ch10: 12, ch11: 10,ch12: 41};
var test2 = {ch1: 7, ch2: 9,ch3: 7,ch4: 13,ch5: 14,ch6: 15,ch7: 17,ch8: 12, ch9: 15,ch10: 12, ch11: 10,ch12: 41};
// console.log(points)
points.push(test1)
// console.log(points)
// var array_points = [1, 4, 9, 16];
// let test = 'x';
// for (let elem in test1){
//   console.log(test1[elem] - test2[elem])
// }
// console.log(typeof points)
function doingKDT(){
  var distance = function(a, b){
    var endValue =0;
    for( let elem in a ){
      endValue += Math.pow(a[elem] - b[elem], 2)
    }
    return endValue ;
  }

  var tree = kdt.createKdTree(points, distance, ["ch1", "ch2", "ch3", "ch4", "ch5", "ch6", "ch7", "ch8", "ch9", "ch10", "ch11", "ch12"])
  // console.log(test)
  var nearest = tree.nearest(test1, 1);
  var result = nearest.reverse()
  var inner_result = result[0];
  console.log(inner_result);
  console.log("\n")
}

doingKDT()
