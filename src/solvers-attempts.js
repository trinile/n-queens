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
  
window.createBoardArr = function(n, positionsArray) {
  //input = [0,1,2,3] for n = 4
  //initialize array for board = [];
  var boardArray = [];
  if (positionsArray.length !== n) {
    alert('wrong number of positions for n');
  }
  //create an board of n * n length of 0s
  for (var i = 0; i < n * n; i++) {
    boardArray.push(0);
  }
  //board Array = [0,0,0,0];
  for (var j = 0; j < positionsArray.length; j++) {
    var positionIndex = positionsArray[j]; //0, 1, 2, 3
    boardArray[positionIndex] = 1;
  }
  //return board array that includes 1s in the positions given by the positionsArray
  return boardArray;
};

window.createBoard = function(array, n) {
  //[0,0,1,1]
  //split boardArr
  //iterate through array, slicing when you get to n - 1 index.
  //n rows 
  var board = [];
  for (var i = 0; i < n * n; i = i + n) {
    var row = array.slice(i, n + i);
    board.push(row);
  }
  return board;
};

// window.combo = function(n) {
//   //you have a n x n board. length of board as an array is n x n = 4 if n = 2;
//   //goal: determine positions for each 1 piece (n pieces total);

//   //initialize array of all positions
//   var allBoards = [];
//   var positionsArr, firstToggle, secondToggle;
//   for (var i = 0; i <= n * n - n + 0; i++) {
//     firstToggle = i;
//     for (var j = i + 1; j <= n * n - n + 1; j++) {
//       secondToggle = j;
//       positionsArr = [];
//       positionsArr.push(firstToggle, secondToggle);
//       var boardArr = window.createArr(n, positionsArr);
//       allBoards.push(window.splitArray(boardArr, n));
//     }
  
//   }
//   return allBoards;
// };

window.combo = function(n) {
  //create new board
  var b = new Board({'n': n});
  var comboResult = [];

  var helper = function(startRowIndex, startColIndex, remainingToggles) {

    //rowIndex: 0-2
    //colIndex: 0-2
    // debugger;
    b.togglePiece(startRowIndex, startColIndex); //toggleFirst, toggleSecond , toggleThird

    //base case
    if (remainingToggles === 0) {
      // comboResult.push(b.rows());
      // return comboResult;
      return console.log(b.rows());
    }

    //for loop for row, var i
    for (var i = 0; i < n; i++) {
      //for loop for col, var j
      for (var j = 0; j < n; j++) {
        //if startIndex !== i && startColIndex !==j, toggle [i, j]
        if (startRowIndex !== i && startColIndex !== j) {
          //recurse n times
          // b.togglePiece(i, j);
          return helper(i, j, remainingToggles - 1); //3-1=2, 2-1=1, 1-1=0 
        }
      }
    }
  };

  for (var i = 0; i < n - 1; i++) { //row
    for (var j = 0; j < n; j++) { //col
      return helper(i, j, n);
    }
  }

};


console.log(window.combo(2));

// window.combo = function(n) {
//   var boards = [];

//   var comboHelper = function(nToggles, startIndex, maxIndex, positionsArr) {
//     var positionsArr = positionsArr || [];
//     if (nToggles === 0) {
//       // console.log('when nToggles = 0, :', positionsArr);
//       //create board from positionsArray
//       if (!(positionsArr[0] + positionsArr[1] === 2 || positionsArr[positionsArr.length - 1] + positionsArr[positionsArr.length - 2] === 1)) {
//         var boardArr = window.createBoardArr(n, positionsArr); // b.set([ [], [] ])
//         boards.push(window.createBoard(boardArr, n));
//       }
//       return positionsArr;
//       //split board to create matrix
//     }

//     for (var i = startIndex; i <= maxIndex; i++) {
//       var togglePosition = i;
//       comboHelper(nToggles - 1, i + 1, maxIndex + 1, positionsArr.concat(togglePosition)); //O(n^2)
//     }
    
//   };

//   var maxIndex = n * n - n;
//   // console.log('max: ', maxIndex);
//   comboHelper(n, 0, maxIndex, []);
//   return boards;
// };

// console.log(window.combo(6));




window.findNRooksSolution = function(n) {
  //var nCombo = window.combinations(n) //return array of all combinations
  //for (var i = 0;...) {
    //diagonal/row/colCheckMethods(nCombo(i))
  // }
  if (n === 1) {
    var b = new Board({n: 1});
    b.togglePiece(0, 0);
    // var solution = b.rows()[0][0]; //[[0]]
    var solution = b.rows();
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    // return solution;
    return solution;
  }
  //call combo on n to find all combinations of n x n with n pieces (array of arrays)
  //window.combo = array of arrays
  var allBoards = window.combo(n);
  //iterate through window.combo, check for conflict
  for (var i = 0; i < allBoards.length; i++) {
    //create instance of board
    var b = new Board(allBoards[i]);
    //invoke helper functions on window.combo[i]
    if (!(b.hasAnyRowConflicts() && b.hasAnyColConflicts())) {
      var solution = b.rows();
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
      return solution;
    }
  }
      //window.Board.hasConflict(window.combo[i])
      //if array does not have a conflict, return array





};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0;

  if (n === 1) {
    solutionCount = n;
    console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
    return solutionCount;    
  }

  var allBoards = window.combo(n);
  console.log('number of boards: ', allBoards.length);

  for (var i = 0; i < allBoards.length; i++) {
    var b = new Board(allBoards[i]);
    // console.log(b);
    // console.log(b.rows());
    if (!b.hasAnyRowConflicts() && !b.hasAnyColConflicts()) {
      solutionCount++;
    }
  }

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
