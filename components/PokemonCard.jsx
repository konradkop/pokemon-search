import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { screenTypes } from "../App";
import { useDispatch } from "react-redux";
import { setCurrentPokemon } from "../reduxSlice/pokemonSlice";

export default function PokemonCard({ id, name, index, sprites, types }) {
  const dispatch = useDispatch();

  if (!name) {
    return (
      <ActivityIndicator className="flex flex-row pb-3 items-center mx-4 space-x-2 mb-2 border-b-2 border-gray-200 " />
    );
  }
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className={`${index % 2 === 0 ? "bg-gray-200" : ""}`}
      onPress={() => {
        dispatch(setCurrentPokemon(id));
        navigation.navigate(screenTypes.pokemon);
      }}
    >
      <View className="flex flex-row p-3 items-center">
        <Text className="font-bold text-gray-400 text-lg capitalize mx-4">
          {id}.
        </Text>
        <Image
          style={{
            height: 150,
            width: 150,
          }}
          source={{
            uri: sprites.front_default,
          }}
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-lg capitalize">
            {name}
          </Text>
          {types.map((type) => {
            return (
              <Text className="text-gray-400 text-xs capitalize">
                {type.type.name}
              </Text>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
}
