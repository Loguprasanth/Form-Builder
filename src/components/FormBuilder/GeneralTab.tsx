import React from "react";
import { Box, Typography, TextField, Switch } from "@mui/material";
import { FaFont } from "react-icons/fa6";
import type { FormField } from "../../types/FormField";
import { appTheme } from "../../theme";

// 🔹 Shared style tokens
const gray100 = "#f3f4f6";
const inputBaseStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    fontSize: "0.875rem",
  },
};
const labelStyle = {
  fontWeight: 500,
  mb: 0.5,
};

type GeneralTabProps = {
  field: FormField;
  onChange: (updatedField: FormField) => void;
};

const GeneralTab: React.FC<GeneralTabProps> = ({ field, onChange }) => {
  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Field Type */}
      <Box>
        <Typography variant="body2" sx={{ ...labelStyle, color: "text.primary" }}>
          Field Type
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            backgroundColor: gray100,
            borderRadius: "6px",
          }}
        >
          <FaFont style={{ color: appTheme.colors.primary, marginRight: 8 }} />
          <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
            {field.type} Field
          </Typography>
        </Box>
      </Box>

      {/* Field Label */}
      <Box>
        <Typography variant="body2" sx={labelStyle}>
          Field Label
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={field.label}
          onChange={(e) => onChange({ ...field, label: e.target.value })}
          sx={inputBaseStyle}
        />
      </Box>

      {/* Placeholder */}
      <Box>
        <Typography variant="body2" sx={labelStyle}>
          Placeholder Text
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={field.placeholder || ""}
          onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
          sx={inputBaseStyle}
        />
      </Box>

      {/* Help Text */}
      <Box>
        <Typography variant="body2" sx={labelStyle}>
          Help Text (Optional)
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Additional instructions for this field"
          value={field.helpText || ""}
          onChange={(e) => onChange({ ...field, helpText: e.target.value })}
          sx={inputBaseStyle}
        />
      </Box>

      {/* Default Value */}
      <Box>
        <Typography variant="body2" sx={labelStyle}>
          Default Value (Optional)
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Pre-filled value"
          value={field.defaultValue || ""}
          onChange={(e) => onChange({ ...field, defaultValue: e.target.value })}
          sx={inputBaseStyle}
        />
      </Box>

      {/* Required Toggle */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Required Field
        </Typography>
        <Switch
          checked={!!field.required}
          onChange={(e) => onChange({ ...field, required: e.target.checked })}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default GeneralTab;
