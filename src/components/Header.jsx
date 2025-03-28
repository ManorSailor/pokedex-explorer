export default function Header() {
  return (
    <header className="bg-blue-400 text-white shadow-lg flex justify-between items-center px-6 py-4">
      <div className="flex items-center space-x-4">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="PokéAPI"
          className="h-12"
        />
        <h1 className="text-3xl font-bold text-pokemon-yellow drop-shadow-lg">
          Pokédex Explorer
        </h1>
      </div>

      <p className="text-sm text-pokemon-yellow">
        Discover all 151 original Pokémon!
      </p>
    </header>
  );
}
