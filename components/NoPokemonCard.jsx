import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function NoPokemonCard({ exists }) {
  return (
    <View>
      {exists ? (
        <View className="flex flex-row pb-3 items-center mx-4 space-x-2 mb-2">
          <ActivityIndicator />
          <Text className="text-gray-400 text-md items-center mx-4 space-x-2 mb-2">
            Pokemon exists, fetching data now
          </Text>
        </View>
      ) : (
        <Text className="text-gray-400 text-md">
          Pokemon does not exist....
        </Text>
      )}
    </View>
  );
}
