import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";
import { weatherImages } from "../constants";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingContext";
import { Weather } from "../types/weatherTypes";

interface Forecast7DaysProps {
  weather: Weather;
}

function Forecast7Days({ weather }: Forecast7DaysProps) {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("SettingsContext must be used within a SettingsProvider");
  }

  const { temperatureUnit } = context;

  return (
    <View className="space-y-3">
      <View className="flex-row items-center mx-5 space-x-2">
        <Ionicons name="calendar-outline" size={20} color="white" />
        <Text className="text-white text-base">Week forecast</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        {weather?.forecast?.forecastday?.map((item, index) => {
          let date = new Date(item.date);
          let options: Intl.DateTimeFormatOptions = { weekday: "long" };
          let dayName = date.toLocaleDateString("en-US", options);
          return (
            <View
              key={index}
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: "rgba(255,255,255, 0.15)" }}
            >
              <View className="flex-row">
                <Text className="text-white text-base font-semibold">
                  {temperatureUnit === "C°"
                    ? `${Math.trunc(item?.day?.maxtemp_c ?? 0)}°  `
                    : `${Math.trunc(item?.day?.maxtemp_f ?? 0)}°  `}
                </Text>
                <Text className="text-white opacity-50 text-base font-semibold ">
                  {temperatureUnit === "C°"
                    ? `${Math.trunc(item?.day?.mintemp_c ?? 0)}°`
                    : `${Math.trunc(item?.day?.mintemp_f ?? 0)}°`}
                </Text>
              </View>

              <Image
                source={
                  weatherImages[
                    item?.day?.condition?.text
                      .toLowerCase()
                      .trim() as keyof typeof weatherImages
                  ]
                }
                className="h-11 w-11"
              />
              <Text className="text-white">{dayName}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Forecast7Days;
