import React from "react";
import {
  IconButton,
  Box,
  Typography,
  Chip,
  TextField,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { appTheme } from "../../theme";
import type { FormField } from "../../types/FormField";

type FieldCardProps = {
  field: FormField;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isEditing?: boolean;
  onLabelChange?: (id: string, newLabel: string) => void;
};

const FieldCard: React.FC<FieldCardProps> = ({
  field,
  onEdit,
  onDelete,
  isEditing = false,
  onLabelChange,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Box
      sx={{
        backgroundColor: appTheme.colors.white,
        borderRadius: "8px",
        border: `1px solid ${appTheme.colors.border}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        "&:hover": { borderColor: appTheme.colors.primary },
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Top Row */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Drag Handle */}
            <DragIndicatorIcon sx={{ color: "#9ca3af", mr: 1 }} />

            {/* Label or Edit Input */}
            {isEditing ? (
              <TextField
                inputRef={inputRef}
                size="small"
                value={field.label}
                onChange={(e) =>
                  onLabelChange?.(field.id, e.target.value)
                }
                onBlur={() => onEdit("")} // stop editing on blur
                variant="standard"
                sx={{ minWidth: "150px" }}
              />
            ) : (
              <Typography
                variant="body2"
                fontWeight={500}
                onClick={() => onEdit(field.id)}
                sx={{ cursor: "pointer" }}
              >
                {field.label}
              </Typography>
            )}
          </Box>

          {/* Actions */}
          <Box>
            <IconButton size="small" onClick={() => onEdit(field.id)}>
              <SettingsIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(field.id)}>
              <DeleteIcon sx={{ fontSize: 18, color: "red" }} />
            </IconButton>
          </Box>
        </Box>

        {/* Field Type & Required */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {field.type === "text" ? "Text Field" : `${field.type} Field`}
          </Typography>
          {field.required && (
            <Chip
              size="small"
              label="Required"
              sx={{
                ml: 1,
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                fontSize: "0.7rem",
              }}
            />
          )}
        </Box>

        {/* Field Input Preview */}
        <TextField
          size="small"
          placeholder={field.placeholder}
          fullWidth
          disabled
        />

        {/* Derived Info */}
        {field.derivedFrom && (
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              display: "block",
              color: appTheme.colors.primary,
            }}
          >
            Derived from: {field.derivedFrom}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FieldCard;
