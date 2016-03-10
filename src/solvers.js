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
  var boards = [];

  var comboHelper = function(nToggles, startIndex, maxIndex, positionsArr) {
    var positionsArr = positionsArr || [];
    if (nToggles === 0) {
      console.log('when nToggles = 0, :', positionsArr);
      //create board from positionsArray
      var boardArr = window.createBoardArr(n, positionsArr);
      //split board to create matrix
      boards.push(window.createBoard(boardArr, n));
      return positionsArr;
    }

    for (var i = startIndex; i <= maxIndex; i++) {
      var togglePosition = i;
      comboHelper(nToggles - 1, i + 1, maxIndex + 1, positionsArr.concat(togglePosition));
    }
    
  };

  var maxIndex = n * n - n;
  // console.log('max: ', maxIndex);
  comboHelper(n, 0, maxIndex, []);
  return boards;
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
