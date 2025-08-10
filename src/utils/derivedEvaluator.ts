// src/utils/derivedEvaluator.ts
import type{
  Condition,
  FormValues,
  ComparisonOperator,
  DerivedConditionalConfig,
  Operand,
  ThenAction,
} from "../types/derived";

/** Convert string input to typed value based on heuristics (numbers, date ISO, else string) */
function parseValueForComparison(raw: string) {
  if (raw === null || raw === undefined) return raw;
  // try number
  if (!Number.isNaN(Number(raw)) && raw.toString().trim() !== "") {
    return Number(raw);
  }
  // try date (ISO)
  const d = new Date(raw);
  if (!isNaN(d.getTime()) && raw.includes("-")) return d; // rough check
  // otherwise keep string
  return raw;
}

function compareValues(left: any, op: ComparisonOperator, rightRaw: string) {
  // normalize null/undefined
  if (left === undefined) left = null;

  const right = parseValueForComparison(rightRaw);

  switch (op) {
    case "equals":
      // use loose equality for date/number consistency after parsing
      if (left instanceof Date && right instanceof Date) return left.getTime() === right.getTime();
      return left == right;
    case "not_equals":
      if (left instanceof Date && right instanceof Date) return left.getTime() !== right.getTime();
      return left != right;
    case "greater_than":
      if (left === null) return false;
      if (left instanceof Date && right instanceof Date) return left.getTime() > right.getTime();
      return Number(left) > Number(right);
    case "less_than":
      if (left === null) return false;
      if (left instanceof Date && right instanceof Date) return left.getTime() < right.getTime();
      return Number(left) < Number(right);
    case "contains":
      if (left === null || left === undefined) return false;
      return left.toString().toLowerCase().includes(right.toString().toLowerCase());
    case "is_empty":
      return left === null || left === undefined || left === "";
    default:
      return false;
  }
}

/** Evaluate single condition using form values */
export function evalCondition(cond: Condition, values: FormValues) {
  const left = values[cond.fieldId];
  return compareValues(left, cond.operator as ComparisonOperator, cond.value);
}

/** Evaluate the list of conditions with logicalOperator */
export function evalConditions(conds: Condition[], logicalOperator: "AND" | "OR", values: FormValues) {
  if (!conds || conds.length === 0) return false;
  if (logicalOperator === "AND") return conds.every((c) => evalCondition(c, values));
  return conds.some((c) => evalCondition(c, values));
}

/** Resolve an operand (field or constant) into a number for numeric arithmetic.
 * returns NaN if cannot be resolved.
 */
function resolveOperand(op: Operand, values: FormValues): number {
  if (op.type === "constant") return Number(op.value);
  const v = values[op.fieldId];
  if (v === undefined || v === null) return NaN;
  // if date provided, we can't do arithmetic unless you define rules -> NaN
  if (v instanceof Date) return NaN;
  return Number(v);
}

function applyArithmetic(op: ThenAction["operator"], leftNum: number, rightNum: number) {
  switch (op) {
    case "multiply":
      return leftNum * rightNum;
    case "add":
      return leftNum + rightNum;
    case "subtract":
      return leftNum - rightNum;
    case "divide":
      return rightNum === 0 ? NaN : leftNum / rightNum;
    default:
      return NaN;
  }
}

/** Evaluate ThenAction to produce numeric result (or NaN) */
export function evalThenAction(action: ThenAction, values: FormValues): number {
  const leftNum = resolveOperand(action.left, values);
  const rightNum = resolveOperand(action.right, values);
  if (Number.isNaN(leftNum) || Number.isNaN(rightNum)) return NaN;
  return applyArithmetic(action.operator, leftNum, rightNum);
}

/** Evaluate full conditional config
 * returns { hit: boolean, value: number|null, error?: string }
 */
export function evaluateDerivedConditional(
  config: DerivedConditionalConfig,
  values: FormValues
): { hit: boolean; value: number | null; error?: string } {
  try {
    const ok = evalConditions(config.conditions, config.logicalOperator, values);
    if (ok) {
      const v = evalThenAction(config.then, values);
      if (Number.isNaN(v)) return { hit: true, value: null, error: "Then action produced NaN" };
      return { hit: true, value: v };
    } else {
      if ("type" in (config.else as any) && (config.else as any).type === "constant") {
        return { hit: false, value: (config.else as any).value ?? null };
      } else {
        // else is ThenAction
        const v = evalThenAction(config.else as ThenAction, values);
        if (Number.isNaN(v)) return { hit: false, value: null, error: "Else action produced NaN" };
        return { hit: false, value: v };
      }
    }
  } catch (err) {
    return { hit: false, value: null, error: (err as Error).message };
  }
}
