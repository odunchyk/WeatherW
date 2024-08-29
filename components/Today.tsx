import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";
import { weatherImages } from "../constants";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingContext";
import { format, parse } from "date-fns";
import { Weather } from "../types/weatherTypes";

interface TodayProps {
  weather: Weather;
}

function Today({ weather }: TodayProps) {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("SettingsContext must be used within a SettingsProvider");
  }

  const { temperatureUnit, timeFormat } = context;

  const time_epoch_current = new Date().getTime() / 1000;

  const weatherToday =
    weather?.forecast?.forecastday[0]?.hour.filter(
      (hour) => hour.time_epoch >= time_epoch_current
    ) ?? [];

  const weatherTomorrow =
    weather?.forecast?.forecastday[1]?.hour.slice(
      0,
      24 - weatherToday.length
    ) ?? [];

  const weatherNext24 = [...weatherToday, ...weatherTomorrow];

  return (
    <View className="mb-2 space-y-3">
      <View className="flex-row items-center mx-5 space-x-2">
        <Ionicons name="today-outline" size={20} color="white" />
        <Text className="text-white text-base">Today</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
      >
        {weatherNext24.map((hour) => {
          const parsedTime = parse(hour.time.slice(-5), "HH:mm", new Date());
          const time12hour = format(parsedTime, "hh:mm a");
          const time24hour = format(parsedTime, "HH:mm");

          return (
            <View
              key={hour.time_epoch}
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: "rgba(255,255,255, 0.15)" }}
            >
              <Text className="text-white text-xl font-semibold">
                {temperatureUnit === "C°"
                  ? `${hour?.temp_c}°`
                  : `${hour?.temp_f}°`}
              </Text>
              <Image
                source={
                  weatherImages[
                    hour?.condition?.text
                      .toLowerCase()
                      .trim() as keyof typeof weatherImages
                  ]
                }
                className="h-11 w-11"
              />
              <Text className="text-white">
                {timeFormat === "12 hours" ? `${time12hour}` : `${time24hour}`}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Today;
