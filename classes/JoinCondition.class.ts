import { ComparisonOperator } from "../types";

class JoinCondition<X extends Record<string, any>, Y extends Record<string, any>> {
    private readonly columnA: keyof X & string;
    private readonly columnB: keyof Y & string;
    private readonly operator: "=" | ">" | "<" | ">=" | "<=" | "<>";

    constructor(
        columnA: keyof X & string,
        operator: "=" | ">" | "<" | ">=" | "<=" | "<>",
        columnB: keyof Y & string
    ) {
        this.columnA = columnA;
        this.columnB = columnB;
        this.operator = operator;
    }

    public toString(a: string, b: string): string {
        return `${a}.${this.columnA} ${this.operator} ${b}.${this.columnB}`;
    }
}

export default JoinCondition;