
var tess = [];

// console.log(dummy[1].state)

for (var i = 0; i < dummy[1].state.length; i++) {
  // console.log(dummy[1].state[i])
  tess.push(dummy[1].state[i])

};

// console.log(tess[0] + ", " + tess[1])

var raw = [];

for (var h = 0; h < statesData.features.length; h++) {
  raw.push([]);
  for (var i = 0; i < dummy.length; i++) {
    
    
    for (var j = 0; j < dummy[i].state.length; j++) {
      // console.log(dummy[i].state[j])
      if (statesData.features[h].properties.code === dummy[i].state[j]) {
        raw[h].push(dummy[i])
      }
        
    };


  };
};
for (var i = 0; i < dummy.length; i++) {
  raw[51].push(dummy[i])
};


// console.log(raw[51])





