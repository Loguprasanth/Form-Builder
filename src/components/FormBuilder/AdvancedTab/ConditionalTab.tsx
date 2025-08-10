import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { appTheme } from "../../../theme";
import type {
  Condition,
  DerivedConditionalConfig,
  LogicalOperator,
  Operand,
  ThenAction,
} from "../../../types/derived";
import { evaluateDerivedConditional } from "../../../utils/derivedEvaluator";

interface FieldOption {
  id: string;
  label: string;
  type: "number" | "text" | "date" | "checkbox" | "select" | "radio";
}

interface Props {
  fields?: FieldOption[];
  onChange?: (cfg: DerivedConditionalConfig) => void;
  previewValues?: Record<string, any>;
}

// ---------- defaults ----------
const defaultCondition = (fieldId = ""): Condition => ({
  id: uuidv4(),
  fieldId,
  operator: "equals",
  value: "",
});

const defaultThenAction = (fieldId = ""): ThenAction => ({
  targetFieldId: fieldId,
  operator: "multiply",
  left: { type: "field", fieldId },
  right: { type: "constant", value: 0.1 },
});

export default function ConditionalTab({
  fields = [],
  onChange,
  previewValues = {},
}: Props) {
  const firstFieldId = fields.length > 0 ? fields[0].id : "";

  const [conditions, setConditions] = useState<Condition[]>([
    defaultCondition(firstFieldId),
  ]);
  const [logicalOp, setLogicalOp] = useState<LogicalOperator>("AND");
  const [thenAction, setThenAction] = useState<ThenAction>(
    defaultThenAction(firstFieldId)
  );
  const [elseAction, setElseAction] = useState<
    ThenAction | { type: "constant"; value: number }
  >({ type: "constant", value: 0 });
  const [error, setError] = useState<string | null>(null);

  const config: DerivedConditionalConfig = useMemo(
    () => ({
      conditions,
      logicalOperator: logicalOp,
      then: thenAction,
      else: elseAction,
    }),
    [conditions, logicalOp, thenAction, elseAction]
  );

  // validation + emit change
  useEffect(() => {
    setError(null);
    if (conditions.length === 0) setError("Add at least one condition.");
    if (!thenAction.targetFieldId)
      setError("Select a target field for THEN.");
    if (onChange) onChange(config);
  }, [config, onChange, conditions.length, thenAction.targetFieldId]);

  // live preview eval
  const previewResult = useMemo(() => {
    return evaluateDerivedConditional(config, previewValues);
  }, [config, previewValues]);

  // handlers
  function addCondition() {
    setConditions((s) => [...s, defaultCondition(firstFieldId)]);
  }
  function removeCondition(id: string) {
    setConditions((s) => s.filter((c) => c.id !== id));
  }
  function updateCondition(id: string, patch: Partial<Condition>) {
    setConditions((s) =>
      s.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
  }
  function updateThen(p: Partial<ThenAction>) {
    setThenAction((t) => ({ ...t, ...p }));
  }
  function updateThenOperand(which: "left" | "right", op: Operand) {
    setThenAction((t) => ({ ...t, [which]: op }));
  }
  function updateElseConstant(v: number) {
    setElseAction({ type: "constant", value: v });
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* IF section */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        IF Conditions
      </Typography>
      <Box sx={{ mb: 2 }}>
        {conditions.map((cond, idx) => (
          <Box
            key={cond.id}
            sx={{
              p: 2,
              border: `1px solid ${appTheme.colors.border}`,
              borderRadius: appTheme.radius.md,
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Select
                size="small"
                value={cond.fieldId}
                onChange={(e) =>
                  updateCondition(cond.id, { fieldId: String(e.target.value) })
                }
                sx={{ minWidth: 160 }}
              >
                {fields.map((f) => (
                  <MenuItem key={f.id} value={f.id}>
                    {f.label} ({f.type})
                  </MenuItem>
                ))}
              </Select>

              <Select
                size="small"
                value={cond.operator}
                onChange={(e) =>
                  updateCondition(cond.id, {
                    operator: e.target.value as Condition["operator"],
                  })
                }
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="greater_than">&gt;</MenuItem>
                <MenuItem value="less_than">&lt;</MenuItem>
                <MenuItem value="equals">=</MenuItem>
                <MenuItem value="not_equals">!=</MenuItem>
                <MenuItem value="contains">contains</MenuItem>
                <MenuItem value="is_empty">is empty</MenuItem>
              </Select>

              <TextField
                size="small"
                value={cond.value}
                onChange={(e) =>
                  updateCondition(cond.id, { value: e.target.value })
                }
                sx={{ flex: 1 }}
                type={
                  fields.find((f) => f.id === cond.fieldId)?.type === "number"
                    ? "number"
                    : "text"
                }
              />

              <IconButton onClick={() => removeCondition(cond.id)} size="small">
                <Close fontSize="small" />
              </IconButton>
            </Box>

            {idx < conditions.length - 1 && (
              <Box
                sx={{
                  textAlign: "center",
                  color: appTheme.colors.textSecondary,
                  mt: 1,
                }}
              >
                {logicalOp}
              </Box>
            )}
          </Box>
        ))}

        <Button
          startIcon={<Add />}
          variant="text"
          onClick={addCondition}
          sx={{ color: appTheme.colors.primary, mt: 1 }}
        >
          Add Condition
        </Button>
      </Box>

      {/* AND/OR selector */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Combine conditions with
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant={logicalOp === "AND" ? "contained" : "outlined"}
            onClick={() => setLogicalOp("AND")}
          >
            AND
          </Button>
          <Button
            variant={logicalOp === "OR" ? "contained" : "outlined"}
            onClick={() => setLogicalOp("OR")}
          >
            OR
          </Button>
        </Box>
      </Box>

      {/* THEN */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        THEN
      </Typography>
      <Box sx={{ p: 2, border: `1px solid ${appTheme.colors.border}`, mb: 3 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Select
            size="small"
            value={thenAction.targetFieldId}
            onChange={(e) =>
              updateThen({ targetFieldId: String(e.target.value) })
            }
            sx={{ minWidth: 160 }}
          >
            {fields
              .filter((f) => f.type === "number")
              .map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.label}
                </MenuItem>
              ))}
          </Select>

          <Select
            size="small"
            value={thenAction.operator}
            onChange={(e) =>
              updateThen({ operator: e.target.value as ThenAction["operator"] })
            }
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="multiply">×</MenuItem>
            <MenuItem value="add">+</MenuItem>
            <MenuItem value="subtract">-</MenuItem>
            <MenuItem value="divide">÷</MenuItem>
          </Select>

          {/* Left operand */}
          <Select
            size="small"
            value={
              thenAction.left.type === "field"
                ? `field:${thenAction.left.fieldId}`
                : `const:${(thenAction.left as any).value}`
            }
            onChange={(e) => {
              const val = String(e.target.value);
              if (val.startsWith("field:"))
                updateThenOperand("left", {
                  type: "field",
                  fieldId: val.replace("field:", ""),
                });
              else
                updateThenOperand("left", {
                  type: "constant",
                  value: Number(val.replace("const:", "")),
                });
            }}
            sx={{ minWidth: 160 }}
          >
            {fields
              .filter((f) => f.type === "number")
              .map((f) => (
                <MenuItem key={"l" + f.id} value={`field:${f.id}`}>
                  {f.label}
                </MenuItem>
              ))}
            <MenuItem value={`const:1`}>Constant: 1</MenuItem>
            <MenuItem value={`const:0.1`}>Constant: 0.1</MenuItem>
            <MenuItem value={`const:100`}>Constant: 100</MenuItem>
          </Select>

          {/* Right operand */}
          <Select
            size="small"
            value={
              thenAction.right.type === "field"
                ? `field:${thenAction.right.fieldId}`
                : `const:${(thenAction.right as any).value}`
            }
            onChange={(e) => {
              const val = String(e.target.value);
              if (val.startsWith("field:"))
                updateThenOperand("right", {
                  type: "field",
                  fieldId: val.replace("field:", ""),
                });
              else
                updateThenOperand("right", {
                  type: "constant",
                  value: Number(val.replace("const:", "")),
                });
            }}
            sx={{ minWidth: 160 }}
          >
            {fields
              .filter((f) => f.type === "number")
              .map((f) => (
                <MenuItem key={"r" + f.id} value={`field:${f.id}`}>
                  {f.label}
                </MenuItem>
              ))}
            <MenuItem value={`const:1`}>Constant: 1</MenuItem>
            <MenuItem value={`const:0.1`}>Constant: 0.1</MenuItem>
            <MenuItem value={`const:100`}>Constant: 100</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* ELSE */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        ELSE
      </Typography>
      <Box sx={{ p: 2, border: `1px solid ${appTheme.colors.border}`, mb: 3 }}>
        <TextField
          size="small"
          type="number"
          value={
            typeof elseAction === "object" &&
            "type" in elseAction &&
            (elseAction as any).type === "constant"
              ? String((elseAction as any).value)
              : "0"
          }
          onChange={(e) => updateElseConstant(Number(e.target.value))}
          fullWidth
        />
      </Box>

      {/* error */}
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* technical + preview */}
      <Box
        sx={{
          p: 2,
          backgroundColor: appTheme.colors.secondary,
          borderRadius: appTheme.radius.md,
        }}
      >
        <Typography variant="caption" sx={{ fontFamily: "monospace", mb: 1 }}>
          Technical view
        </Typography>
        <Box
          sx={{
            p: 1,
            backgroundColor: appTheme.colors.white,
            fontFamily: "monospace",
            fontSize: 12,
          }}
        >
          <pre style={{ margin: 0 }}>{JSON.stringify(config, null, 2)}</pre>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Live preview</Typography>
          <Typography variant="body2">
            Result:{" "}
            {previewResult.error
              ? `${previewResult.error}`
              : String(previewResult.value)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Hit: {String(previewResult.hit)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
