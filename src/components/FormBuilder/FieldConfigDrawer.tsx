import React, { useState, useEffect } from "react";
import { Drawer, Box, Typography, IconButton, Button, Divider } from "@mui/material";
import GeneralTab from "./GeneralTab";
import ValidationTab from "./ValidationTab";
import type { FormField } from "../../types/FormField";
import { appTheme } from "../../theme";
import AdvancedTab from "./AdvancedTab/AdvancedTab";
// 🔹 Common Styles
const borderColor = "#e5e7eb"; // Tailwind border-gray-200
const gray500 = "#6b7280";
const gray700 = "#374151";
const gray100 = "#f3f4f6";
const gray200 = "#e5e7eb";

const tabButtonBaseStyle = {
  flex: 1,
  py: 1.5,
  borderRadius: 0,
  fontSize: "0.875rem",
  fontWeight: 500,
  textTransform: "none" as const,
  "&:hover": {
    backgroundColor: "transparent",
  },
};

const footerButtonBase = {
  px: 2,
  py: 1,
  fontSize: "0.875rem",
  fontWeight: 500,
  borderRadius: "6px",
  textTransform: "none" as const,
};

type FieldConfigDrawerProps = {
  open: boolean;
  field: FormField | null;
  onClose: () => void;
  onSave: (updatedField: FormField) => void;
};

const FieldConfigDrawer: React.FC<FieldConfigDrawerProps> = ({
  open,
  field,
  onClose,
  onSave,
}) => {
  const [tab, setTab] = useState<"general" | "validation" | "advanced">("general");
  const [tempField, setTempField] = useState<FormField | null>(null);

  useEffect(() => {
    setTempField(field ? { ...field } : null);
  }, [field]);

  const handleApply = () => {
    if (tempField) onSave(tempField);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 384, display: "flex", flexDirection: "column" } }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <Typography variant="h6" fontSize="1.125rem" fontWeight={500}>
          Configure Field
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: gray500,
            "&:hover": {
              color: gray700,
              backgroundColor: gray100,
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 384 512"
            width="16"
            height="16"
          >
            <path d="M342.6 150.6c12.5-12.5 
              12.5-32.8 0-45.3s-32.8-12.5-45.3 
              0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 
              0s-12.5 32.8 0 45.3L146.7 256 
              41.4 361.4c-12.5 12.5-12.5 32.8 
              0 45.3s32.8 12.5 45.3 0L192 301.3 
              297.4 406.6c12.5 12.5 32.8 12.5 
              45.3 0s12.5-32.8 0-45.3L237.3 256 
              342.6 150.6z" />
          </svg>
        </IconButton>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: "flex", borderBottom: `1px solid ${borderColor}` }}>
        {[
          { key: "general", label: "General" },
          { key: "validation", label: "Validation" },
          { key: "advanced", label: "Advanced" },
        ].map((t) => {
          const isActive = tab === t.key;
          return (
            <Button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              sx={{
                ...tabButtonBaseStyle,
                borderBottom: `2px solid ${
                  isActive ? appTheme.colors.primary : "transparent"
                }`,
                color: isActive ? appTheme.colors.primary : gray500,
                "&:hover": {
                  ...tabButtonBaseStyle["&:hover"],
                  color: isActive ? appTheme.colors.primary : gray700,
                },
              }}
            >
              {t.label}
            </Button>
          );
        })}
      </Box>

      {/* Tab Content */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {tab === "general" && tempField && (
          <GeneralTab field={tempField} onChange={setTempField} />
        )}
           {tab === "validation" && tempField && (
          <ValidationTab field={tempField} onChange={setTempField} />
        )}
        {/* {tab === "advanced" && (
<AdvancedTab />
        )} */}
      </Box>

      <Divider sx={{ mt: "auto" }} />

      {/* Footer */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          borderTop: `1px solid ${borderColor}`,
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            ...footerButtonBase,
            color: gray700,
            backgroundColor: gray100,
            "&:hover": { backgroundColor: gray200 },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleApply}
          sx={{
            ...footerButtonBase,
            color: "#fff",
            backgroundColor: appTheme.colors.primary,
            "&:hover": { backgroundColor: appTheme.colors.primaryLight },
          }}
        >
          Apply Changes
        </Button>
      </Box>
    </Drawer>
  );
};

export default FieldConfigDrawer;
