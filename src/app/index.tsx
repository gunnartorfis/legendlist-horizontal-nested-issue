import React from "react";
import { View } from "react-native";
import Broken from "../components/broken";
import Working from "../components/working";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Broken />
      <View
        style={{ height: 1, backgroundColor: "blue", marginVertical: 20 }}
      />
      <Working />
    </View>
  );
}
