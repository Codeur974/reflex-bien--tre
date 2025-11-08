import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
  isHydrated: boolean;
}

// Fonction pour charger l'état depuis localStorage
const loadAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      isAuthenticated: false,
      token: null,
      role: null,
      isHydrated: false,
    };
  }

  try {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("authRole");

    if (token && role) {
      return {
        isAuthenticated: true,
        token,
        role,
        isHydrated: true,
      };
    }
  } catch (error) {
    console.error("Erreur lors du chargement de l'authentification:", error);
  }

  return {
    isAuthenticated: false,
    token: null,
    role: null,
    isHydrated: true,
  };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; role: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isHydrated = true;

      // Sauvegarder dans localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("authRole", action.payload.role);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      state.isHydrated = true;

      // Nettoyer le localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authRole");
      }
    },
    hydrate: (state) => {
      state.isHydrated = true;
    },
  },
});

export const { login, logout, hydrate } = authSlice.actions;
export default authSlice.reducer;
