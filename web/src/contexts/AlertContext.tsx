import { createContext, useState } from "react";
import { destroyCookie } from "nookies";
import Router from "next/router";
import Alert from "../components/Alert";

type User = {
  username: string;
  role: "user" | "admin";
  dailyThresholdLimitOfCalories: number;
  monthlyThresholdLimitOfMoney: number;
};

type AlertData = {
  message: string;
};

type AlertContextType = {
  alert: (alertData: AlertData) => void;
};

export const AlertContext = createContext({} as AlertContextType);

export function AlertProvider({ children }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  async function alert({ message }: AlertData) {
    setMessage(message);
    setOpen(true);
    setTimeout(() => setOpen(false), 3000);
  }

  return (
    <AlertContext.Provider value={{ alert }}>
      <Alert open={open} setOpen={setOpen} message={message} />
      {children}
    </AlertContext.Provider>
  );
}
