// src/pages/PreviewPage.tsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextareaAutosize,
} from "@mui/material";
import { ArrowBack, Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { appTheme } from "../theme";

const PreviewPage: React.FC = () => {
  const navigate = useNavigate();

  // Controlled form state to avoid uncontrolled -> controlled warnings
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd
  const [department, setDepartment] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [bio, setBio] = useState("");

  // Derived age from dob
  const age = useMemo(() => {
    if (!dob) return "--";
    try {
      const dobDate = new Date(dob);
      const today = new Date();
      let years = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        years--;
      }
      return years >= 0 ? String(years) : "--";
    } catch {
      return "--";
    }
  }, [dob]);

  return (
    <Box sx={{ p: 6, backgroundColor: appTheme.colors.background, minHeight: "100vh" }}>
      {/* Page Heading */}
      <Typography
        variant="h6"
        sx={{
          mb: 4,
          fontWeight: appTheme.font.weightBold,
          color: appTheme.colors.textPrimary,
          textAlign: "center",
        }}
      >
        Preview Form
      </Typography>

      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <Box
          component="form"
          sx={{
            backgroundColor: appTheme.colors.white,
            borderRadius: appTheme.radius.lg,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            p: 4,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            // replace with real submit handling
            console.log({ fullName, email, dob, department, employmentType, bio });
            alert("Form submitted (preview) — check console.");
          }}
        >
          {/* Full Name */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: appTheme.font.weightMedium }}>
              Full Name <span style={{ color: appTheme.colors.danger }}>*</span>
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Box>

          {/* Email */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: appTheme.font.weightMedium }}>
              Email Address <span style={{ color: appTheme.colors.danger }}>*</span>
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          {/* Date of Birth */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: appTheme.font.weightMedium }}>
              Date of Birth <span style={{ color: appTheme.colors.danger }}>*</span>
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Age (Derived) */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: appTheme.font.weightMedium }}>
              Age (Auto-calculated)
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={age}
              InputProps={{
                readOnly: true,
                sx: {
                  backgroundColor: appTheme.colors.secondary,
                  color: appTheme.colors.textSecondary,
                },
              }}
            />
            <Typography variant="caption" sx={{ color: appTheme.colors.textSecondary }}>
              This field is automatically calculated from your date of birth
            </Typography>
          </Box>

          {/* Department */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="dept-label">Department</InputLabel>
              <Select
                labelId="dept-label"
                label="Department"
                value={department}
                onChange={(e) => setDepartment(String(e.target.value))}
              >
                <MenuItem value="">Select Department</MenuItem>
                <MenuItem value="engineering">Engineering</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="hr">Human Resources</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Employment Type */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: appTheme.font.weightMedium }}>
              Employment Type <span style={{ color: appTheme.colors.danger }}>*</span>
            </Typography>
            <RadioGroup value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
              <FormControlLabel value="fulltime" control={<Radio />} label="Full Time" />
              <FormControlLabel value="parttime" control={<Radio />} label="Part Time" />
              <FormControlLabel value="contract" control={<Radio />} label="Contract" />
            </RadioGroup>
          </Box>

          {/* Bio */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontWeight: appTheme.font.weightMedium }}>Brief Bio</Typography>
            <TextareaAutosize
              minRows={4}
              placeholder="Tell us a bit about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: appTheme.radius.sm,
                border: `1px solid ${appTheme.colors.border}`,
                fontFamily: "inherit",
              }}
            />
            <Typography variant="caption" sx={{ color: appTheme.colors.textSecondary }}>
              Maximum 500 characters
            </Typography>
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: `1px solid ${appTheme.colors.border}`,
              pt: 3,
            }}
          >
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/myforms")}
              sx={{
                backgroundColor: appTheme.colors.secondary,
                color: appTheme.colors.textSecondary,
                "&:hover": { backgroundColor: "#ede9fe" },
                textTransform: "none",
              }}
            >
              Back to My Forms
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={<Send />}
              sx={{
                backgroundColor: appTheme.colors.primary,
                "&:hover": { backgroundColor: appTheme.colors.primaryLight },
                textTransform: "none",
              }}
            >
              Submit Form
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewPage;
