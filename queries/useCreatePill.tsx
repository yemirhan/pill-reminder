import React from "react";
import {
  UseMutateFunction,
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { db } from "../utils/db";
import { NotificationType } from "../utils/db.types";
const action = (
  name: string,
  colors: string,
  notificationType: NotificationType,
  notificationTime: string | null,
  daysOfWeek: string | null
): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Pills (name, colors) VALUES (?, ?);",
        [name, colors],
        (_, { insertId }) => {
          const pillId = Number(insertId); // Get the ID of the newly inserted pill
          // Insert notification settings if provided
          if (notificationType && (notificationTime || daysOfWeek)) {
            tx.executeSql(
              "INSERT INTO Notifications (user_id, pill_id, notification_type, notification_time, days_of_week) VALUES (?, ?, ?, ?, ?);",
              [1, pillId, notificationType, notificationTime, daysOfWeek],
              (_, __) => {
                resolve(pillId);
              },
              (_, error) => {
                reject(error);
                return false;
              }
            );
          } else {
            resolve(pillId);
          }
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

type CreatePillMutation = UseMutationOptions<
  void,
  unknown,
  {
    pillName: string;
    color: string;
    notificationType: NotificationType;
    notificationTime: string | null;
    daysOfWeek: string | null;
  },
  unknown
>;
export const useCreatePill = (options?: CreatePillMutation) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["pills", "create"],
    mutationFn: async ({
      pillName,
      color,
      notificationType,
      daysOfWeek,
      notificationTime,
    }) => {
      await action(
        pillName,
        color,
        notificationType,
        notificationTime,
        daysOfWeek
      );

      queryClient.refetchQueries(["pills"]);
    },
    onSuccess: () => {},
    ...options,
  });
};
