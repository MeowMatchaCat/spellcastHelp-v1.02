import * as fs from 'fs';

export class wordTree {
  constructor(){
    this.fileName = "scrabble.txt";
    this.contents = fs.readFileSync(this.fileName, 'utf-8');
    this.wordArr = this.contents.split(/\r?\n/).sort();
    this.tree = {};
    this.generateTree();
  }

  generateTree(){ // { a->b->o->u->t or a->b->o->r->t or a->b->s->o->l->v->e }
    for (var key of this.wordArr){
      var tempKey = key;
      var char = tempKey.slice(0, 1);
      var location = this.tree;
      while (tempKey.length > 0) {
        char = tempKey.slice(0, 1);
    
        if (location[char] == undefined) {
          location[char] = {};
        }
        location = location[char]
        tempKey = tempKey.slice(1, tempKey.length)
      }
    }
  }

  isValidWord(word){
    return this.wordArr.includes(word); // possibly a faster soln(using the word tree) but this is one line /shrug
  }

  getPossibleWords(word){
    var wordList = word.split("");
    var location = this.tree;
    for (var i = 0; i < wordList.length; i++) {
      location = location[wordList[i]]
    }
    return location; // returns the dictionary location of the possibles like word = "ab" returns {dict.a.b} which is like {o: Object, etc..} (can be empty; if empty it is the end of the chain)
  }
}