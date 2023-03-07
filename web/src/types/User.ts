export type User = {
  id: number;
  username: String;
  role: "user" | "admin";
  dailyThresholdLimitOfCalories: number;
  monthlyThresholdLimitOfMoney: number;
};
