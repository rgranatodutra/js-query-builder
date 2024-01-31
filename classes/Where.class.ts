import { Connection } from "mysql2/promise";
import { ComparisonOperator, PrimarySQLType } from "../types";
import SelectTable from "./SelectTable.class";
import TableColumn from "./TableColumn.class";

class WhereClause<X extends Record<string, any>>{
    private whereString: string;
    private whereParameters: Array<PrimarySQLType | Array<PrimarySQLType>>;
    private selectTable: SelectTable<X>;

    constructor(selectTable: SelectTable<X>) {
        this.whereString = "";
        this.whereParameters = [];
        this.selectTable = selectTable;
    }

    public and() {
        this.whereString += " AND";
        return this;
    }

    public not() {
        this.whereString += " NOT";
        return this;
    }

    public or() {
        this.whereString += " OR";
        return this;
    }

    public compare<Y extends Record<string, any>, Z extends keyof Y>(
        column: TableColumn<Y>,
        operator: ComparisonOperator,
        value: TableColumn<X> | Y[Z]
    ) {
        if (value instanceof TableColumn) {
            this.whereString += ` ${column.toString()} ${operator} ${value}`;
        } else {
            this.whereString += ` ${column.toString()} ${operator} ?`;
            this.whereParameters.push(value);
        }

        return this;
    }

    public inSet<T extends Record<string, any>>(alias: string, column: keyof T & string, set: Set<X[keyof X]>) {
        const placeholders = Array.from<string>(set).fill('?').join(', ');
        this.whereString += ` ${alias}${column} IN (${placeholders})`;
        this.whereParameters.push(...Array.from(set));

        return this;
    }

    public isNull<Y extends Record<string, any>>(column: TableColumn<Y>) {
        this.whereString += ` ${column.toString()} IS NULL`;

        return this;
    }

    public isNotNull<Y extends Record<string, any>>(column: TableColumn<Y>) {
        this.whereString += ` ${column.toString()} IS NOT NULL`;

        return this;
    }

    public buildWhereClause() {
        return [this.whereString ? `\nWHERE ${this.whereString}` : "", this.whereParameters];
    }

    public build() {
        return this.selectTable.build();
    }

    public run<T extends Record<string, any>>(connection: Connection | Promise<Connection>) {
        return this.selectTable.run<T>(connection);
    }
}

export default WhereClause;