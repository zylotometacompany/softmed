import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  MailOutline,
} from "@mui/icons-material";
import { FuturisticBackground } from "../../../components/Background";
import type { Theme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../../schemas/auth.schema";
import { RequestAuth } from "../../../actions/auth";
import { toast } from "react-toastify";

export default function LoginPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const toastId = toast.loading("Entrando...");

    try {
      const response = await RequestAuth(data);

      toast.dismiss(toastId);

      if (response.success) {
        localStorage.setItem("softmed_token", response.token ?? "");

        toast.success("Login realizado com sucesso");

        navigate("/home");
      } else {
        toast.error("Erro ao autenticar no sistema, verifique as credenciais");
      }
    } catch (error) {
      toast.dismiss(toastId);

      toast.error("Erro inesperado ao tentar login");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        bgcolor: "background.default",
        color: "text.primary",
        overflow: "hidden",
      }}
    >
      <FuturisticBackground />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1180,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
          gap: 4,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Stack spacing={2}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: 3,
                fontWeight: 800,
              }}
            >
              BEM-VINDO AO SOFTMED
            </Typography>

            <Typography
              variant="h2"
              sx={{
                color: "text.primary",
                fontWeight: 800,
                lineHeight: 1.05,
                maxWidth: 560,
                fontSize: { md: "3.4rem", lg: "4rem" },
              }}
            >
              Acesse a plataforma
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 520,
                fontSize: "1rem",
                lineHeight: 1.8,
              }}
            >
              Interface de acesso aos prontuários
            </Typography>

            <Stack direction="row" spacing={2} sx={{ pt: 2, flexWrap: "wrap" }}>
              <FeaturePill label="Registre prontuários" />
              <FeaturePill label="Converse com pacientes" />
              <FeaturePill label="E mais..." />
            </Stack>
          </Stack>
        </Box>

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 4,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: alpha(
              theme.palette.background.paper,
              isDark ? 0.72 : 0.92,
            ),
            backdropFilter: "blur(18px)",
            boxShadow: `
              0 20px 60px ${alpha(theme.palette.common.black, isDark ? 0.38 : 0.12)},
              inset 0 1px 0 ${alpha(theme.palette.primary.main, isDark ? 0.1 : 0.08)}
            `,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: "0 0 auto 0",
              height: 4,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          />

          <Box sx={{ p: { xs: 3, sm: 4.5 } }}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography
                  variant="h4"
                  sx={{ color: "text.primary", fontWeight: 800 }}
                >
                  Entrar
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Informe seus dados para continuar.
                </Typography>
              </Stack>

              <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={2.2}>
                    <TextField
                      {...register("email")}
                      fullWidth
                      name="email"
                      label="E-mail"
                      type="email"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutline fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={inputStyles(theme)}
                    />

                    <TextField
                      {...register("password")}
                      fullWidth
                      name="password"
                      label="Senha"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined fontSize="small" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                              sx={{ color: "text.secondary" }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={inputStyles(theme)}
                    />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      flexWrap="wrap"
                      gap={1}
                    >
                      <FormControlLabel
                        control={<Checkbox size="small" />}
                        label="Lembrar de mim"
                        sx={{ color: "text.secondary" }}
                      />

                      <Link href="#" underline="hover">
                        Esqueci minha senha
                      </Link>
                    </Stack>

                    <Button
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      sx={{
                        mt: 1,
                        height: 52,
                        borderRadius: 2.5,
                        fontWeight: 800,
                        letterSpacing: 0.6,
                      }}
                    >
                      Acessar
                    </Button>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      sx={{ pt: 1 }}
                    >
                      Não tem conta?{" "}
                      <Link href="#" underline="hover" sx={{ fontWeight: 700 }}>
                        Criar acesso
                      </Link>
                    </Typography>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

function FeaturePill({ label }: { label: string }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderRadius: 999,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
        bgcolor: alpha(theme.palette.primary.main, 0.08),
        color: "text.primary",
        fontSize: 13,
        fontWeight: 700,
        width: "fit-content",
      }}
    >
      {label}
    </Box>
  );
}

function inputStyles(theme: Theme) {
  const isDark = theme.palette.mode === "dark";

  return {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2.5,
      color: theme.palette.text.primary,
      backgroundColor: alpha(
        isDark
          ? theme.palette.background.paper
          : theme.palette.background.default,
        isDark ? 0.72 : 0.95,
      ),
      transition: "all 0.25s ease",

      "& .MuiSvgIcon-root": {
        color: theme.palette.text.secondary,
      },

      "& fieldset": {
        borderColor: theme.palette.divider,
      },

      "&:hover fieldset": {
        borderColor: alpha(theme.palette.primary.main, 0.55),
      },

      "&.Mui-focused": {
        boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.14)}`,
      },

      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },

    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.primary.main,
    },

    "& .MuiInputBase-input::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 0.8,
    },
  };
}
