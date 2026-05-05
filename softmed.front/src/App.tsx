import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, IconButton, Tooltip } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { getAppTheme } from "./utils/theme";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme-mode");
    return saved === "light" ? "light" : "dark";
  });

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme-mode", next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Tooltip
        title={mode === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            width: 46,
            height: 46,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor:
              mode === "dark"
                ? "rgba(255,255,255,0.04)"
                : "rgba(17,24,39,0.04)",
            backdropFilter: "blur(10px)",
            boxShadow:
              mode === "dark"
                ? "0 8px 24px rgba(0,0,0,0.35)"
                : "0 8px 24px rgba(0,0,0,0.10)",
            "&:hover": {
              backgroundColor:
                mode === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(17,24,39,0.08)",
            },
          }}
        >
          {mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>
      <ToastContainer position="top-right" autoClose={3000} theme={mode} />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
