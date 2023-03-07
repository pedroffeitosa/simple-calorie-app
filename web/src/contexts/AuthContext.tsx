import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

import { signInRequest, recoverUserInformation } from "../services/auth";
import { api } from "../services/api";

type User = {
  username: string;
  role: "user" | "admin";
  dailyThresholdLimitOfCalories: number;
  monthlyThresholdLimitOfMoney: number;
};

type SignInData = {
  username: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "simple-calorie.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((data) => {
        setUser(data);
      });
    }
  }, []);

  async function signIn({ username, password }: SignInData) {
    const { token, user } = await signInRequest({
      username,
      password,
    });

    setCookie(undefined, "simple-calorie.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);
    if (user.role === "admin") {
      Router.push("/admin-dashboard");
    } else {
      Router.push("/dashboard");
    }
  }

  async function signOut() {
    destroyCookie(undefined, "simple-calorie.token");
    setUser(null);
    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
