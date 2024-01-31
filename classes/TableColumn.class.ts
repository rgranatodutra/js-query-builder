class TableColumn<X extends Record<string, any>> {
    private readonly alias: string;
    private readonly column: string;

    constructor(alias: string, column: keyof X) {
        this.alias = alias;
        this.column = String(column);
    }

    public toString(): `${string}.${string}` {
        return `${this.alias}.${this.column}`;
    }
}

export default TableColumn;