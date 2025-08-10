import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FaWandMagicSparkles, FaCalculator, FaCodeBranch } from "react-icons/fa6";

import { appTheme } from "../../../theme";
import PredefinedMode from "./PredefinedTab";
import CustomMode from "./CustomTab";
import ConditionalMode from "./ConditionalTab";

const AdvancedTab: React.FC = () => {
  const [mode, setMode] = useState<"predefined" | "custom" | "conditional">("custom");

  const modes = [
    { key: "predefined", label: "Predefined", icon: <FaWandMagicSparkles /> },
    { key: "custom", label: "Custom", icon: <FaCalculator /> },
    { key: "conditional", label: "Conditional", icon: <FaCodeBranch /> },
  ] as const;

  return (
    <Box sx={{ width: "100%" }}>
      {/* Title */}
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: appTheme.font.weightBold,
          color: appTheme.colors.textPrimary,
          mb: 1,
        }}
      >
        Derived Field Configuration
      </Typography>

      {/* Mode Selector */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          p: 1,
          bgcolor: appTheme.colors.secondary,
          borderRadius: appTheme.radius.lg,
        }}
      >
        {modes.map((m) => {
          const isSelected = mode === m.key;
          return (
            <Button
              key={m.key}
              onClick={() => setMode(m.key)}
              sx={{
                flexDirection: "column",
                alignItems: "center",
                py: 2,
                px: 1,
                fontSize: appTheme.font.sizeSm,
                fontWeight: appTheme.font.weightMedium,
                textTransform: "none",
                borderRadius: appTheme.radius.md,
                border: `1px solid ${
                  isSelected ? appTheme.colors.primary : appTheme.colors.border
                }`,
                bgcolor: isSelected ? appTheme.colors.white : "transparent",
                boxShadow: isSelected ? 1 : "none",
                color: isSelected
                  ? appTheme.colors.primary
                  : appTheme.colors.textSecondary,
                "&:hover": {
                  bgcolor: isSelected
                    ? appTheme.colors.primaryLight + "22"
                    : appTheme.colors.white,
                },
              }}
            >
              <Box sx={{ fontSize: "1.25rem", mb: 0.5 }}>{m.icon}</Box>
              <span>{m.label}</span>
            </Button>
          );
        })}
      </Box>

      {/* Mode Content */}
      <Box sx={{ mt: 2 }}>
        {mode === "predefined" && <PredefinedMode />}
        {mode === "custom" && <CustomMode />}
        {mode === "conditional" && <ConditionalMode />}
      </Box>
    </Box>
  );
};

export default AdvancedTab;
