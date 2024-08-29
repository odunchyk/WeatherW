import React, { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { fetchLocations } from "../api/weather";
import { Location } from "../types/weatherTypes";
import { HomeScreenNavigationProp } from "../navigation/appNavigation";

interface SearchBarProps {
  showSearch: boolean;
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
  handleLocation: (location: Location) => void;
  toggleSearch: (value: boolean) => void;
  navigation: HomeScreenNavigationProp;
}

function SearchBar({
  showSearch,
  locations,
  setLocations,
  handleLocation,
  toggleSearch,
  navigation,
}: SearchBarProps) {
  function handleSearch(value: string) {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => setLocations(data));
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 750), []);

  return (
    <View className="mx-4 z-50">
      <View
        className="flex-row items-center rounded-full"
        style={{
          backgroundColor: showSearch
            ? "rgba(255,255,255, 0.2)"
            : "transparent",
        }}
      >
        <TouchableOpacity
          onPress={() => toggleSearch(!showSearch)}
          style={{ backgroundColor: "rgba(255,255,255, 0.3)" }}
          className="rounded-full p-3 m-1"
        >
          <Ionicons name="search-outline" size={24} color="white" />
        </TouchableOpacity>
        {showSearch ? (
          <TextInput
            onChangeText={handleTextDebounce}
            placeholder="Search city"
            placeholderTextColor={"lightgray"}
            className="pl-6 text-base text-white"
          />
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            style={{ backgroundColor: "rgba(255,255,255, 0.3)" }}
            className="rounded-full p-3 m-1 ml-auto"
          >
            <Ionicons name="cog-outline" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      {locations.length > 0 && showSearch ? (
        <View className="absolute w-full bg-gray-300 top-16 rounded-3xl overflow-hidden">
          {locations.map((location, index) => {
            let showBorder = index + 1 != locations.length;
            let borderClass = showBorder ? "border-b-2 border-b-gray-400" : "";
            return (
              <TouchableOpacity
                onPress={() => handleLocation(location)}
                key={index}
                className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`}
              >
                <Ionicons name="locate-outline" size={20} color="gray" />
                <Text className="text-black text-lg ml-3">
                  {location?.name}, {location?.country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

export default SearchBar;
