import React from "react";
import AppNavigation from "./navigation/appNavigation";
import { SettingsProvider } from "./context/SettingContext";

export default function App() {
  return (
    <SettingsProvider>
      <AppNavigation />
    </SettingsProvider>
  );
}
