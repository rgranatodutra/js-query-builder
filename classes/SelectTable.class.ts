import { Connection } from "mysql2/promise";
import { SQLJoinType, TableColumnAs, TableJoinArgs, TableJoinArgsWithType, TableOptions } from "../types";
import formatColumns from "../utils/formatColumns.util";
import JoinTable from "./JoinTable.class";
import WhereClause from "./Where.class";

class SelectTable<A extends Record<string, any>> {
    private readonly name: string;
    private readonly alias?: string;
    private readonly whereClause: WhereClause<A>;
    private readonly columns?: Array<TableColumnAs<A>> | "*";
    private readonly joinTables: Array<JoinTable<any, A>>;

    constructor(props: TableOptions<A>) {
        this.alias = props.alias;
        this.name = props.name;
        this.columns = props.columns;
        this.joinTables = [];
        this.whereClause = new WhereClause(this);
    }

    public leftJoin<B extends Record<string, any>>({ alias, aliasB, name, columns, condition }: TableJoinArgs<B, A>) {
        this.join<B>({ alias, aliasB, name, columns, condition, type: SQLJoinType.LEFT });
        return this;
    }

    public rightJoin<B extends Record<string, any>>({ alias, aliasB, name, columns, condition }: TableJoinArgs<B, A>) {
        this.join<B>({ alias, aliasB, name, columns, condition, type: SQLJoinType.RIGHT });
        return this;
    }

    public innerJoin<B extends Record<string, any>>({ alias, aliasB, name, columns, condition }: TableJoinArgs<B, A>) {
        this.join<B>({ alias, aliasB, name, columns, condition, type: SQLJoinType.INNER });
        return this;
    }

    public fullJoin<B extends Record<string, any>>({ alias, aliasB, name, columns, condition }: TableJoinArgs<B, A>) {
        this.join<B>({ alias, aliasB, name, columns, condition, type: SQLJoinType.FULL });
        return this;
    }

    public crossJoin<B extends Record<string, any>>({ alias, aliasB, name, columns, condition }: TableJoinArgs<B, A>) {
        this.join<B>({ alias, aliasB, name, columns, condition, type: SQLJoinType.CROSS });
        return this;
    }

    private join<B extends Record<string, any>>({ alias, aliasB, name, columns, condition, type }: TableJoinArgsWithType<B, A>) {
        const joinTable = new JoinTable<B, A>({ alias, aliasB, name, columns, condition, type });
        this.joinTables.push(joinTable);

        return this;
    }

    public where() {
        return this.whereClause;
    }

    private buildSelectColumnsFrom() {
        let query = "SELECT";

        const mainTableColumns = formatColumns(this.alias || this.name, this.columns || "*");
        const joinedTableColumns = this.joinTables
            .map(jt => formatColumns(jt.alias || jt.name, jt.columns))
            .join(", \n");

        if (mainTableColumns) query += `\n${mainTableColumns}`;
        if (mainTableColumns && joinedTableColumns) query += ',';
        if (joinedTableColumns) query += `\n${joinedTableColumns}`;

        query += `\nFROM ${this.name} ${this.alias}`;

        return query;
    }

    private buildJoinTables() {
        return this.joinTables.map(c => c.toString()).join("\n");
    }

    public build() {
        const selectXFrom = this.buildSelectColumnsFrom();
        const joinTables = this.buildJoinTables();
        const [where, whereParameters] = this.whereClause.buildWhereClause();

        const query = `${selectXFrom}\n${joinTables}${where}`;

        return [query, whereParameters];
    }

    public async run<T extends Record<string, any>>(connection: Connection | Promise<Connection>): Promise<Array<T>> {
        const [queryString, queryParams] = this.build();

        const [rows] = await (await connection).execute(queryString, queryParams);

        return rows;
    }
}

export default SelectTable;