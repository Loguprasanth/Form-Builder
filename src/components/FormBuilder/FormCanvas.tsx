
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { appTheme } from "../../theme";
import FieldCard from "./FieldCard";
import type { FieldType } from "../../types/FormField"; // adjust path


interface Field {
  id: string;
  label: string;
  placeholder: string;
  type: FieldType;
  required?: boolean;
  derivedFrom?: string;
}

const FormCanvas: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([
    { id: "1", label: "Full Name", placeholder: "Enter your full name", type: "text", required: true },
    { id: "2", label: "Email Address", placeholder: "Enter your email address", type: "email", required: true },
    { id: "3", label: "Username", placeholder: "Generated from email", type: "derived", derivedFrom: "Email Address (before '@')" },
  ]);

  const handleEdit = (id: string) => {
    console.log("Edit field", id);
  };

  const handleDelete = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: "24px",
        backgroundColor: appTheme.colors.background,
      }}
    >
      <Box sx={{ maxWidth: "768px", margin: "0 auto" }}>
        <Typography variant="h6" sx={{ fontWeight: appTheme.font.weightMedium, mb: 2 }}>
          Form Fields
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {fields.map((field) => (
            <FieldCard
              field={{
                id: "",
                label: "",
                type: "number",
                required: undefined,
                placeholder: undefined,
                derivedFrom: undefined,
                validation: undefined
              }} key={field.id}
              {...field}
              onEdit={() => handleEdit(field.id)}
              onDelete={() => handleDelete(field.id)}            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FormCanvas;





