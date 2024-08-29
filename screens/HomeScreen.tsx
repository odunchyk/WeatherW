import React, { useEffect, useState } from "react";
import { fetchWeatherForecast } from "../api/weather";
import { getData, storeData } from "../utils/asyncStorage";
import SearchBar from "../components/SearchBar";
import MainInfo from "../components/MainInfo";
import Forecast7Days from "../components/Forecast7Days";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Loader from "../components/Loader";
import Today from "../components/Today";
import GradientBackground from "../components/GradientBackground";
import { Location, Weather } from "../types/weatherTypes";
import { HomeScreenNavigationProp } from "../navigation/appNavigation";

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

function HomeScreen({ navigation }: HomeScreenProps) {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function handleLocation(location: Location) {
    setLocations([]);
    setShowSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: location.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
      storeData("city", location.name);
    });
  }

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  async function fetchMyWeatherData() {
    let myCity = await getData("city");
    let cityName = "Kyiv";
    if (myCity) cityName = myCity;
    fetchWeatherForecast({
      cityName: cityName,
      days: "7",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  }

  if (loading || !weather) {
    return <Loader />;
  }

  const { current, location } = weather;

  return (
    <GradientBackground>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          overScrollMode="never"
        >
          <View className="py-2">
            <SearchBar
              showSearch={showSearch}
              toggleSearch={setShowSearch}
              locations={locations}
              setLocations={setLocations}
              handleLocation={handleLocation}
              navigation={navigation}
            />
            <MainInfo location={location} weather={weather} current={current} />
            <Today weather={weather} />
            <Forecast7Days weather={weather} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default HomeScreen;
