import { ColorNames } from "./colors";

export interface Pill {
  pill_id: number;
  name: string;
  colors: ColorNames;
}

export interface User {
  user_id: number;
  username: string;
  password: string; // You should use a more secure type here in a real app
}
export type NotificationType = "Everyday" | "Weekly" | "As Needed";
export interface Notification {
  notification_id: number;
  user_id: number;
  pill_id: number;
  notification_type: NotificationType;
  notification_time: string | null;
  days_of_week: string | null;
  created_at: string;
}

export interface PillLog {
  log_id: number;
  user_id: number;
  pill_id: number;
  log_date: string;
  taken: boolean;
}
