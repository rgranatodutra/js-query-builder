"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var formatColumns_util_1 = require("../utils/formatColumns.util");
var JoinTable_class_1 = require("./JoinTable.class");
var Where_class_1 = require("./Where.class");
var SelectTable = /** @class */ (function () {
    function SelectTable(props) {
        this.alias = props.alias;
        this.name = props.name;
        this.columns = props.columns;
        this.joinTables = [];
        this.whereClause = new Where_class_1.default(this);
    }
    SelectTable.prototype.leftJoin = function (_a) {
        var alias = _a.alias, aliasB = _a.aliasB, name = _a.name, columns = _a.columns, condition = _a.condition;
        this.join({ alias: alias, aliasB: aliasB, name: name, columns: columns, condition: condition, type: types_1.SQLJoinType.LEFT });
        return this;
    };
    SelectTable.prototype.rightJoin = function (_a) {
        var alias = _a.alias, aliasB = _a.aliasB, name = _a.name, columns = _a.columns, condition = _a.condition;
        this.join({ alias: alias, aliasB: aliasB, name: name, columns: columns, condition: condition, type: types_1.SQLJoinType.RIGHT });
        return this;
    };
    SelectTable.prototype.innerJoin = function (_a) {
        var alias = _a.alias, aliasB = _a.aliasB, name = _a.name, columns = _a.columns, condition = _a.condition;
        this.join({ alias: alias, aliasB: aliasB, name: name, columns: columns, condition: condition, type: types_1.SQLJoinType.INNER });
        return this;
    };
    SelectTable.prototype.fullJoin = function (_a) {
        var alias = _a.alias, aliasB = _a.aliasB, name = _a.name, columns = _a.columns, condition = _a.condition;
        this.join({ alias: alias, aliasB: aliasB, name: name, columns: columns, condition: condition, type: types_1.SQLJoinType.FULL });
        return this;
    };
    SelectTable.prototype.crossJoin = function (_a) {
        var alias = _a.alias, aliasB = _a.aliasB, name = _a.name, columns = _a.columns, condition = _a.condition;
        this.join({ alias: alias, aliasB: aliasB, name: name, columns: columns, condition: condition, type: types_1.SQLJoinType.CROSS });
        return this;
    };
    SelectTable.prototype.join = function (_a) {
        var alias = _a.alias, aliasB = _a.aliasB, name = _a.name, columns = _a.columns, condition = _a.condition, type = _a.type;
        var joinTable = new JoinTable_class_1.default({ alias: alias, aliasB: aliasB, name: name, columns: columns, condition: condition, type: type });
        this.joinTables.push(joinTable);
        return this;
    };
    SelectTable.prototype.where = function () {
        return this.whereClause;
    };
    SelectTable.prototype.buildSelectColumnsFrom = function () {
        var query = "SELECT";
        var mainTableColumns = (0, formatColumns_util_1.default)(this.alias || this.name, this.columns || "*");
        var joinedTableColumns = this.joinTables
            .map(function (jt) { return (0, formatColumns_util_1.default)(jt.alias || jt.name, jt.columns); })
            .join(", \n");
        if (mainTableColumns)
            query += "\n".concat(mainTableColumns);
        if (mainTableColumns && joinedTableColumns)
            query += ',';
        if (joinedTableColumns)
            query += "\n".concat(joinedTableColumns);
        query += "\nFROM ".concat(this.name, " ").concat(this.alias);
        return query;
    };
    SelectTable.prototype.buildJoinTables = function () {
        return this.joinTables.map(function (c) { return c.toString(); }).join("\n");
    };
    SelectTable.prototype.build = function () {
        var selectXFrom = this.buildSelectColumnsFrom();
        var joinTables = this.buildJoinTables();
        var _a = this.whereClause.buildWhereClause(), where = _a[0], whereParameters = _a[1];
        var query = "".concat(selectXFrom, "\n").concat(joinTables).concat(where);
        return [query, whereParameters];
    };
    SelectTable.prototype.run = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, queryString, queryParams, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.build(), queryString = _a[0], queryParams = _a[1];
                        return [4 /*yield*/, connection];
                    case 1: return [4 /*yield*/, (_b.sent()).execute(queryString, queryParams)];
                    case 2:
                        rows = (_b.sent())[0];
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    return SelectTable;
}());
exports.default = SelectTable;
