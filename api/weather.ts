import axios, { AxiosRequestConfig } from "axios";
import { apiKey } from "../constants";
import { Weather } from "../types/weatherTypes";

interface ForecastParams {
  cityName: string;
  days: string;
}

interface LocationsParams {
  cityName: string;
}

function forecastEndpoint(params: ForecastParams): string {
  return `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
}

function locationsEndpoint(params: LocationsParams): string {
  return `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;
}

async function apiCall<T>(endpoint: string): Promise<T | null> {
  const options: AxiosRequestConfig = { method: "GET", url: endpoint };
  try {
    const response = await axios.request<T>(options);
    return response.data;
  } catch (err) {
    console.error("Error: ", err);
    return null;
  }
}

// Exported functions with type annotations
export function fetchWeatherForecast(params: ForecastParams): Promise<any> {
  return apiCall<Weather>(forecastEndpoint(params));
}

export function fetchLocations(params: LocationsParams): Promise<any> {
  return apiCall<Location>(locationsEndpoint(params));
}
