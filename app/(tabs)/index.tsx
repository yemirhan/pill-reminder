import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useGetPills } from "../../queries/useGetPills";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pill } from "../../components/pill";
import { bgColors } from "../../utils/colors";
import Calendar from "../../components/calendar";
import { useState } from "react";
import { Logs } from "../../components/logs";

export default function TabOneScreen() {
  const pills = useGetPills();
  const [date, setDate] = useState(new Date())
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={pills.isLoading}
          onRefresh={() => pills.refetch()}
        />
      }
      style={styles.container}
    >
      <Calendar date={date} setDate={setDate} />
      <View
        className={
          "bg-emerald-500 h-0 bg-red-600 bg-sky-600 bg-orange-500 bg-purple-600 bg-pink-500"
        } 
      ></View>
      <Logs date={date} />
      <View className="flex flex-col space-y-3 px-2 w-full mt-2">
        <Text className="font-semibold text-3xl mb-2">
          İlaçlarım
        </Text>
        {(pills.data || []).map((pill) => {
          return (
            <Pill
              name={pill.name}
              id={pill.pill_id}
              color={pill.colors}
              key={pill.pill_id}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
