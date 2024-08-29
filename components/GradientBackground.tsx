import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StatusBar } from "react-native";

interface GradientBackgroundProps {
  children: ReactNode;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
}) => {
  return (
    <LinearGradient colors={["#62B8F6", "#2C79C1"]} className="flex-1">
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="light-content" />
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GradientBackground;
