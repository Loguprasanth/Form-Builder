import React from "react";
import {
  Box,
  Typography,
  Switch,
  TextField,
  Checkbox,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import {
  FaTriangleExclamation,
  FaRuler,
  FaEnvelope,
} from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import type { FormField } from "../../types/FormField";

type ValidationTabProps = {
  field: FormField;
  onChange: (updatedField: FormField) => void;
};

const ValidationTab: React.FC<ValidationTabProps> = ({ field, onChange }) => {
  const theme = useTheme();

  const updateValidation = (key: string, value: any) => {
    onChange({
      ...field,
      validation: {
        ...(field.validation || {}),
        [key]: value,
      },
    });
  };

  const sectionBox = {
    p: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[50],
  };

  const iconStyle = (color: string) => ({
    color,
    marginRight: theme.spacing(1),
  });

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle2" fontWeight={600} color="text.primary">
        Validation Rules
      </Typography>

      {/* Not Empty */}
      <Box sx={{ ...sectionBox, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FaTriangleExclamation style={iconStyle(theme.palette.warning.main)} />
          <Typography variant="body2" fontWeight={500}>
            Not Empty
          </Typography>
        </Box>
        <Switch
          checked={!!field.validation?.required}
          onChange={(e) => updateValidation("required", e.target.checked)}
          color="primary"
        />
      </Box>

      {/* Length Validation */}
      <Box sx={{ ...sectionBox, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FaRuler style={iconStyle(theme.palette.primary.main)} />
            <Typography variant="body2" fontWeight={500}>
              Length Validation
            </Typography>
          </Box>
          <Switch
            checked={!!field.validation?.lengthEnabled}
            onChange={(e) => updateValidation("lengthEnabled", e.target.checked)}
            color="primary"
          />
        </Box>

        {field.validation?.lengthEnabled && (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
            <Box>
              <Typography variant="caption" fontWeight={500} color="text.secondary" mb={0.5} display="block">
                Min Length
              </Typography>
              <TextField
                type="number"
                size="small"
                placeholder="0"
                value={field.validation?.minLength ?? ""}
                onChange={(e) =>
                  updateValidation("minLength", e.target.value ? Number(e.target.value) : undefined)
                }
                inputProps={{ min: 0 }}
                fullWidth
              />
            </Box>
            <Box>
              <Typography variant="caption" fontWeight={500} color="text.secondary" mb={0.5} display="block">
                Max Length
              </Typography>
              <TextField
                type="number"
                size="small"
                placeholder="255"
                value={field.validation?.maxLength ?? ""}
                onChange={(e) =>
                  updateValidation("maxLength", e.target.value ? Number(e.target.value) : undefined)
                }
                inputProps={{ min: 1 }}
                fullWidth
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* Email Format */}
      <Box sx={{ ...sectionBox, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FaEnvelope style={iconStyle(theme.palette.success.main)} />
          <Typography variant="body2" fontWeight={500}>
            Email Format
          </Typography>
        </Box>
        <Switch
          checked={!!field.validation?.email}
          onChange={(e) => updateValidation("email", e.target.checked)}
          color="primary"
        />
      </Box>

      {/* Password Rules — only for password fields */}
      {field.type === "password" && (
        <Box sx={{ ...sectionBox, display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FaLock style={iconStyle(theme.palette.secondary.main)} />
            <Typography variant="body2" fontWeight={500}>
              Password Rules
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, ml: 1 }}>
            {[
              { key: "min8", label: "Minimum 8 characters" },
              { key: "includeNumber", label: "Include at least one number" },
              { key: "includeUppercase", label: "Include at least one uppercase letter" },
              { key: "includeSpecial", label: "Include at least one special character" },
            ].map((rule) => (
              <FormControlLabel
                key={rule.key}
                control={
                  <Checkbox
                    checked={!!field.validation?.passwordRules?.[rule.key]}
                    onChange={(e) =>
                      updateValidation("passwordRules", {
                        ...(field.validation?.passwordRules || {}),
                        [rule.key]: e.target.checked,
                      })
                    }
                    color="primary"
                    size="small"
                  />
                }
                label={
                  <Typography variant="caption" color="text.secondary">
                    {rule.label}
                  </Typography>
                }
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ValidationTab;
