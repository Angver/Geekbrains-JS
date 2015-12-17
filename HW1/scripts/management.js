var management = function () {
    this.rowClass = 'div-table-row';
    this.colClass = 'div-table-col';
    this.itemClass = 'div-item';
    this.targetClass = 'target';

    this.codeLeft = 37;
    this.codeUp = 38;
    this.codeRight = 39;
    this.codeDown = 40;

    this.matrixSize = {};
    this.currentElement = document.getElementsByClassName(this.colClass)[0];
    this.currentRow = 0;
    this.currentCol = 0;
    this.targetCol = 3;
    this.targetRow = 4;

    this.initiate();

    this.attachEvents();
};

management.prototype.initiate = function () {
    this.setMatrixSize();

    this.currentElement.classList.add(this.itemClass);
    document
        .getElementsByClassName(this.rowClass)[this.targetRow]
        .getElementsByClassName(this.colClass)[this.targetCol]
        .classList.add(this.targetClass);
};

management.prototype.attachEvents = function () {
    var that = this;
    document.onkeydown = function (e) {
        that.checkKey(e);
    }
};

management.prototype.checkKey = function (e) {
    switch (e.keyCode) {
        case this.codeDown:
            this.onKeyPressDown();
            break;

        case this.codeLeft:
            this.onKeyPressLeft();
            break;

        case this.codeRight:
            this.onKeyPressRight();
            break;

        case this.codeUp:
            this.onKeyPressUp();
            break;
    }
};

management.prototype.onKeyPressDown = function () {
    this.moveToNewPosition(this.currentCol, this.currentRow + 1);
};

management.prototype.onKeyPressLeft = function () {
    this.moveToNewPosition(this.currentCol - 1, this.currentRow);
};

management.prototype.onKeyPressRight = function () {
    this.moveToNewPosition(this.currentCol + 1, this.currentRow);
};

management.prototype.onKeyPressUp = function () {
    this.moveToNewPosition(this.currentCol, this.currentRow - 1);
};

management.prototype.setCurrentPosition = function (row, col) {
    this.currentCol = col;
    this.currentRow = row;
};

management.prototype.setMatrixSize = function () {
    var rows = document.getElementsByClassName(this.rowClass);
    this.matrixSize['rows'] = rows.length;
    this.matrixSize['cols'] = rows[0].getElementsByClassName(this.colClass).length;
};

management.prototype.checkNewPosition = function (newCol, newRow) {
    if (newCol >= this.matrixSize['cols'] || newRow >= this.matrixSize['rows'] || newCol < 0 || newRow < 0) {
        return false;
    }

    return true;
};

management.prototype.moveToNewPosition = function (newCol, newRow) {
    if (!this.checkNewPosition(newCol, newRow)) {
        return false;
    }

    this.currentElement.classList.remove(this.itemClass);

    var targetRow = document.getElementsByClassName(this.rowClass)[newRow];
    var targetCol = targetRow.children[newCol];

    this.currentElement = targetCol;
    this.currentElement.classList.add(this.itemClass);

    this.setCurrentPosition(newRow, newCol);

    if (this.targetCol == newCol && this.targetRow == newRow) {
        alert('Вы выиграли');
    }
};

new management();