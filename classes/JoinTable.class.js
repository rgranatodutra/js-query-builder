"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JoinTable = /** @class */ (function () {
    function JoinTable(_a) {
        var alias = _a.alias, aliasB = _a.aliasB, name = _a.name, columns = _a.columns, condition = _a.condition, type = _a.type;
        this.alias = alias;
        this.aliasB = aliasB;
        this.name = name;
        this.columns = columns;
        this.condition = condition;
        this.joinType = type;
    }
    JoinTable.prototype.toString = function () {
        return "".concat(this.joinType, " ").concat(this.name, " ").concat(this.alias, " ON ").concat(this.condition.toString(this.alias || this.name, this.aliasB));
    };
    return JoinTable;
}());
exports.default = JoinTable;
