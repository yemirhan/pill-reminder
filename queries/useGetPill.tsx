import React from "react";
import { useQuery } from "react-query";
import { db } from "../utils/db";
import { Pill, Notification } from "../utils/db.types";
const getPillDetailsAndNotificationsById = (
  pillId: number
): Promise<(Pill & Notification) | undefined> => {
  return new Promise<(Pill & Notification) | undefined>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT P.*, N.* FROM Pills AS P
         LEFT JOIN Notifications AS N ON P.pill_id = N.pill_id
         WHERE P.pill_id = ?;`,
        [pillId],
        (_, { rows }) => {
          const pillData =
            rows.length > 0 ? (rows.item(0) as Pill & Notification) : undefined;
          resolve(pillData);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};
export const useGetPill = ({ pill_id }: { pill_id: number }) => {
  return useQuery({
    queryKey: ["pill", pill_id],
    queryFn: async () => {
      const pillDetailsAndNotifications =
        await getPillDetailsAndNotificationsById(pill_id);
      return pillDetailsAndNotifications;
    },
  });
};
