import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./reduxSlice/pokemonSlice";

export default configureStore({
  reducer: {
    pokemon: pokemonSlice,
  },
});
