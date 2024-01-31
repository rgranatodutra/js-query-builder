import JoinTableCondition from "./classes/JoinCondition.class";

export enum ComparisonOperator {
    EQUALS = "=",
    BIGGER_THAN = ">",
    LOWER_THAN = "<",
    BIGGER_OR_EQUALS_THAN = ">=",
    LOWER_OR_EQUALS_THAN = "<=",
    DIFFERENT = "<>",
}

export enum LogicalOperator {
    IS_NULL = "IS NULL",
    IS_NOT_NULL = "IS NOT NULL",
}

export type InOperator = "IN";
export type NotOperator = "NOT";
export type PrimarySQLType = string | number | Date | boolean | Object;
export type TableColumnAs<X extends Record<string, any>> = keyof X & string | [keyof X & string, string];

export enum SQLJoinType {
    LEFT = "LEFT JOIN",
    RIGHT = "RIGHT JOIN",
    INNER = "INNER JOIN",
    FULL = "FULL JOIN",
    CROSS = "CROSS JOIN",
}

export interface TableOptions<X extends Record<string, any>> {
    readonly alias?: string;
    readonly name: string;
    readonly columns?: Array<TableColumnAs<X>> | "*";
}

export interface TableJoinArgs<B extends Record<string, any>, A extends Record<string, any>> {
    alias?: string;
    aliasB: string;
    name: string;
    columns: Array<TableColumnAs<B>> | "*";
    condition: JoinTableCondition<B, any>;
}

export interface TableJoinArgsWithType<B extends Record<string, any>, A extends Record<string, any>> extends TableJoinArgs<B, A> {
    type: SQLJoinType;
}

export interface JoinTableConstructorOptions<B extends Record<string, any>, A extends Record<string, any>> {
    alias?: string,
    aliasB: string,
    name: string,
    columns: Array<TableColumnAs<B>> | "*",
    condition: JoinTableCondition<B, A>,
    type: SQLJoinType
}