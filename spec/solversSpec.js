describe("solvers", function() {
  window.displayBoard = function(){};

/*
  describe('findNRooksSolution()', function(){

    it('finds a valid solution for n of 0-8', function(){
      _.range(1, 8).map(function(n){
        var solutionBoard = new Board(findNRooksSolution(n));
        expect(solutionBoard.hasAnyRooksConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNRooksSolutions()', function(){

    it('finds the number of valid solutions for n of 0-8', function(){
      _.range(0, 8).map(function(n){
        var solutionCount = countNRooksSolutions(n);
        var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040][n];
        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

  describe('findNQueensSolution()', function(){

    it('finds a valid solution for n of 0-8', function(){
      _.range(1, 8).map(function(n){
        var solutionBoard = new Board(findNQueensSolution(n));
        expect(n !== 2 && n !== 3 && solutionBoard.hasAnyQueensConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNQueensSolutions()', function(){

    it('finds the number of valid solutions for n of 0-8', function(){
      _.range(0, 8).map(function(n){
        var solutionCount = countNQueensSolutions(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92][n];
        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });
  */

  describe('countNQueensSolutions()', function(){

    it('finds the number of valid solutions for n of 0-16', function(){
      _.range(1, 14).map(function(n){
        var solutionCount = countNQueensSolutionsBitwise(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92, 352, 724, 2680, 14200, 73712, 365596, 2279184, 14772512][n];
        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });


  describe('findNQueensSolutions()', function(){

    it('finds the number of valid solutions for n of 8', function(){
      _.range(1, 14).map(function(n){
        var before = new Date();
        countNQueensSolutionsBitwise(n);
        var after = new Date();
        console.log("Count Time - " + n + ": " + (after - before) / 1000);

        before = new Date();
        findNQueensSolutionsBitwise(n);
        after = new Date();
        console.log("Find Time - " + n + ": " + (after - before) / 1000);
      });
    });
  });

});
