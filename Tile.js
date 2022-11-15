import { wordTree } from "./WordTree.js";

const neighbors = [
  [-1, 1], [0, 1], [1, 1],
  [-1, 0], [1, 0],
  [-1, -1], [0, -1], [1, -1],
];

export class Map {
  constructor() {
    var start = performance.now();
    this.tree = new wordTree;

    console.log(((performance.now() - start) / 1000) +  "seconds to gen word tree")

    this.map = [];
    this.init()

    this.result = [];

    // this.printMap() // for debug
  }

  setLetters(a){
    for (var i = 0; i < 5; i++){
      for (var j = 0; j < 5; j++){
        this.map[i][j].letter = a[i][j];
      }
    }
  }
  printMap() {
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        process.stdout.write(this.map[i][j].letter)
      }
      process.stdout.write("\n")

    }
  }

  init() {
    for (var i = 0; i < 5; i++) {
      var tempList = [];
      for (var j = 0; j < 5; j++) {
        tempList.push(new Tile(i, j, "a", 1, false, false));
      }
      this.map.push(tempList);
    }
  }

  getNeighbors(x, y) {
    var result = []

    for (var i in neighbors) {
      var nX = neighbors[i][0]
      var nY = neighbors[i][1]
      try {
        if (x + nX >= 0 && x + nX < 5 && y + nY >= 0 && y + nY < 5) {
          if (!this.map[x + nX][y + nY].isVisited) { result.push([x + nX, y + nY]) } else {

          }
        }
      } catch (e) {
        console.log(e)
      }


    }
    return result; // returns [[0,1], [2,3]] of all neighbors which are false (not visited)
  }

  solve(x, y, chain) {
    // var tempArr = wordArray.map(function (a) { a.slice() });
    var neighbors = this.getNeighbors(x, y);
    for (var n of neighbors) {
      var tchain = [...chain];

      var nX = n[0];
      var nY = n[1];
      var nChar = this.map[nX][nY];
      tchain.push(nChar);
      var currentText = tchain.map(function(a) {return a.letter}).join("")
      if (this.tree.isValidWord(currentText) && currentText.length > 3){
        this.result.push(currentText);
      }
      if (this.tree.getPossibleWords(currentText)){
        this.map[x][y].isVisited = true;
        this.solve(nX, nY, [...tchain])
        this.map[x][y].isVisited = false;
      }
    }
  }
}

class Tile {
  constructor(x, y, letter, value, isGem, priority) { //most of these are not used yet
    this.x = x; // int X
    this.y = y; // int Y
    this.isGem = isGem; // bool (true or false)
    this.priority = priority;
    this.value = value;
    this.letter = letter;
    this.isVisited = false;
  }


}