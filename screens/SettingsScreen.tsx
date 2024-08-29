import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../context/SettingContext";
import { HomeScreenNavigationProp } from "../navigation/appNavigation";

interface SettingsScreenProps {
  navigation: HomeScreenNavigationProp;
}

interface ToggleProps {
  label: string;
  toggle1: string;
  toggle2: string;
  state: string;
  toggleState: () => void;
}

interface SettingsContextType {
  temperatureUnit: string;
  windSpeedUnit: string;
  timeFormat: string;
  toggleTemperatureUnit: () => void;
  toggleWindSpeedUnit: () => void;
  toggleTimeFormat: () => void;
}

function SettingsScreen({ navigation }: SettingsScreenProps) {
  const {
    temperatureUnit = "C°",
    windSpeedUnit = "kmh",
    timeFormat = "12 hours",
    toggleTemperatureUnit = () => {},
    toggleWindSpeedUnit = () => {},
    toggleTimeFormat = () => {},
  } = useContext(SettingsContext) as SettingsContextType;

  return (
    <GradientBackground>
      <View className="flex-row items-center px-5 my-6 space-x-2">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{ backgroundColor: "rgba(255,255,255, 0.3)" }}
          className="rounded-full p-3 m-1"
        >
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-2xl">Settings</Text>
      </View>
      <View className="px-5">
        <Text className="text-white text-base mb-5">Units</Text>
        <Toggle
          label="Temperature"
          toggle1="C°"
          toggle2="F°"
          state={temperatureUnit}
          toggleState={toggleTemperatureUnit}
        />
        <Toggle
          label="Wind speed"
          toggle1="kmh"
          toggle2="mph"
          state={windSpeedUnit}
          toggleState={toggleWindSpeedUnit}
        />
        <Toggle
          label="Time format"
          toggle1="12 hours"
          toggle2="24 hours"
          state={timeFormat}
          toggleState={toggleTimeFormat}
        />
      </View>
    </GradientBackground>
  );
}

function Toggle({ label, toggle1, toggle2, state, toggleState }: ToggleProps) {
  return (
    <View className="mb-4">
      <Text className="text-white text-base">{label}</Text>
      <View className="flex-row justify-center">
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleState}
          style={{
            backgroundColor:
              state === toggle1
                ? "rgba(255,255,255, 0.6)"
                : "rgba(255,255,255, 0.3)",
          }}
          className=" p-3"
        >
          <Text className="text-white text-base">{toggle1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleState}
          style={{
            backgroundColor:
              state === toggle2
                ? "rgba(255,255,255, 0.6)"
                : "rgba(255,255,255, 0.3)",
          }}
          className=" p-3"
        >
          <Text className="text-white text-base">{toggle2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SettingsScreen;
