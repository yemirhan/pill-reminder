import React from "react";
import { useQuery } from "react-query";
import { db } from "../utils/db";
import { Pill } from "../utils/db.types";
const getAllPills = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Pills;",
        [],
        (_, { rows }) => {
          // Convert the result rows to an array of pill objects
          const pills = rows._array;
          resolve(pills);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};
export const useGetPills = () => {
  return useQuery({
    queryKey: ["pills"],
    queryFn: async () => {
      const pills = await getAllPills();
      return pills as Pill[];
    },
  });
};
