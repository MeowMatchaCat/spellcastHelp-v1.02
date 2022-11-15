import { Map } from "./Tile.js";

var map = new Map();


map.setLetters([
  ["h","e","t","c","o"],
  ["o","y","n","a","a"],
  ["o","z","f","w","i"],
  ["j","t","t","i","r"],
  ["t","o","a","d","h"]
])

var start = performance.now()
for (var i = 0; i < 5; i++){
  for (var j = 0; j < 5; j++){
    map.solve(i,j, [], map.map)
  }
}

console.log(((performance.now() - start) / 1000) +  "seconds to gen calculate everything")


var uniqueArray = map.result.filter(function(item, pos) { // get rid of duplicates
  return map.result.indexOf(item) == pos;
})

console.log(uniqueArray.sort((a,b) => -a.length + b.length)) // sort by longest word first
