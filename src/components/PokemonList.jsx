import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        setPokemonList(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const foundPokemon = pokemonList.find(
      (pokemon) => pokemon.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundPokemon) {
      const id = foundPokemon.url.split("/").slice(-2, -1)[0];
      navigate(`/pokemon/${id}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-pokemon-blue mb-2">
          Find Your Pokémon
        </h2>
        <p className="text-gray-600">Search by name or select from the list</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Charizard, Pikachu, Mewtwo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:border-transparent"
          />
          <div className="absolute left-3 top-3.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="absolute right-1 top-1 bg-pokemon-blue text-white px-3 py-2 rounded-lg hover:bg-pokemon-dark-blue transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      <div className="mb-6">
        <label
          htmlFor="pokemon-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Or choose from the list:
        </label>
        <select
          id="pokemon-select"
          onChange={(e) => navigate(`/pokemon/${e.target.value}`)}
          defaultValue=""
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pokemon-blue focus:border-transparent bg-white"
        >
          <option value="" disabled>
            Select a Pokémon...
          </option>
          {pokemonList.map((pokemon, index) => (
            <option key={pokemon.name} value={index + 1}>
              #{String(index + 1).padStart(3, "0")} -{" "}
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Showing Generation I Pokémon (1-151)
        </p>
      </div>
    </div>
  );
}

export default PokemonList;
