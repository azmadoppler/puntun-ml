//Import library
var createKDTree = require("static-kdtree")

//import file 
var data = require('./songs.json')

//data cleaning some dimension error 

data.forEach(function(el){
    let waveMax = JSON.parse(el.waveMax)
    let waveMin = JSON.parse(el.waveMin)
    if( waveMax.length != 1024){
      waveMax.length = 1024
      waveMin.length = 1024
    }
    let waveMean = []
    //add waveMean attribute
    for (let index = 0; index < waveMax.length; index++) {
      let curentMean = (waveMax[index] + waveMin[index])/2.0
      waveMean.push(curentMean)
      
    }
    
    el.waveMean = waveMean
})



console.log(data[5].title)

//Create a bunch of points
var points = []

data.forEach(element => {
    points.push(element.waveMean)
});

// console.log("Point Size " + points[0])


var tree = createKDTree(points)

var result =  tree.knn(data[5].waveMean)

// console.log(result)

result.forEach(element => {
    console.log(data[element].title)
});



//For performance, be sure to delete tree when you are done with it
tree.dispose()