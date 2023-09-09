import React from "react";
import { Pressable, Text, View } from "react-native";
import { useGetLogs } from "../queries/useGetLogs";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const Logs = ({ date }: { date: Date }) => {
  const logs = useGetLogs({ date });
  const router = useRouter();
  return (
    <View className="w-full h-auto px-2 border-y border-slate-200 py-3">
      <Text className="text-black font-semibold text-3xl ">Kayıtlar</Text>
      {logs.data?.length === 0 ? (
        <View className="flex flex-col">
            <Text className="text-base mb-2 text-gray-500">
                Bugün hiç kayıt oluşturulmadı.
            </Text>
          <Pressable onPress={() => router.push("/newlog")} className="w-full h-auto flex flex-row items-center justify-between p-3 rounded-3xl bg-sky-600 ">
            <Text className="text-white font-medium text-xl">
                Yeni Kayıt Oluştur
            </Text>
            <FontAwesome5 name="plus" size={20} style={{marginRight: 6}} color="white" />
          </Pressable>
        </View>
      ) : (
        logs.data?.map((log) => {
          return (
            <View
              key={log.log_id}
              className="flex flex-row items-center justify-between w-full"
            >
              <Text className="text-black font-semibold text-lg">
                {log.pill_id}
              </Text>
              <Text className="text-black font-semibold text-lg">
                {new Date(log.log_date).toLocaleDateString("tr-TR")}
              </Text>
            </View>
          );
        })
      )}
    </View>
  );
};
