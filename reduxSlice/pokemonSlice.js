import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentPokemonId: 0,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addToPokemonList: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    setCurrentPokemon: (state, action) => {
      state.currentPokemonId = action.payload;
    },
    addNewName: (state, action) => {
      const currentPokemonIndex = state.items.findIndex(
        (item) => item.id === state.currentPokemonId,
      );
      let newBasket = [...state.items];
      newBasket[currentPokemonIndex] = {
        ...newBasket[currentPokemonIndex],
        alternativeName: action.payload.newName,
      };
      state.items = newBasket;
    },
  },
});

export const { addToPokemonList, setCurrentPokemon, addNewName } =
  pokemonSlice.actions;

export const selectAllPokemon = (state) => state.pokemon.items;

export const selectPokemonById = (state) =>
  state.pokemon.items.find(
    (item) => item.id === state.pokemon.currentPokemonId,
  );

export default pokemonSlice.reducer;
