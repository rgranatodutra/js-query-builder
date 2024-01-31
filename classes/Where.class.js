"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TableColumn_class_1 = require("./TableColumn.class");
var WhereClause = /** @class */ (function () {
    function WhereClause(selectTable) {
        this.whereString = "";
        this.whereParameters = [];
        this.selectTable = selectTable;
    }
    WhereClause.prototype.and = function () {
        this.whereString += " AND";
        return this;
    };
    WhereClause.prototype.not = function () {
        this.whereString += " NOT";
        return this;
    };
    WhereClause.prototype.or = function () {
        this.whereString += " OR";
        return this;
    };
    WhereClause.prototype.compare = function (column, operator, value) {
        if (value instanceof TableColumn_class_1.default) {
            this.whereString += " ".concat(column.toString(), " ").concat(operator, " ").concat(value);
        }
        else {
            this.whereString += " ".concat(column.toString(), " ").concat(operator, " ?");
            this.whereParameters.push(value);
        }
        return this;
    };
    WhereClause.prototype.inSet = function (alias, column, set) {
        var _a;
        var placeholders = Array.from(set).fill('?').join(', ');
        this.whereString += " ".concat(alias).concat(column, " IN (").concat(placeholders, ")");
        (_a = this.whereParameters).push.apply(_a, Array.from(set));
        return this;
    };
    WhereClause.prototype.isNull = function (column) {
        this.whereString += " ".concat(column.toString(), " IS NULL");
        return this;
    };
    WhereClause.prototype.isNotNull = function (column) {
        this.whereString += " ".concat(column.toString(), " IS NOT NULL");
        return this;
    };
    WhereClause.prototype.buildWhereClause = function () {
        return [this.whereString ? "\nWHERE ".concat(this.whereString) : "", this.whereParameters];
    };
    WhereClause.prototype.build = function () {
        return this.selectTable.build();
    };
    WhereClause.prototype.run = function (connection) {
        return this.selectTable.run(connection);
    };
    return WhereClause;
}());
exports.default = WhereClause;
