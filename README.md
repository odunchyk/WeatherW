# WeatherW

## Expo Demo

[Expo Demo link](https://expo.dev/preview/update?message=Demo%20version%200.1&updateRuntimeVersion=1.0.0&createdAt=2024-08-30T08%3A16%3A11.333Z&slug=exp&projectId=114e98d2-deca-43d2-94a3-55ab190d323e&group=abb0eea3-28ac-4fb5-b340-fea763fa237a)

To run demo on your mobile device install Expo mobile for [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [IOS](https://apps.apple.com/ua/app/expo-go/id982107779?l) and scan QR code from demo link
## Overview

A React Native weather application that provides weather forecasts based on [Weather API](https://www.weatherapi.com/). This project is built with React Native and Expo, and it features a modern UI with real-time weather data.

## Features

### **Search Autocomplete**
- **Description**: Provides an autocomplete feature in the search bar to suggest locations as users type. It helps users find their desired location more efficiently by displaying a list of matching suggestions based on the input.
- **Implementation**: Utilizes a debounce mechanism to minimize API calls while the user types, fetching location suggestions from a weather API.

### **Detailed Forecast For Current Moment**
- **Description**: Displays a comprehensive view of the current weather conditions for the selected location. Includes temperature, humidity, wind speed, and weather conditions (e.g., sunny, rainy).
- **Implementation**: Fetches real-time weather data from an API and presents it in a user-friendly format with relevant icons and data points.

### **Forecast For Next Day**
- **Description**: Shows a detailed weather forecast for the upcoming day, including temperature highs and lows, expected weather conditions, and any significant weather events (e.g., thunderstorms, snow).
- **Implementation**: Retrieves forecast data from a weather API for the next 24 hours.

### **A Week Forecast**
- **Description**: Provides a 7-day weather forecast, giving users an overview of expected weather patterns for an entire week. This includes daily summaries with temperature ranges, weather conditions, and any notable weather changes.
- **Implementation**: Uses a weather API to fetch the weekly forecast and displays it in a list or calendar format, allowing users to scroll through the upcoming week's weather predictions easily.

![HomeScreen](https://github.com/user-attachments/assets/350f0f08-b4af-4480-9756-329da96c9f4d)

### **Settings**
- **Description**: Allows users to customize their experience by adjusting settings such as temperature units (Celsius/Fahrenheit), wind speed units (km/h, mph), and time formats. Users can also configure other preferences related to weather notifications and app behavior.
- **Implementation**: Provides a settings screen where users can toggle options and save their preferences. The settings are applied throughout the app, ensuring a consistent user experience based on their choices.

![SettingsScreen](https://github.com/user-attachments/assets/aa7c7e58-df3a-4a9c-95a1-669cfebb8803)

### **Async Storage**
- **Description**: Saves user data between logins, allowing for a seamless experience across app sessions. This includes storing user preferences, search history, settings and other relevant data.
- **Implementation**: Uses Async Storage to persist data locally on the device. This ensures that user settings and search history are retained even when the app is closed or restarted.

## Installation
1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/your-repository.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd your-repository
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm start
    ```

5. **Scan QR code to run on your mobile device or run with virtual machine such as [Android Studio](https://developer.android.com/studio):**

## Contact

Email: oleksii.dunchyk.dev@gmail.com
