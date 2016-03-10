/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed 
// such that none of them can attack each other
  
  // var b = new Board( {n: 5})
  //return b.rows() ???? 
  //given n pieces and n^2 positions. 
    //write a computation that will call toggle n times
  //return [ [ b.rows() ] ,  [ a.rows() ] ]   

  //do permutations that 

  //[
  //['rock', 'paper', 'scissors'], 
  //['rock', 'rock', 'rock']
  //]

  // var allpossibilities = 
  // [
  //   [ [1, 0] [0, 1]  ]
  //   [ [1, 1], [0, 0] ]
  //   [ [0, 1], [1, 0] ]
  // ]
  // someConflictMethod(allpossibilities[i])

window.combinations = function(n) {


  //FOR 2x2
  var allCombo = [];

    //at index 0, add 2 arrays from 
  //start with toggling first position (row 0, col 0), can only toggle til last row index 0
  var newBoard = new Board({ n : 2});
  // newBoard.toggle(0, 0);
  for (var i, j = 0; i < newBoard.length; j++) {
    newBoard.toggle(i, j);
    //while toggle in the first position, next toggle will be in index + 1 position, can only toggle until index 1 of last row
  }

  return allCombo;




  //FOR 2x2
  var allCombo = [];

  //gives all the possible row combinations
  var combos = []; //has 4 subarrays
  for (var i = 0; i < 2; i++) { //row
    for (var j = 0; j < 2; j++) { //column
      combos.push([i, j]); //[ [0, 0], [0, 1], [1, 0], [1, 1] ]
    }
  }

  //need to add row combinations into boards
  var subCombo = [];
  [ combos[0], combos[1] ]
  [ combos[0], combos[2] ]



  for (var k = 0; k < combos.length; k++) {
    //need to add two
    subCombo.push(combos[k]); //will give array of 
  }

  return allCombo;




  // //have 4 spaces, need to only fill 2
  // //total 6 combinations
  // var makeCombo = function(numberToGo, addedSoFar) {
  //   //add number to the first position
  //   for (var i = 0; i < numberToGo; i++) {
  //     for (var j = 0; j < numberToGO; j++) {
  //     //add 1 to 
        
  //     }
  //   }
  // };
  // makeCombo(n, []);
  
  

};


window.findNRooksSolution = function(n) {
  //var nCombo = window.combinations(n) //return array of all combinations
  //for (var i = 0;...) {
    //diagonal/row/colCheckMethods(nCombo(i))
  // }
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
