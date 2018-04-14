var convnetjs = require('convnetjs')


layer_defs = [];
layer_defs.push({type:'input', out_sx:1500, out_sy:1, out_depth:1});
layer_defs.push({type:'conv', sx:3, filters:8, stride:1, pad:1, activation:'relu'});
layer_defs.push({type:'pool', sx:2 ,sy:1, stride:2});
layer_defs.push({type:'conv', sx:3, filters:16, stride:1, pad:1, activation:'relu'});
layer_defs.push({type:'softmax', num_classes:10});

net = new convnetjs.Net();
net.makeLayers(layer_defs);

trainer = new convnetjs.SGDTrainer(net, {method:'adadelta', batch_size:20, l2_decay:0.001});

//ALTERNATIVE 

layer_defs = [];
layer_defs.push({type:'input', out_sx:1500, out_sy:1, out_depth:1});
layer_defs.push({type:'conv', sx:3 , sy:1, filters:8, stride:1, pad:0, activation:'relu'});
layer_defs.push({type:'pool', sx:2 ,sy:1, stride:2});
layer_defs.push({type:'conv', sx:3 , sy:1, filters:16, stride:1, pad:0, activation:'relu'});
layer_defs.push({type:'softmax', num_classes:10});

net = new convnetjs.Net();
net.makeLayers(layer_defs);

trainer = new convnetjs.SGDTrainer(net, {method:'adadelta', batch_size:20, l2_decay:0.001});
