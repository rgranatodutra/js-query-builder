"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JoinCondition = /** @class */ (function () {
    function JoinCondition(columnA, operator, columnB) {
        this.columnA = columnA;
        this.columnB = columnB;
        this.operator = operator;
    }
    JoinCondition.prototype.toString = function (a, b) {
        return "".concat(a, ".").concat(this.columnA, " ").concat(this.operator, " ").concat(b, ".").concat(this.columnB);
    };
    return JoinCondition;
}());
exports.default = JoinCondition;
