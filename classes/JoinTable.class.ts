import { JoinTableConstructorOptions, SQLJoinType, TableColumnAs } from "../types";
import JoinTableCondition from "./JoinCondition.class";

class JoinTable<B extends Record<string, any>, A extends Record<string, any>> {
    readonly alias?: string;
    readonly aliasB: string;
    readonly name: string;
    readonly columns: Array<TableColumnAs<B>> | "*";
    readonly condition: JoinTableCondition<B, A>;
    readonly joinType: SQLJoinType;

    constructor({ alias, aliasB, name, columns, condition, type }: JoinTableConstructorOptions<B, A>) {
        this.alias = alias;
        this.aliasB = aliasB;
        this.name = name;
        this.columns = columns;
        this.condition = condition
        this.joinType = type;
    }

    public toString(): string {
        return `${this.joinType} ${this.name} ${this.alias} ON ${this.condition.toString(this.alias || this.name, this.aliasB)}`;
    }
}

export default JoinTable;