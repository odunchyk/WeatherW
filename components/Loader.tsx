import React from "react";
import { View } from "react-native";
import * as Progress from "react-native-progress";

function Loader() {
  return (
    <View className="flex-1 flex-row justify-center items-center bg-[#00C8FF]">
      <Progress.CircleSnail thickness={10} size={140} color="#FFFDED" />
    </View>
  );
}

export default Loader;
