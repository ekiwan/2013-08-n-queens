// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
window.makeEmptyMatrix = function(n) {
  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix[i] = [];
    for (var j = 0; j < n; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
};

window.placePieceOnBoard = function(matrix, row, col) {
  var copy = [];
  for (var i = 0; i < matrix.length; i++) {
    copy[i] = [];
    for (var j = 0; j < matrix.length; j++) {
      if(i === row && j === col) {
        copy[i][j] = 1;
      }
      else {
        copy[i][j] = matrix[i][j];
      }
    }
  }
  return copy;
};

window.findAllPossibleBoards = function(row, n, matrix) {
  matrix = matrix || makeEmptyMatrix(n);
  var boards = [];
  for (var i = 0; i < n; i++) {
    var nextBoard = placePieceOnBoard(matrix, row, i);
    if (row === (n - 1)) { //If we are on the last row
      //debugger;
      boards.push(nextBoard);//then push the matrix onto the boards array
    }
    else {
      //keep going further
      boards = boards.concat(findAllPossibleBoards(row + 1, n, nextBoard));
    }
  }
  return boards;
};

window.findAllNRooksSolutions = function(n) {
  var solutions = [];

  var allPossibleBoards = findAllPossibleBoards(0, n);
  for (var i = 0; i < allPossibleBoards.length; i++) {
    var board = new Board(allPossibleBoards[i]);
    if(!board.hasAnyRooksConflicts()) {
      solutions.push(allPossibleBoards[i]);
    }
  }

  return solutions;
};

window.findNRooksSolution = function(n){
  var solutions = findAllNRooksSolutions(n);
  //debugger;
  return n === 0 ? [] : solutions[0];
};

window.countNRooksSolutions = function(n){
  var solutions = findAllNRooksSolutions(n);
  return n === 0 ? 1 : solutions.length;
};

window.findAllNQueensSolutions = function(n) {
  var solutions = [];

  var allPossibleBoards = findAllPossibleBoards(0, n);
  for (var i = 0; i < allPossibleBoards.length; i++) {
    var board = new Board(allPossibleBoards[i]);
    if(!board.hasAnyQueensConflicts()) {
      solutions.push(board);
    }
  }

  return solutions;
};

window.findNQueensSolution = function(n){
  var solutions = findAllNQueensSolutions(n);
  return solutions[0] === undefined ? [] : solutions[0];

};

window.countNQueensSolutions = function(n){
  var solutions = findAllNQueensSolutions(n);
  return n === 0 ? 1: solutions.length;

};

// This function uses a board visualizer lets you view an interactive version of any piece matrix.
window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};
