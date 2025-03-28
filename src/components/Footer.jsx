export default function Footer() {
  return (
    <footer className="bg-pokemon-blue text-white py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">
          Data provided by{" "}
          <a
            href="https://pokeapi.co/"
            className="text-pokemon-yellow hover:underline"
          >
            PokéAPI
          </a>
        </p>
        <p className="text-sm">
          © {new Date().getFullYear()} Pokédex Explorer - Not affiliated with
          Nintendo
        </p>
      </div>
    </footer>
  );
}
