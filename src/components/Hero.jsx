export default function Hero({ isDarkMode }) {
  return (
    <section className={`py-20 px-4 text-center ${
      isDarkMode ? 'bg-gradient-to-b from-dark-bg to-dark-card' : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="max-w-4xl mx-auto float-in">
        <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text bg-gradient-to-r from-neon-green to-neon-dark text-transparent`}>
          Knowledge Beyond Time
        </h2>
        <p className={`text-lg md:text-xl mb-8 leading-relaxed ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Explore our curated collection of Islamic knowledge, literature, science, and more.
          Access thousands of books from Google Drive in one futuristic platform.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="btn-primary">
            📖 Explore Now
          </button>
          <button className="btn-secondary">
            ✨ Featured Collections
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="mt-12 relative h-32 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-32 h-32 rounded-full blur-3xl ${
            isDarkMode
              ? 'bg-neon-green/20 animate-pulse'
              : 'bg-neon-dark/10 animate-pulse'
          }`}></div>
        </div>
        <span className="relative text-6xl">📚✨</span>
      </div>
    </section>
  );
}
