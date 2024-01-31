import { TableColumnAs } from "../types";

const formatColumns = (alias: string, columns: Array<TableColumnAs<any>> | "*") =>
    columns === "*"
        ? ` ${alias}.*`
        : columns
            .map(column =>
                typeof column === "string"
                    ? ` ${alias}.${column}`
                    : ` ${alias}.${column[0]} AS ${column[1]}`
            )
            .join(",\n");

export default formatColumns;