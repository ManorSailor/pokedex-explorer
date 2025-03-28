export default function PokemonStats({ stats }) {
  const statNames = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-3 text-pokemon-blue">
        Base Stats
      </h3>
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.stat.name} className="flex items-center">
            <div className="w-24">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {statNames[stat.stat.name] || stat.stat.name}
              </span>
            </div>
            <div className="w-10 text-right mr-3 font-bold">
              {stat.base_stat}
            </div>
            <div className="flex-grow">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-red-500"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center pt-2">
          <div className="w-24">
            <span className="text-sm font-medium text-gray-700">Total</span>
          </div>
          <div className="w-10 text-right mr-3 font-bold">
            {stats.reduce((total, stat) => total + stat.base_stat, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
