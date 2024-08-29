import { createContext, useState, ReactNode } from "react";

interface SettingsContextType {
  temperatureUnit: string;
  windSpeedUnit: string;
  timeFormat: string;
  toggleTemperatureUnit: () => void;
  toggleWindSpeedUnit: () => void;
  toggleTimeFormat: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [temperatureUnit, setTemperatureUnit] = useState<string>("C°");
  const [windSpeedUnit, setWindSpeedUnit] = useState<string>("kmh");
  const [timeFormat, setTimeFormat] = useState<string>("24 hours");

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === "C°" ? "F°" : "C°"));
  };

  const toggleWindSpeedUnit = () => {
    setWindSpeedUnit((prevUnit) => (prevUnit === "kmh" ? "mph" : "kmh"));
  };

  const toggleTimeFormat = () => {
    setTimeFormat((prevUnit) =>
      prevUnit === "24 hours" ? "12 hours" : "24 hours"
    );
  };

  return (
    <SettingsContext.Provider
      value={{
        temperatureUnit,
        windSpeedUnit,
        timeFormat,
        toggleTemperatureUnit,
        toggleWindSpeedUnit,
        toggleTimeFormat,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
