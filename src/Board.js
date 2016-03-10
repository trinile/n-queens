// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // return false; // fixme
      //this = [ [0, 0, 0, 0], [], [], [] ]
      // this[rowIndex].length
      var pieces = 0;

      //input is array of arrays, rowIndex is an array
      //iterate through rowIndex[i]
      for (var i = 0; i < rowIndex.length; i++) {
      //chekc if rowIndex[i] is 0 or 1, add to pieces
        var colValue = rowIndex[i];
        if (colValue === 1 && pieces === 1) {
          return true;
        } else if (colValue === 1) {
          pieces++;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      for (var i = 0; i < this.rows().length; i++) {
        var rowArray = this.rows()[i];
        if (this.hasRowConflictAt(rowArray)) {
          return true;
        }
      }
      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) { 
      //colIndex is number
      //iterate through the rows
      var pieces = 0;
      for (var i = 0; i < this.rows().length; i++) {
        var rowArray = this.rows()[i];
        if (rowArray[colIndex] === 1 && pieces > 0) {
          return true;
        } else if (rowArray[colIndex] === 1) {
          pieces++;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //iterate through the column index
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //majorDiagonalColumnIndexAtFirstRow is the column index at the first row it appears
      //if another argument passed in, assume it is the rowIndex of majorDiagonal start.
      if (arguments.length === 2) {
        var rowIndex = arguments[1];
      }

      var pieces = 0;
      //iterateLength is dependent on rows length and start of majorDiagonalcolumnIndex 
      var iterateLength = this.rows().length - majorDiagonalColumnIndexAtFirstRow;
      //input: column index at first row
      //interate through rows index
      var colIndex = majorDiagonalColumnIndexAtFirstRow; //should check here first, then go next
      for (var i = rowIndex || 0; i < iterateLength; i++) {
        // var nextRowIndex = i;
        var majorValue = this.rows()[i][colIndex]; //gives value at position
        //check to see if rowIndex+1 colIndex+1 === 1
        if (majorValue === undefined) {
          return false;
        }
        else if (majorValue === 1 && pieces > 0) {
          return true;
        } else if (majorValue === 1) {
          pieces++;
        }
        colIndex++;
      }
      //keep checking until end of board
      return false;


    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //iterate through rows length starting at first row 
      //call hasMajorDiagonal conflict for each colIndex in first row, except last one

      //iterating through rows
      for (var j = 0; j < this.rows().length - 1; j++) {
        //check first row
        if (j === 0) {
          //iterating through the columns of the first row
          for (var i = 0; i < this.rows().length - 1; i++) {
            if (this.hasMajorDiagonalConflictAt(i, j)) {
              return true;
            }
          }
        } else {
          debugger;
          if (this.hasMajorDiagonalConflictAt(0, j)) { //(colIndex, rowIndex)
            return true;
          } 
        }
      //if no conflicts
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
