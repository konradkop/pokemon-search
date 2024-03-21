import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addNewName, selectPokemonById } from "../reduxSlice/pokemonSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

export default function PokemonScreen() {
  const currentPokemon = useSelector(selectPokemonById);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [rename, setRename] = useState(false);
  const [changeText, onChangeText] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleOnSubmitAltName = () => {
    if (!changeText.length) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      dispatch(addNewName({ newName: changeText }));
      setRename(false);
    }
  };

  return (
    <SafeAreaView className={`bg-gray-200 min-h-screen lg:px-96`}>
      <View className="flex flex-col space-x-2 pb-2 mx-4 w-11/12 items-center">
        <TouchableOpacity
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full flex flex-row"
          onPress={navigation.goBack}
        >
          <Text className="font-bold text-xs text-gray-400"> {"Back"}</Text>
        </TouchableOpacity>
        <View className="items-center pt-16">
          <View className="flex flex-row space-x-2 flex-wrap mt-10">
            <Image
              className="h-20 w-20"
              source={{
                uri: currentPokemon.sprites.front_default,
              }}
            />
            <Image
              className="h-20 w-20"
              source={{
                uri: currentPokemon.sprites.back_default,
              }}
            />
            <Image
              className="h-20 w-20"
              source={{
                uri: currentPokemon.sprites.front_shiny,
              }}
            />
            <Image
              className="h-20 w-20"
              source={{
                uri: currentPokemon.sprites.back_shiny,
              }}
            />
          </View>
          <Image
            className=" md:h-64 md:w-64  h-48 w-48"
            source={{
              uri: currentPokemon.sprites.front_default,
            }}
          />
          {rename ? (
            <View className="flex flex-row  flex-wrap py-5 max-w-md justify-center">
              <View className="flex flex-col justify-center">
                <TextInput
                  placeholder={
                    currentPokemon.alternativeName || currentPokemon.name
                  }
                  keyboardType="default"
                  placeholderTextColor="grey"
                  className="outline-none border-transparent focus:border-transparent focus:ring-0  rounded-lg"
                  onChangeText={onChangeText}
                />
                {showWarning && (
                  <Text className="font-bold text-red-500 text-xs">
                    Name cannot be empty
                  </Text>
                )}
              </View>
              <TouchableOpacity
                className="mx-5 bg-emerald-300 p-4 rounded-lg flex-row items-center space-x-1 my-5"
                onPress={handleOnSubmitAltName}
              >
                <Text className="font-bold text-white text-xs">
                  Submit Alternative Name
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setRename(true)}>
              <Text className="font-bold text-gray-400 text-2xl capitalize">
                {currentPokemon.alternativeName || currentPokemon.name}
              </Text>
            </TouchableOpacity>
          )}
          <View className="flex flex-row space-x-4  border-b-gray-700 border-dotted border-b">
            {currentPokemon.types.map((type) => {
              return (
                <Text className="text-gray-400 text-md capitalize">
                  {type.type.name}
                </Text>
              );
            })}
          </View>
          <Text className="text-gray-400 text-md capitalize mt-5">
            height: {currentPokemon.height / 10} m
          </Text>
          <Text className="text-gray-400 text-md capitalize">
            weight: {currentPokemon.weight / 10} kg
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
