import React from "react";
import { View, Text } from "react-native";
import Broken from "../components/broken";
import Working from "../components/working";

export default function App() {
  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Text>Broken</Text>
      <Broken />
      <View
        style={{ height: 1, backgroundColor: "blue", marginVertical: 20 }}
      />
      <Text>Working with the workaround</Text>
      <Working />
    </View>
  );
}
