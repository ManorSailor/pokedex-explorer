import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import PokemonStats from "./PokemonStats";

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
        setLoading(false);
      } catch (err) {
        setError("Pokémon not found");
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id]);

  const handlePrev = () => {
    if (id > 1) navigate(`/pokemon/${parseInt(id) - 1}`);
  };

  const handleNext = () => {
    navigate(`/pokemon/${parseInt(id) + 1}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-12 text-red-500 text-xl">{error}</div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <button
          onClick={handlePrev}
          disabled={id <= 1}
          className={`flex items-center px-4 py-2 rounded-lg ${
            id <= 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Pokémon Header */}
        <div className="bg-gradient-to-r from-pokemon-blue to-pokemon-dark-blue p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
              <p className="text-pokemon-yellow font-semibold">
                #{pokemon.id.toString().padStart(3, "0")}
              </p>
            </div>
            <div className="text-right">
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.slot}
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium capitalize ${type.type.name}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-sm opacity-80">
                Height: {(pokemon.height / 10).toFixed(1)}m • Weight:{" "}
                {(pokemon.weight / 10).toFixed(1)}kg
              </p>
            </div>
          </div>
        </div>

        {/* Pokémon Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Section */}
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <img
                  src={
                    pokemon.sprites.other["official-artwork"].front_default ||
                    pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  className="w-64 h-64 object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Base Exp</p>
                  <p className="font-bold">{pokemon.base_experience}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Abilities</p>
                  <p className="font-bold capitalize">
                    {pokemon.abilities
                      .slice(0, 2)
                      .map((a) => a.ability.name)
                      .join(", ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex-1">
              <PokemonStats stats={pokemon.stats} />

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 text-pokemon-blue">
                  Moves
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.moves.slice(0, 10).map((move, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm capitalize"
                    >
                      {move.move.name.replace("-", " ")}
                    </span>
                  ))}
                  {pokemon.moves.length > 10 && (
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      +{pokemon.moves.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
