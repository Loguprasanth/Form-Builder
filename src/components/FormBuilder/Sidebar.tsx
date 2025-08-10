import React from "react";
import { appTheme } from "../../theme";
import { Box, Typography, Button } from "@mui/material";
import {
  FaFont,
  FaHashtag,
  FaAlignLeft,
  FaList,
  FaCircleDot,
  FaSquareCheck,
  FaCalendarDays,
  FaEnvelope,
  FaLock,
  FaCircleQuestion,
} from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import type { FormField } from "../../types/FormField";

type SidebarProps = {
  onAddField: (field: FormField) => void;
};

const fieldTypes = [
  { label: "Text", icon: <FaFont />, type: "text" },
  { label: "Number", icon: <FaHashtag />, type: "number" },
  { label: "Textarea", icon: <FaAlignLeft />, type: "textarea" },
  { label: "Select", icon: <FaList />, type: "select" },
  { label: "Radio", icon: <FaCircleDot />, type: "radio" },
  { label: "Checkbox", icon: <FaSquareCheck />, type: "checkbox" },
  { label: "Date", icon: <FaCalendarDays />, type: "date" },
  { label: "Email", icon: <FaEnvelope />, type: "email" },
  { label: "Password", icon: <FaLock />, type: "password" },
] as const;

const Sidebar: React.FC<SidebarProps> = ({ onAddField }) => {
  const handleAdd = (type: FormField["type"], label: string) => {
    onAddField({
      id: uuidv4(),
      label: `New ${label} Field`,
      type,
      required: false,
      placeholder: `Enter ${label.toLowerCase()}`,
    });
  };

  return (
    <Box
      sx={{
        width: "256px",
        backgroundColor: appTheme.colors.white,
        borderRight: `1px solid ${appTheme.colors.border}`,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          padding: "16px",
          borderBottom: `1px solid ${appTheme.colors.border}`,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: appTheme.font.weightMedium,
            color: appTheme.colors.textSecondary,
          }}
        >
          FIELD TYPES
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280" }}>
          Drag or click to add fields
        </Typography>
      </Box>

      {/* Field List */}
      <Box sx={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {fieldTypes.map((f) => (
          <Box
            key={f.label}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              backgroundColor: appTheme.colors.white,
              border: `1px solid ${appTheme.colors.border}`,
              borderRadius: appTheme.radius.sm,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "all 0.2s",
              mb: 1.5,
              "&:hover": {
                borderColor: appTheme.colors.primary,
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              },
            }}
            onClick={() => handleAdd(f.type, f.label)}
          >
            <Box
              sx={{
                color: appTheme.colors.primary,
                fontSize: "16px",
                mr: 2,
              }}
            >
              {f.icon}
            </Box>
            <Typography variant="body2">{f.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          padding: "16px",
          borderTop: `1px solid ${appTheme.colors.border}`,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={<FaCircleQuestion />}
          sx={{
            backgroundColor: "#f3f4f6",
            color: "#4b5563",
            "&:hover": { backgroundColor: "#e5e7eb" },
            textTransform: "none",
          }}
        >
          Help & Documentation
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
