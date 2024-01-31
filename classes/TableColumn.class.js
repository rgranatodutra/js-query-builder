"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TableColumn = /** @class */ (function () {
    function TableColumn(alias, column) {
        this.alias = alias;
        this.column = String(column);
    }
    TableColumn.prototype.toString = function () {
        return "".concat(this.alias, ".").concat(this.column);
    };
    return TableColumn;
}());
exports.default = TableColumn;
