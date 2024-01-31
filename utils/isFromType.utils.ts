import { ComparisonOperator, InOperator, LogicalOperator, NotOperator } from "../types";

export const isOperatorNot = (value: any): value is NotOperator => value === "NOT";
export const isOperatorIn = (value: any): value is InOperator => value === "IN";
export const isLogicalOperator = (value: any): value is LogicalOperator => value in LogicalOperator;
export const isComparisonOperator = (value: any): value is ComparisonOperator => value in ComparisonOperator;