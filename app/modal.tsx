import { StatusBar } from "expo-status-bar";
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useState } from "react";
import { useCreatePill } from "../queries/useCreatePill";
import { useRouter } from "expo-router";
import { ColorNames, bgColors, colors, nameToTWBgColor } from "../utils/colors";
import { NotificationType } from "../utils/db.types";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { StyledComponent, styled } from "nativewind";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const DTP = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) => {
  if (Platform.OS === "ios") {
    return (
      <RNDateTimePicker
        value={date}
        mode="time"
        locale="tr-TR"
        onChange={(_, selectedDate) => {
          setDate(selectedDate || date);
        }}
        minuteInterval={15}
      />
    );
  } else {
    return (
      <Pressable
        onPress={() => {
          DateTimePickerAndroid.open({
            value: new Date(),
            mode: "time",
            is24Hour: true,
            onChange: (_, selectedDate) => {
              setDate(selectedDate || date);
              DateTimePickerAndroid.dismiss("time");
            },
          });
        }}
        className="flex flex-row items-center px-2 justify-center bg-gray-200 rounded-full py-1"
      >
        <Text className="text-black font-normal text-base">
          {date.toLocaleTimeString("tr-TR", {hour: '2-digit', minute:'2-digit'})}
        </Text>
      </Pressable>
    );
  }
};
export default function ModalScreen() {
  const [pillName, setPillName] = useState("");
  const router = useRouter();
  const [selectedColor, setColor] = useState<ColorNames>("emerald");
  const [date, setDate] = useState(new Date());
  const [notificationType, setNotificationType] =
    useState<NotificationType>("Everyday");
  const mutation = useCreatePill({
    onSuccess: () => {
      setPillName("");
      setColor("emerald");
      router.push("/(tabs)/");
    },
  });
  return (
    <View className="flex flex-col items-center flex-1 px-4 space-y-6 pt-4">
      <TextInput
        placeholder="İlaç Adı"
        value={pillName}
        onChangeText={setPillName}
        placeholderTextColor={"#9CA3AF"}
        className="rounded-3xl p-4 border bg-white shadow-md border-gray-300 w-full"
      />
      <View className="flex flex-row space-x-2">
        {Object.entries(bgColors).map(([colorName, value]) => (
          <Pressable
            key={colorName}
            onPress={() => {
              setColor(colorName as ColorNames);
            }}
          >
            <View
              className={`${value} ${
                selectedColor === colorName ? "border-sky-400" : "border-white"
              } rounded-full w-12 h-12 border-4`}
            ></View>
          </Pressable>
        ))}
      </View>
      <View className="w-full flex flex-col space-y-3 ">
        <RadioButton
          selected={notificationType === "Everyday"}
          onPress={() => {
            setNotificationType("Everyday");
          }}
          type="Everyday"
          title="Her gün"
        >
          <DTP date={date} setDate={setDate} />
        </RadioButton>
        <RadioButton
          selected={notificationType === "As Needed"}
          onPress={() => {
            setNotificationType("As Needed");
          }}
          type="As Needed"
          title="İhtiyaç duyulduğunda"
        ></RadioButton>
      </View>
      <Pressable
        className={`${
          mutation.isLoading || pillName === "" ? "bg-gray-300" : "bg-sky-600"
        } rounded-3xl w-full flex items-center shadow-md p-3`}
        disabled={mutation.isLoading || pillName === ""}
        onPress={() => {
          mutation.mutate({
            pillName,
            color: selectedColor,
            notificationType,
            daysOfWeek: null,
            notificationTime: date.toISOString(),
          });
        }}
      >
        <Text className="text-white font-medium text-xl ">Kaydet</Text>
      </Pressable>
    </View>
  );
}

const RadioButton = ({
  selected,
  onPress,
  type,
  children,
  title,
}: {
  selected: boolean;
  onPress: () => void;
  type: NotificationType;
  children?: React.ReactNode;
  title: string;
}) => {
  return (
    <StyledComponent component={Pressable} onPress={onPress}>
      <View
        className={`flex justify-between w-full items-center flex-row p-3 rounded-3xl border-2  ${
          selected ? "border-sky-600" : "border-gray-200"
        } `}
      >
        <View className="flex flex-row items-center space-x-2">
          <View className="flex flex-row items-center justify-center border-2 border-sky-600 rounded-full p-1">
            <View
              className={`w-4 h-4 rounded-full ${
                selected ? "bg-sky-600" : "bg-gray-200"
              }`}
            ></View>
          </View>
          <Text className="font-medium text-xl text-black">{title}</Text>
        </View>

        {children}
      </View>
    </StyledComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
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
