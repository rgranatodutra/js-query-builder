"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLJoinType = exports.LogicalOperator = exports.ComparisonOperator = void 0;
var ComparisonOperator;
(function (ComparisonOperator) {
    ComparisonOperator["EQUALS"] = "=";
    ComparisonOperator["BIGGER_THAN"] = ">";
    ComparisonOperator["LOWER_THAN"] = "<";
    ComparisonOperator["BIGGER_OR_EQUALS_THAN"] = ">=";
    ComparisonOperator["LOWER_OR_EQUALS_THAN"] = "<=";
    ComparisonOperator["DIFFERENT"] = "<>";
})(ComparisonOperator || (exports.ComparisonOperator = ComparisonOperator = {}));
var LogicalOperator;
(function (LogicalOperator) {
    LogicalOperator["IS_NULL"] = "IS NULL";
    LogicalOperator["IS_NOT_NULL"] = "IS NOT NULL";
})(LogicalOperator || (exports.LogicalOperator = LogicalOperator = {}));
var SQLJoinType;
(function (SQLJoinType) {
    SQLJoinType["LEFT"] = "LEFT JOIN";
    SQLJoinType["RIGHT"] = "RIGHT JOIN";
    SQLJoinType["INNER"] = "INNER JOIN";
    SQLJoinType["FULL"] = "FULL JOIN";
    SQLJoinType["CROSS"] = "CROSS JOIN";
})(SQLJoinType || (exports.SQLJoinType = SQLJoinType = {}));
