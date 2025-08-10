import React, { useState } from "react";
import Sidebar from "../components/FormBuilder/Sidebar";
import { Box, TextField, Typography, IconButton } from "@mui/material";
import { appTheme } from "../theme";
import type { FormField } from "../types/FormField";

// DnD Kit imports
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableFieldCard from "../components/FormBuilder/SortableFieldCard";
import FieldConfigDrawer from "../components/FormBuilder/FieldConfigDrawer";

const CreatePage: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([
    {
      id: "1",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      id: "2",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Enter your email address",
    },
    {
      id: "3",
      label: "Username",
      type: "text",
      derivedFrom: "Email Address (before '@')",
      placeholder: "Generated from email",
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);

  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState(
    "Add a description for your form here."
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const handleAddField = (newField: FormField) => {
    setFields((prev) => [...prev, newField]);
    setSelectedField(newField);
    setDrawerOpen(true);
  };

  const handleLabelChange = (id: string, newLabel: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, label: newLabel } : f))
    );
  };

  const handleEdit = (id: string) => {
    const field = fields.find((f) => f.id === id) || null;
    setSelectedField(field);
    setDrawerOpen(true);
  };

  const handleApplyFieldChanges = (updatedField: FormField) => {
    setFields((prev) =>
      prev.map((f) => (f.id === updatedField.id ? updatedField : f))
    );
  };

  const handleDelete = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setFields((prev) => {
        const oldIndex = prev.findIndex((f) => f.id === active.id);
        const newIndex = prev.findIndex((f) => f.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>

      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar onAddField={handleAddField} />

        <Box
          sx={{
            flex: 1,
            padding: "24px",
            backgroundColor: appTheme.colors.background,
          }}
        >
          {/* Form Title / Description Card */}
          <Box
            sx={{
              backgroundColor: appTheme.colors.white,
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              p: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              {isEditingTitle ? (
                <TextField
                  variant="standard"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  autoFocus
                  sx={{ fontSize: "1.125rem", fontWeight: 500 }}
                />
              ) : (
                <Typography
                  variant="h6"
                  fontWeight={500}
                  onClick={() => setIsEditingTitle(true)}
                  sx={{ cursor: "pointer" }}
                >
                  {formTitle}
                </Typography>
              )}

              <IconButton
                size="small"
                onClick={() => setIsEditingTitle(true)}
                sx={{
                  color: "#6b7280",
                  "&:hover": {
                    color: appTheme.colors.primary,
                    backgroundColor: "#f3f4f6",
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  width="16"
                  height="16"
                >
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg>
              </IconButton>
            </Box>

            {isEditingDescription ? (
              <TextField
                variant="standard"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                onBlur={() => setIsEditingDescription(false)}
                autoFocus
                fullWidth
              />
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                onClick={() => setIsEditingDescription(true)}
                sx={{ cursor: "pointer" }}
              >
                {formDescription}
              </Typography>
            )}
          </Box>

          {/* Empty State or Fields List */}
          {fields.length === 0 ? (
            <Box
              sx={{
                backgroundColor: appTheme.colors.white,
                borderRadius: "8px",
                border: "2px dashed #d1d5db",
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Start Building Your Form
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Drag and drop fields from the sidebar or click to add them here
              </Typography>
            </Box>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field) => (
                  <Box key={field.id} mb={2}>
                    <SortableFieldCard
                      field={field}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onLabelChange={handleLabelChange}
                    />
                  </Box>
                ))}
              </SortableContext>
            </DndContext>
          )}
        </Box>
      </Box>

      {/* Field Config Drawer */}
      <FieldConfigDrawer
        open={drawerOpen}
        field={selectedField}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedField(null);
        }}
        onSave={(updatedField) => {
          handleApplyFieldChanges(updatedField);
          setDrawerOpen(false);
          setSelectedField(null);
        }}
      />
    </Box>
  );
};

export default CreatePage;
