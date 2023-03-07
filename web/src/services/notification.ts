import { api } from "./api";

export async function readNotification(notificationId: number) {
  try {
    await api.post(`/notifications/${notificationId}/read`);
  } catch (e) {
    console.error(e);
  }
}
