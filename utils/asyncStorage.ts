import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error storing value: ", error);
  }
}

export async function getData(key: string): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("Error retrieving value: ", error);
    return null;
  }
}
