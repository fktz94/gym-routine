import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function Header() {
  return (
    <>
      <StatusBar style="light" />
      <View>
        <Text>Header</Text>
      </View>
    </>
  );
}
