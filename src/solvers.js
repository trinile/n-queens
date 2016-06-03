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

  //initialize new board n x n 
  var b = new Board({n: n});
  var solution;

  var findSolution = function(row) {
    if (row === n) {
    solution = b.rows();
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
    }

    for (var i = 0; i < n; i++) {
      b.togglePiece(row,i);
      if (!b.hasAnyRooksConflicts()) {
        return findSolution(row + 1);
      }
      b.togglePiece(row,i);
    }
  };
  
  return findSolution(0);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  //initialize board with n pieces
  var b = new Board({n: n});
  
  //helper function to recurse thru the rows
  var findSolution = function(row) {
    //base case when row === n 
    if (row === n) {
      //add to solutionCount (means there are no conflicts)
      solutionCount++;
      return; 
    }

    //iterate through row (n length)
    for (var i = 0; i < n; i++) {
      //starting at each index, toggle piece
      b.togglePiece(row, i);
      //if board as it is has no rowconflicts
      if (!b. hasAnyRooksConflicts()) {
        //call findSolution for the next row 
        findSolution(row + 1);
      } 
      //after calling recursive function, untoggle piece.
      b.togglePiece(row,i);
    }

  };
  //call findSolution starting at row index 0;
  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //initialize new board with no toggles (all 0s)
  var b = new Board({ 'n' : n});
  //initialize solution variable; remains undefined until valid solution found
  var solution;

  //helper function to recurse through each row and check for conflicts
  var findSolution = function(row) {
    if (row === n) {
      //stringify current board configuration to preserve arrangement.
      //board untoggles after each recursion
      solution = JSON.stringify(b.rows());
      return;
    }
    //iterate through each index in the current row
    for (var i = 0 ; i < n; i++) {
      //toggle board piece
      b.togglePiece(row,i);
      //if board toggles do not have any conflicts
      if (!b.hasAnyQueensConflicts()) {
          //if solution is defined after end of recursive call
          if (solution) {
          //valid solution has been found, return solution via JSON.parse
            return;
          } else {
          //recurse through the next row
            findSolution(row+1);
          }
      }
      b.togglePiece(row,i);
    }
  };

  findSolution(0);

  if (solution) {
    console.log('Single solution for ' + n + ' queens:', solution);
    return JSON.parse(solution);
    } else {
    // return board if solution remains undefined (0 solution found);
    console.log('No single solution found for ' + n + ' queens.');
      return b.rows();
    };
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var b = new Board({n: n});
  var findSolution = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0 ; i < n; i++) {
      b.togglePiece(row,i);
      if (!b.hasAnyQueensConflicts()) {
        findSolution(row+1);
      }
      b.togglePiece(row,i);
    }
  };

  findSolution(0);
  
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
