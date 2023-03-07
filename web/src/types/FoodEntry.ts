export type FoodEntry = {
  id: number;
  name: string;
  calories: number;
  price?: number;
  dateTime: Date;
};

export type AdminFoodEntry = {
  id: number;
  name: string;
  calories: number;
  price?: number;
  dateTime: Date;
  user: {
    username: string;
  };
};

export type CreateUserFoodEntryDto = {
  name: string;
  calories: string;
  price?: string;
  date: string;
  time: string;
};

export type CreateFoodEntryDto = {
  userId: number;
  name: string;
  calories: string;
  price?: string;
  date: string;
  time: string;
};

export type EditFoodEntryDto = {
  name: string;
  calories: string;
  price?: string;
  date: string;
  time: string;
};
