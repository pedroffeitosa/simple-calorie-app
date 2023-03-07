import { api } from "./api";

export async function getMyFoodEntries(startDate?: string, endDate?: string) {
  try {
    let query = `?`;
    query += startDate ? `&startDate=${startDate}` : "";
    query += endDate ? `&endDate=${endDate}` : "";
    console.log(query);
    const response = await api.get(`/food-entries/user${query}`);
    const { data } = response;
    return data;
  } catch (e) {
    console.error(e);
  }
}

type AddUserFoodEntryRequestData = {
  name: string;
  calories: number;
  price?: number;
  dateTime: string;
};

export async function addUserFoodEntry(
  addFoodEntryRequestData: AddUserFoodEntryRequestData
) {
  try {
    const response = await api.post(
      "/food-entries/user",
      addFoodEntryRequestData
    );
    const { data } = response;
    return data;
  } catch (e) {
    console.error(e);
  }
}

type AddFoodEntryRequestData = {
  userId: number;
  name: string;
  calories: number;
  price?: number;
  dateTime: string;
};

export async function addFoodEntry(
  addFoodEntryRequestData: AddFoodEntryRequestData
) {
  try {
    const response = await api.post("/food-entries", addFoodEntryRequestData);
    const { data } = response;
    return data;
  } catch (e) {
    console.error(e);
    return e?.response?.data;
  }
}

type EditFoodEntryRequestData = {
  id: number;
  name: string;
  calories: number;
  price?: number;
  dateTime: string;
};
export async function editFoodEntry(
  editFoodEntryRequestData: EditFoodEntryRequestData
) {
  try {
    const response = await api.put(
      `/food-entries/${editFoodEntryRequestData.id}`,
      editFoodEntryRequestData
    );
    const { data } = response;
    return data;
  } catch (e) {
    console.error(e);
    return e?.response?.data;
  }
}

type EditUserFoodEntryPriceRequestData = {
  id: number;
  price?: number;
};
export async function editUserFoodEntryPrice(
  editUserFoodEntryPriceRequestData: EditUserFoodEntryPriceRequestData
) {
  try {
    const response = await api.put(
      `/food-entries/user/${editUserFoodEntryPriceRequestData.id}`,
      editUserFoodEntryPriceRequestData
    );
    const { data } = response;
    return data;
  } catch (e) {
    console.error(e);
    return e?.response?.data;
  }
}

export async function deleteFoodEntry(foodEntryId) {
  try {
    const response = await api.delete(`/food-entries/${foodEntryId}`);
    const { data } = response;
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function getAllFoodEntries(startDate?: string, endDate?: string) {
  try {
    let query = `?`;
    query += startDate ? `&startDate=${startDate}` : "";
    query += endDate ? `&endDate=${endDate}` : "";
    console.log(query);
    const response = await api.get(`/food-entries${query}`);
    const { data } = response;
    return data;
  } catch (e) {
    console.error(e);
  }
}
