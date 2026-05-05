import type { LoginFormData } from "../schemas/auth.schema";

export async function RequestAuth(data: LoginFormData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Autenticando:", data);

    return {
      success: true,
      token: "fake-token",
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro ao autenticar",
    };
  }
}