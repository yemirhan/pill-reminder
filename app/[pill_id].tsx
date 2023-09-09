import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useGetPill } from "../queries/useGetPill";
import { Screen } from "expo-router/build/views/Screen";
import { colors } from "../utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import twColors from "tailwindcss/colors";
const PillDetails = () => {
  const { pill_id } = useLocalSearchParams();
  const pill = useGetPill({
    pill_id: Number(pill_id),
  });
  return (
    <View className="bg-white flex flex-1 p-4">
      <Stack.Screen
        options={{
          title: pill.data?.name || "İlaç",
          headerStyle: {
            backgroundColor: colors?.[pill.data?.colors || "emerald"],
          },
          headerTintColor: "white",
          headerTitleAlign: "left",
        }}
      />

      <LinearGradient
        // Button Linear Gradient
        colors={[twColors.purple[700], twColors.pink[700]]}
        tw="rounded-3xl"
        start={[0, 0]}
        end={[1, 0]}
        style={styles.button}
      >
        <Text className="text-white text-xl font-semibold">
          {pill.data?.notification_type}
        </Text>
      </LinearGradient>
      <Text>{pill_id}</Text>
      <Text>{JSON.stringify(pill.data, null, 2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 15,
    alignItems: "center",
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});

export default PillDetails;
