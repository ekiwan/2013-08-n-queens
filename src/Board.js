(function(){
  Array.prototype.sum = function() {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
      sum += this[i];
    }
    return sum;
  };

  window.Board = Backbone.Model.extend({

    initialize: function(params){
      if (params.n) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function(){
      return _(_.range(this.get('n'))).map(function(rowIndex){
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex){
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex){
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex){
      return colIndex + rowIndex;
    },


    hasAnyRooksConflicts: function(){
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex){
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(){
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex){
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    // todo: fill in all these functions - they'll help you!

    hasRowConflictAt: function(rowIndex){
      //Turn this into reduce
      var conflict = 0;
      var rowWeCareAbout = this.attributes[rowIndex];
      for (var i = 0; i < rowWeCareAbout.length; i++){
        if (rowWeCareAbout[i]) {
          conflict++;
        }
      }
      return conflict > 1; // fixme
    },

    hasAnyRowConflicts: function(){
      var conflict = false;
      for (var i = 0; i < this.attributes.n; i++) {
        conflict = conflict || this.hasRowConflictAt(i);
      }
      return conflict;
    },

    hasColConflictAt: function(colIndex){
      var conflict = 0;
      for (var i = 0; i < this.attributes.n; i++){
        if (this.attributes[i][colIndex]) {
          conflict++;
        }
      }
      return conflict > 1;
    },

    hasAnyColConflicts: function(){
      var conflict = false;
      for (var i = 0; i < this.attributes.n; i++) {
        conflict = conflict || this.hasColConflictAt(i);
      }
      return conflict;
    },

    getMajorDiagonalAt: function(startingPoint) {
      var diagonal = [];
      while (this._isInBounds(startingPoint.row, startingPoint.col)) {
        diagonal.push(this.attributes[startingPoint.row++][startingPoint.col++]);
      }
      return diagonal;
    },

    hasMajorDiagonalConflictAt: function(startingPoint){
      return (this.getMajorDiagonalAt(startingPoint)).sum() > 1;
    },

    hasAnyMajorDiagonalConflicts: function(){
      var indices = [];
      var conflict = false;
      for (var i = 0; i < this.attributes.n; i++) {
        indices.push({row: 0, col: i});
      }
      for (var j = 1; j < this.attributes.n; j++) {
        indices.push({row: j, col: 0});
      }
      for (var k = 0; k < indices.length; k++) {
        conflict = conflict || this.hasMajorDiagonalConflictAt(indices[k]);
      }
      return conflict;
    },

    getMinorDiagonalAt: function(startingPoint) {
      var diagonal = [];
      while (this._isInBounds(startingPoint.row, startingPoint.col)) {
        diagonal.push(this.attributes[startingPoint.row++][startingPoint.col--]);
      }
      return diagonal;
    },

    hasMinorDiagonalConflictAt: function(startingPoint){
      return (this.getMinorDiagonalAt(startingPoint)).sum() > 1;
    },

    hasAnyMinorDiagonalConflicts: function(){
      var indices = [];
      var conflict = false;
      for (var i = 0; i < this.attributes.n; i++) {
        indices.push({row: 0, col: i});
      }
      for (var j = 1; j < this.attributes.n; j++) {
        indices.push({row: j, col: (this.attributes.n - 1) });
      }
      for (var k = 0; k < indices.length; k++) {
        conflict = conflict || this.hasMinorDiagonalConflictAt(indices[k]);
      }
      return conflict;    }

  });

  var makeEmptyMatrix = function(n){
    return _(_.range(n)).map(function(){
      return _(_.range(n)).map(function(){
        return 0;
      });
    });
  };

}());
