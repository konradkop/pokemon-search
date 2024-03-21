import { addToPokemonList } from "../reduxSlice/pokemonSlice";

// fetches all 151 pokemon at once, will multiple queries
// BUT since its stored in redux, it only has to be done once per app
export async function fetchPokemonData(limit = 151, dispatch, setInitialData) {
  const initialPokemonData = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
  );
  const parsedPokemonData = await initialPokemonData.json();
  setInitialData(parsedPokemonData.results);

  for (let index in parsedPokemonData.results) {
    const singlePokemonData = await fetchOnePokemon(
      parsedPokemonData.results[index].url,
    );
    dispatch(
      addToPokemonList({
        id: index,
        name: parsedPokemonData.results[index].name,
        url: parsedPokemonData.results[index].url,
        ...singlePokemonData,
      }),
    );
  }

  return parsedPokemonData;
}

export async function fetchOnePokemon(url) {
  const initialPokemonData = await fetch(url);
  const parsedPokemonData = await initialPokemonData.json();
  return parsedPokemonData;
}
