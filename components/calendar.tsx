import React, { useEffect, useState } from "react";
import { isToday, format } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import { getWeekDays } from "../utils/getWeekDays";

const Calendar = ({date, setDate} : {
  date: Date;
  setDate: (date: Date) => void;
}) => {

  const [week, setWeek] = useState<ReturnType<typeof getWeekDays>>([]);

  useEffect(() => {
    const weekDays = getWeekDays(date);
    // Get today and save it in redux store to highlight it initially as the default selected day
    weekDays.forEach((weekday) => {
      if (isToday(weekday.date)) {
        setDate(weekday.date);
      }
    });
    setWeek(weekDays);
  }, []);

  return (
    <>
      <Text style={styles.yearTitle}>
        {Platform.OS === "ios"
          ? `${date
            ?.toLocaleString("en-US", { month: "long", timeZone: "UTC" })
            .toUpperCase()}, ${date?.getFullYear()}`
          : `${date && format(date, "MMMM, Y", { locale: enUS }).toUpperCase()
          }`}
      </Text>
      <View style={styles.weekContainer}>
        {week.map((weekday) => {
          
          return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                // Only change selected day if it's NOT selected yet
                setDate(weekday.date);
              }}
              key={weekday.formatted}
              style={[styles.weekDay]}
            >
              <Text  style={styles.weekDayIndex}>
                {weekday.day}
              </Text>
              <Text style={styles.weekDayFormatted}>
                {weekday.formatted.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  yearTitle: {
    fontSize: 18,
    alignSelf: "flex-start",
    marginTop: 25,
    marginBottom: 10,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 25,
  },
  weekDay: {
    width: "12%",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 10,
  },
  weekDayIndex: {
    marginBottom: 5,
  },
  weekDayFormatted: {
    fontSize: 12,
  },
});



export default Calendar;
