import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { appTheme } from "../../theme";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";
import LayersIcon from "@mui/icons-material/Layers";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";

interface HeaderProps {
  onSave?: () => void;
  previewId?: string;
}

const Header: React.FC<HeaderProps> = ({ onSave, previewId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCreatePage = location.pathname.startsWith("/create");
  const isPreviewPage = location.pathname.startsWith("/preview");
  const isMyFormsPage = location.pathname.startsWith("/myforms");

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: appTheme.colors.white,
        borderBottom: `1px solid ${appTheme.colors.border}`,
        padding: "0 24px",
        height: "64px",
      }}
    >
      {/* Left Section - Clickable Logo */}
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={() => navigate("/create")}
      >
        <LayersIcon
          style={{
            color: appTheme.colors.primary,
            fontSize: "24px",
            marginRight: "8px",
          }}
        />
        <h1
          style={{
            fontSize: "20px",
            fontWeight: appTheme.font.weightMedium,
            margin: 0,
          }}
        >
          Form Builder
        </h1>
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Create Page → Show My Forms, Preview, Save */}
        {isCreatePage && (
          <>
            <Button
              variant="outlined"
              startIcon={<FolderIcon />}
              onClick={() => navigate("/myforms")}
              sx={{
                color: appTheme.colors.primary,
                borderColor: appTheme.colors.primary,
                "&:hover": { backgroundColor: "#f3e8ff" },
                textTransform: "none",
                fontWeight: appTheme.font.weightMedium,
              }}
            >
              My Forms
            </Button>

            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              onClick={() => navigate(`/preview/${previewId || "1"}`)}
              sx={{
                color: appTheme.colors.primary,
                backgroundColor: appTheme.colors.secondary,
                borderColor: appTheme.colors.secondary,
                "&:hover": { backgroundColor: "#f3e8ff" },
                textTransform: "none",
                fontWeight: appTheme.font.weightMedium,
              }}
            >
              Preview
            </Button>

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={onSave}
              sx={{
                backgroundColor: appTheme.colors.primary,
                "&:hover": { backgroundColor: appTheme.colors.primaryLight },
                textTransform: "none",
                fontWeight: appTheme.font.weightMedium,
              }}
            >
              Save Form
            </Button>
          </>
        )}

        {/* My Forms Page → Show Create Form */}
        {isMyFormsPage && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/create")}
            sx={{
              backgroundColor: appTheme.colors.primary,
              "&:hover": { backgroundColor: appTheme.colors.primaryLight },
              textTransform: "none",
              fontWeight: appTheme.font.weightMedium,
            }}
          >
            Create Form
          </Button>
        )}

        {/* Preview Page → Show My Forms + Create Form */}
        {isPreviewPage && (
          <>
            <Button
              variant="outlined"
              startIcon={<FolderIcon />}
              onClick={() => navigate("/myforms")}
              sx={{
                color: appTheme.colors.primary,
                borderColor: appTheme.colors.primary,
                "&:hover": { backgroundColor: "#f3e8ff" },
                textTransform: "none",
                fontWeight: appTheme.font.weightMedium,
              }}
            >
              My Forms
            </Button>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/create")}
              sx={{
                backgroundColor: appTheme.colors.primary,
                "&:hover": { backgroundColor: appTheme.colors.primaryLight },
                textTransform: "none",
                fontWeight: appTheme.font.weightMedium,
              }}
            >
              Create Form
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
