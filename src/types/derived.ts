// src/types/derived.ts
export type FieldRef = { id: string; type: "number" | "text" | "date" | "checkbox" | "radio" | "select" };

export type ComparisonOperator =
  | "equals"
  | "not_equals"
  | "greater_than"
  | "less_than"
  | "contains"
  | "is_empty";

export type LogicalOperator = "AND" | "OR";

export interface Condition {
  id: string; // unique id for UI (generate with uuid / timestamp)
  fieldId: string;
  operator: ComparisonOperator;
  // store value as string; evaluator will convert based on field type
  value: string;
}

export type ArithmeticOperator = "multiply" | "add" | "subtract" | "divide";

export type Operand =
  | { type: "field"; fieldId: string }
  | { type: "constant"; value: number };

export interface ThenAction {
  targetFieldId: string; // the derived field to set
  operator: ArithmeticOperator;
  left: Operand; // left operand can be field or constant
  right: Operand;
}

export interface DerivedConditionalConfig {
  conditions: Condition[]; // all conditions evaluated using logicalOperator
  logicalOperator: LogicalOperator; // apply between conditions
  then: ThenAction;
  else: ThenAction | { type: "constant"; value: number } ;
}

export interface FormValues {
  [fieldId: string]: any; // raw values coming from preview form inputs
}
