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
  

window.findNRooksSolution = function(n) {
  //var nCombo = window.combinations(n) //return array of all combinations
  //for (var i = 0;...) {
    //diagonal/row/colCheckMethods(nCombo(i))
  // }
  // if (n === 1) {
  //   var b = new Board({n: 1});
  //   b.togglePiece(0, 0);
  //   // var solution = b.rows()[0][0]; //[[0]]
  //   var solution = b.rows();
  //   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //   // return solution;
  //   return solution;
  // }
  // //call combo on n to find all combinations of n x n with n pieces (array of arrays)
  // //window.combo = array of arrays
  // var allBoards = window.combo(n);
  // //iterate through window.combo, check for conflict
  // for (var i = 0; i < allBoards.length; i++) {
  //   //create instance of board
  //   var b = new Board(allBoards[i]);
  //   //invoke helper functions on window.combo[i]
  //   if (!(b.hasAnyRowConflicts() && b.hasAnyColConflicts())) {
  //     var solution = b.rows();
  //     console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //     return solution;
  //   }
  // }
      //window.Board.hasConflict(window.combo[i])
      //if array does not have a conflict, return array
      return undefined;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var b = new Board({n: n});
  var solutionCount = 0;

  //create helper function that recurses through n rows
  var findSolutions = function(row) {
    //base case: when remaining toggles = 0
    if (row === n) {
      //increment solutionCount when we find no conflicts
      solutionCount++;
      //return solutionCount
      return;
    }

    //iterate through first row 
    for (var i = 0; i < n; i++) {
      // debugger;
      //toggle first item in the row
      b.togglePiece(row, i);
      //call hasAnyRooksConflicts helper function, if there are no conflicts 
      if ( !b.hasAnyRooksConflicts() ) {
        //recurse on the next row
        findSolutions(row + 1);
      } 
      //untoggle at index of row 
      b.togglePiece(row, i);
    }
  };
       
  findSolutions(0);

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
