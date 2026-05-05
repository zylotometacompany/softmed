import { alpha, createTheme } from "@mui/material/styles";

export function getAppTheme(mode: "light" | "dark") {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#00D4FF" : "#0A84FF",
        light: isDark ? "#5EE6FF" : "#5AA9FF",
        dark: isDark ? "#0099CC" : "#0066CC",
      },
      secondary: {
        main: isDark ? "#00FFA3" : "#14B8A6",
        light: isDark ? "#66FFC2" : "#5EEAD4",
        dark: isDark ? "#00CC82" : "#0F766E",
      },
      background: {
        default: isDark ? "#05070A" : "#F5F7FB",
        paper: isDark ? "#0D1117" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#FFFFFF" : "#111827",
        secondary: isDark ? "#9CA3AF" : "#6B7280",
      },
      divider: alpha(isDark ? "#FFFFFF" : "#111827", isDark ? 0.08 : 0.12),
    },

    shape: {
      borderRadius: 14,
    },

    typography: {
      fontFamily: `'Inter', 'Poppins', sans-serif`,
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: {
        fontWeight: 700,
        textTransform: "none",
        letterSpacing: 0.4,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: isDark ? "#05070A" : "#F5F7FB",
          },
          "*": {
            boxSizing: "border-box",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: `1px solid ${alpha(
              isDark ? "#FFFFFF" : "#111827",
              isDark ? 0.06 : 0.08,
            )}`,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            height: 48,
          },
          contained: {
            background: isDark
              ? "linear-gradient(135deg, #00D4FF, #00FFA3)"
              : "linear-gradient(135deg, #0A84FF, #14B8A6)",
            boxShadow: `0 10px 30px ${alpha(
              isDark ? "#00D4FF" : "#0A84FF",
              0.28,
            )}`,
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 10,
              backgroundColor: alpha(
                isDark ? "#FFFFFF" : "#111827",
                isDark ? 0.02 : 0.02,
              ),
              "& fieldset": {
                borderColor: alpha(
                  isDark ? "#FFFFFF" : "#111827",
                  isDark ? 0.08 : 0.12,
                ),
              },
              "&:hover fieldset": {
                borderColor: alpha(isDark ? "#00D4FF" : "#0A84FF", 0.4),
              },
              "&.Mui-focused": {
                boxShadow: `0 0 0 3px ${alpha(
                  isDark ? "#00D4FF" : "#0A84FF",
                  0.15,
                )}`,
              },
              "&.Mui-focused fieldset": {
                borderColor: isDark ? "#00D4FF" : "#0A84FF",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: isDark ? "#00D4FF" : "#0A84FF",
            },
          },
        },
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: alpha(isDark ? "#FFFFFF" : "#111827", 0.4),
            "&.Mui-checked": {
              color: isDark ? "#00D4FF" : "#0A84FF",
            },
          },
        },
      },

      MuiLink: {
        styleOverrides: {
          root: {
            color: isDark ? "#00D4FF" : "#0A84FF",
            fontWeight: 600,
          },
        },
      },
    },
  });
}
