const charts = [
  {
    id: 1,
    title: "Top 50 Nhạc Việt",
    description: "Những bản hit được nghe nhiều nhất tại Việt Nam",
    image: "🇻🇳",
    color: "from-red-600 to-yellow-500",
  },
  {
    id: 2,
    title: "Top 50 Nhạc Âu Mỹ",
    description: "Bảng xếp hạng âm nhạc quốc tế",
    image: "🌎",
    color: "from-blue-600 to-purple-600",
  },
  {
    id: 3,
    title: "Top 50 Nhạc Hàn",
    description: "K-Pop hot nhất hiện nay",
    image: "🇰🇷",
    color: "from-pink-600 to-rose-600",
  },
  {
    id: 4,
    title: "Top 50 Nhạc Hoa",
    description: "C-Pop đang thịnh hành",
    image: "🇨🇳",
    color: "from-yellow-600 to-orange-600",
  },
  {
    id: 5,
    title: "Top 50 Nhạc Trẻ",
    description: "Yêu thích của giới trẻ",
    image: "🎵",
    color: "from-green-600 to-teal-600",
  },
  {
    id: 6,
    title: "Top 50 Rap Việt",
    description: "Rap/Hip-Hop Việt Nam",
    image: "🎤",
    color: "from-gray-700 to-zinc-800",
  },
];

const ChartSection = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Bảng Xếp Hạng</h2>
      <div className="grid grid-cols-3 gap-6">
        {charts.map((chart) => (
          <button
            key={chart.id}
            className="bg-zinc-800/50 rounded-lg p-6 hover:bg-zinc-800 transition-all group"
          >
            <div
              className={`w-full aspect-square rounded-lg bg-gradient-to-br ${chart.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
            >
              <span className="text-6xl">{chart.image}</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{chart.title}</h3>
            <p className="text-gray-400 text-sm">{chart.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartSection;
