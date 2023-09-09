import React from "react";
import * as SQLite from "expo-sqlite";
import { PillLog } from "../utils/db.types";
import { useQuery } from "react-query";
import { db } from "../utils/db";



// Function to get pill logs for a specific day
const getPillLogsForDate = (
  userId: number,
  dateToRetrieve: Date
): Promise<Array<PillLog>> => {
  // Format the date as 'YYYY-MM-DD'
  const dateString = dateToRetrieve.toISOString().split("T")[0];

  return new Promise<Array<PillLog>>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM PillLogs WHERE user_id = ? AND log_date = ?;",
        [userId, dateString],
        (_, { rows }) => {
          const pillLogs = rows._array as Array<PillLog>;
          resolve(pillLogs);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const useGetLogs = ({ date }: { date: Date }) => {
  return useQuery({
    queryKey: ["logs", date.toString()],
    queryFn: async () => {
      const pillLogs = await getPillLogsForDate(1, date);
      return pillLogs;
    },
  });
};
