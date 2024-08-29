import { Image, Text, View } from "react-native";
import { weatherImages } from "../constants";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingContext";
import { format, parse } from "date-fns";
import { Current, Location, Weather } from "../types/weatherTypes";

interface MainInfoProps {
  location: Location;
  weather: Weather;
  current: Current;
}

function MainInfo({ location, weather, current }: MainInfoProps) {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("SettingsContext must be used within a SettingsProvider");
  }

  const { temperatureUnit, windSpeedUnit, timeFormat } = context;

  const today = new Date();

  const parsedTime = parse(
    weather?.forecast?.forecastday[0]?.astro?.sunrise,
    "hh:mm a",
    new Date()
  );

  const time12hour = format(parsedTime, "hh:mm a");
  const time24hour = format(parsedTime, "HH:mm");

  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(today);

  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    today
  );

  const dayOfMonth = today.getDate();

  return (
    <View className="mx-4 justify-around p-14">
      <Text className="text-white text-center text-2xl font-bold mb-4">
        {location?.name} · {location?.country}
      </Text>
      <View className="flex-row justify-center mb-4">
        <Image
          source={
            weatherImages[
              current?.condition?.text
                .toLowerCase()
                .trim() as keyof typeof weatherImages
            ]
          }
          className="w-52 h-52"
        />
      </View>
      <Text className="text-center text-white text-xl ml-5 mb-12 tracking-widest">
        {dayOfWeek} | {month} {dayOfMonth}
      </Text>
      <Text className="text-center font-bold text-white text-6xl ml-5">
        {temperatureUnit === "C°"
          ? `${current?.temp_c}°`
          : `${current?.temp_f}°`}
      </Text>
      <Text className="text-center text-white text-xl ml-5 mb-10 tracking-widest">
        {current?.condition?.text}
      </Text>
      <View className="flex-row justify-between">
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../assets/icons/wind.png")}
            className="w-6 h-6"
          />
          <Text className="text-white font-semibold text-base">
            {windSpeedUnit === "kmh"
              ? `${current?.wind_kph} km/h`
              : `${current?.wind_mph} m/h`}
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../assets/icons/drop.png")}
            className="w-6 h-6"
          />
          <Text className="text-white font-semibold text-base">
            {current?.humidity} %
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../assets/icons/sun.png")}
            className="w-6 h-6"
          />
          <Text className="text-white font-semibold text-base">
            {timeFormat === "12 hours" ? `${time12hour}` : `${time24hour}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default MainInfo;
