import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { ColorNames, bgColors } from "../utils/colors";

export const Pill = ({
  color,
  name,
  id,
}: {
  color: ColorNames;
  name: string;
  id: number;
}) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push(`/${id}`);
      }}
      className="mb-3"
    >
      <View
        className={`${bgColors[color]} w-full  p-3 rounded-3xl flex flex-row items-center justify-between shadow-md`}
      >
        <Text className="text-xl font-medium flex-1 text-white">{name}</Text>
        <FontAwesome5
          color="white"
          style={{ marginRight: 6 }}
          size={20}
          name="chevron-right"
        />
      </View>
    </Pressable>
  );
};
