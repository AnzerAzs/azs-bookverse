export default function AdSlot({ position, isDarkMode }) {
  const heights = {
    top: 'h-32',
    middle: 'h-24',
    bottom: 'h-32',
  };

  const labels = {
    top: 'Top Banner Ad',
    middle: 'Middle Ad Slot',
    bottom: 'Footer Ad Slot',
  };

  return (
    <section className={`py-8 px-4 ${
      isDarkMode ? 'bg-dark-card/50' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className={`${heights[position]} w-full rounded-xl flex items-center justify-center ${
          isDarkMode
            ? 'glass-effect border-2 border-neon-green/50 hover:border-neon-green transition-smooth'
            : 'bg-gray-200 border-2 border-gray-300'
        }`}>
          <div className="text-center">
            <p className={`text-sm font-semibold ${
              isDarkMode ? 'text-neon-green/70' : 'text-gray-600'
            }`}>
              📢 {labels[position]}
            </p>
            <p className={`text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Google AdSense / Adsterra / Custom Ads
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
