import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { fetchPokemonData } from "../asyncFunctions/fetchPokemon.service";
import PokemonCard from "../components/PokemonCard";
import NoPokemonCard from "../components/NoPokemonCard";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPokemon } from "../reduxSlice/pokemonSlice";
export default function HomeScreen() {
  const [search, onChangeSearch] = useState("");
  const [initialData, setInitialData] = useState([]);
  const dispatch = useDispatch();
  const pokemonList = useSelector(selectAllPokemon);

  useEffect(() => {
    // already in state- so won't make network call onreload
    if (!pokemonList.length) {
      fetchPokemonData(151, dispatch, setInitialData);
    }
  }, []);

  const searchedPokemon = pokemonList
    .filter(
      (pokemon) =>
        pokemon?.alternativeName?.includes(search.toLowerCase()) ||
        pokemon.name.includes(search.toLowerCase()),
    )
    .sort(function (left, right) {
      return left.hasOwnProperty("alternativeName")
        ? -1
        : right.hasOwnProperty("alternativeName")
          ? 1
          : 0;
    });

  // for the use case if the user searches for 'mew'
  // Exists to show the user that the pokemon DOES exist in the db, but the app is still querying
  const exists = initialData.filter((pokemon) =>
    pokemon.name.includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView className={`bg-white pt-5 lg:px-96`}>
      {/*TopBar */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 w-11/12">
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">
            Konrad's Pokemon Renamer
          </Text>
        </View>
      </View>
      {/*Search */}
      <View className="flex-row space-x-2 pb-2 mx-4 w-11/12 items-center">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Search Pokemon"
            keyboardType="default"
            placeholderTextColor="grey"
            className="w-full outline-none border-transparent focus:border-transparent focus:ring-0"
            onChangeText={onChangeSearch}
          />
        </View>
      </View>
      {/*Scroll */}
      <ScrollView className="bg-gray-100">
        {searchedPokemon.length ? (
          searchedPokemon.map((pokemon, index) => {
            return (
              <PokemonCard
                key={`pokemon-card-${pokemon.name}`}
                id={pokemon.id}
                name={pokemon.alternativeName || pokemon.name}
                url={pokemon.url}
                index={index}
                sprites={pokemon.sprites}
                types={pokemon.types}
              />
            );
          })
        ) : (
          <NoPokemonCard exists={exists.length} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
