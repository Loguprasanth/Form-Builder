  // src/theme.ts
  export const appTheme = {
    colors: {
      primary: "#3b1f8e",
      primaryLight: "#5c3fc4",
      secondary: "#f5f3ff",
      textPrimary: "#111827",
      textSecondary: "#6b7280",
      border: "#e5e7eb",
      background: "#fafafa",
      white: "#ffffff",
      danger: "#ef4444",
    },
    spacing: (factor: number) => `${factor * 8}px`,
    radius: {
      sm: "4px",
      md: "6px",
      lg: "8px",
    },
    font: {
      sizeSm: "12px",
      sizeMd: "14px",
      sizeLg: "16px",
      weightRegular: 400,
      weightMedium: 500,
      weightBold: 600,
    },
  };
