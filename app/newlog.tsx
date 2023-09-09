import React from "react";
import { Pressable, Text, View } from "react-native";
import { useGetLogs } from "../queries/useGetLogs";
import { useGetPills } from "../queries/useGetPills";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { bgColors } from "../utils/colors";

const NewLog = () => {
  const logs = useGetLogs({ date: new Date() });
  const pills = useGetPills();
  const router = useRouter();
  return (
    <View className="flex flex-1 flex-col bg-white p-3 space-y-3">
      {pills.data?.map((pill) => {
        return (
          <View
            key={pill.pill_id}
            className="flex flex-col  rounded-xl border border-gray-200"
          >
            <View
              className={`${bgColors[pill.colors]} w-full rounded-t-xl p-2 `}
            >
              <Text className="font-semibold text-lg text-white">
                {pill.name}
              </Text>
            </View>
            <View className="flex flex-col justify-between  p-2">
              {(logs.data || []).filter((log) => log.pill_id === pill.pill_id)
                .length === 0 ? (
                <Text className="text-base mb-2">
                  Bugün hiç kayıt oluşturulmadı.
                </Text>
              ) : (
                <Text>
                  {
                    (logs.data || []).filter(
                      (log) => log.pill_id === pill.pill_id
                    ).length
                  }{" "}
                  kayıt oluşturuldu.
                </Text>
              )}
              <View className="flex flex-row w-full">
                <Pressable
                  onPress={() => router.push("/newlog")}
                  className="flex flex-row items-center justify-center bg-sky-600 rounded-full p-2"
                >
                  <FontAwesome5 name="plus" size={20} color="white" />
                  <Text>Yeni Kayıt Oluştur</Text>
                </Pressable>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default NewLog;
