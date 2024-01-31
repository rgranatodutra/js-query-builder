"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatColumns = function (alias, columns) {
    return columns === "*"
        ? " ".concat(alias, ".*")
        : columns
            .map(function (column) {
            return typeof column === "string"
                ? " ".concat(alias, ".").concat(column)
                : " ".concat(alias, ".").concat(column[0], " AS ").concat(column[1]);
        })
            .join(",\n");
};
exports.default = formatColumns;
