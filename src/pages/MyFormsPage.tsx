import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Visibility, Delete, FolderOpen, Add, AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { appTheme } from "../theme";

type FormData = {
  id: string;
  title: string;
  createdAt: string;
  fieldsCount: number;
  fieldsColor: "green" | "blue" | "purple";
  timeAgo: string;
};

const chipStyleMap = {
  green: {
    bg: "#d1fae5", // green.100
    color: "#065f46", // green.700
  },
  blue: {
    bg: "#dbeafe", // blue.100
    color: "#1e40af", // blue.700
  },
  purple: {
    bg: "#ede9fe", // purple.100
    color: appTheme.colors.primary, // #3b1f8e
  },
};

const MyFormsPage: React.FC = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedForms = localStorage.getItem("myForms");
    if (savedForms) {
      setForms(JSON.parse(savedForms));
    }
  }, []);

  const handleDeleteClick = (id: string) => {
    setFormToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (formToDelete) {
      const updatedForms = forms.filter((form) => form.id !== formToDelete);
      setForms(updatedForms);
      localStorage.setItem("myForms", JSON.stringify(updatedForms));
      setSnackbarOpen(true);
    }
    setOpenDeleteDialog(false);
    setFormToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      maxWidth="lg"
      mx="auto"
      px={2}
      py={4}
      sx={{
        backgroundColor: appTheme.colors.background,
      }}
    >

      {forms.length > 0 ? (
        <Grid
          container
          spacing={3}
         
        >
          {forms.map((form) => {
            const chipColors = chipStyleMap[form.fieldsColor];
            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={form.id}
              >
                <Card
                  onClick={() => navigate(`/preview/${form.id}`)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: appTheme.colors.white,
                    borderRadius: "12px", // rounded-lg = 0.75rem = 12px
                    border: `1px solid ${appTheme.colors.border}`, // gray-200
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)", // subtle shadow like shadow-card
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: appTheme.colors.primary,
                      boxShadow: "0 8px 15px rgba(59,31,142,0.2)", // stronger shadow on hover
                    },
                  }}
                >
                  <CardContent sx={{ p: 6 / 2 }}> {/* p-6 = 24px, here MUI p prop uses multiples of 8, so 3 = 24px */}
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Box flex={1}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600, // font-semibold
                            fontSize: "1.125rem", // text-lg = 18px
                            color: "#374151", // text-gray-800
                            mb: 1,
                          }}
                        >
                          {form.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.875rem", // text-sm = 14px
                            color: "#6b7280", // text-gray-500
                          }}
                        >
                          Created on {form.createdAt}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Chip
                          label={`${form.fieldsCount} fields`}
                          size="small"
                          sx={{
                            fontSize: "0.75rem", // text-xs = 12px
                            fontWeight: 500,
                            bgcolor: chipColors.bg,
                            color: chipColors.color,
                            borderRadius: "9999px", // rounded-full pill shape
                            px: 1.5, // px-2 approx 8px
                            py: 0.5, // py-1 approx 4px
                            height: "auto",
                          }}
                        />
                      </Box>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<Visibility />}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/preview/${form.id}`);
                          }}
                          sx={{
                            fontSize: "0.875rem", // text-sm
                            fontWeight: 500,
                            textTransform: "none",
                            color: appTheme.colors.primary,
                            bgcolor: appTheme.colors.secondary,
                            borderRadius: appTheme.radius.md,
                            px: 3,
                            py: 1.5,
                            "&:hover": {
                              bgcolor: "#ede9fe", // purple.100
                            },
                            boxShadow: "none",
                            minWidth: "auto",
                          }}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<Delete />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(form.id);
                          }}
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            textTransform: "none",
                            color: "#dc2626", // red-600
                            bgcolor: "#fef2f2", // red-50
                            borderRadius: appTheme.radius.md,
                            px: 3,
                            py: 1.5,
                            "&:hover": {
                              bgcolor: "#fee2e2", // red-100
                            },
                            boxShadow: "none",
                            minWidth: "auto",
                          }}
                        >
                          Delete
                        </Button>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          fontSize: "0.75rem", // text-xs = 12px
                          color: "#9ca3af", // gray-400
                          marginLeft:"5px"
                        }}
                      >
                        <AccessTime sx={{ fontSize: 14 }} />
                        <Typography variant="caption">{form.timeAgo}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={10}
        >
          <Box
            sx={{
              width: 96,
              height: 96,
              bgcolor: appTheme.colors.secondary,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <FolderOpen sx={{ fontSize: 40, color: appTheme.colors.primary }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ color: appTheme.colors.textPrimary, mb: 1 }}
          >
            No forms saved yet
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: appTheme.colors.textSecondary,
              maxWidth: 400,
              mb: 3,
              fontSize: appTheme.font.sizeMd,
              textAlign: "center",
            }}
          >
            You haven't created any forms yet. Start building your first form to see
            it appear here.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate("/create")}
            sx={{
              bgcolor: appTheme.colors.primary,
              "&:hover": { bgcolor: appTheme.colors.primaryLight },
              textTransform: "none",
            }}
          >
            Create New Form
          </Button>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle
          sx={{ fontWeight: 600, color: appTheme.colors.textPrimary }}
        >
          Delete Form
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: appTheme.colors.textSecondary, fontSize: appTheme.font.sizeMd }}
          >
            Are you sure you want to delete this form? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            onClick={confirmDelete}
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={handleSnackbarClose}
          sx={{ width: "100%" }}
        >
          Form deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MyFormsPage;
