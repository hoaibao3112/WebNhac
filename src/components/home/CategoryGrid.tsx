const categories = [
  {
    id: 1,
    name: "Gen Z Hits",
    color: "from-pink-500 to-rose-500",
    emoji: "🎤",
  },
  {
    id: 2,
    name: "TikTok Thịnh Hành",
    color: "from-cyan-500 to-blue-500",
    emoji: "📱",
  },
  {
    id: 3,
    name: "K-Pop",
    color: "from-purple-500 to-pink-500",
    emoji: "🇰🇷",
  },
  {
    id: 4,
    name: "Indie Việt",
    color: "from-orange-500 to-red-500",
    emoji: "🎸",
  },
  {
    id: 5,
    name: "Yêu",
    color: "from-red-500 to-pink-500",
    emoji: "❤️",
  },
  {
    id: 6,
    name: "V-Pop Thịnh Hành",
    color: "from-green-500 to-emerald-500",
    emoji: "🎵",
  },
  {
    id: 7,
    name: "Remix Việt",
    color: "from-violet-500 to-purple-500",
    emoji: "🎧",
  },
  {
    id: 8,
    name: "Hip-Hop Việt",
    color: "from-yellow-500 to-orange-500",
    emoji: "🎤",
  },
  {
    id: 9,
    name: "Chill",
    color: "from-blue-500 to-cyan-500",
    emoji: "🌊",
  },
  {
    id: 10,
    name: "Hip-Hop/R&B",
    color: "from-gray-700 to-gray-900",
    emoji: "🎶",
  },
];

const CategoryGrid = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Khám Phá</h2>
      <div className="grid grid-cols-5 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`aspect-square rounded-lg bg-gradient-to-br ${category.color} p-4 flex flex-col items-start justify-end hover:scale-105 transition-transform shadow-lg`}
          >
            <span className="text-4xl mb-2">{category.emoji}</span>
            <span className="text-white font-bold text-lg">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
