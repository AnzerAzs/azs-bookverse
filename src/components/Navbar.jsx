import { useState } from 'react';
import { Menu, X, Search, Settings, Moon, Sun } from 'lucide-react';

export default function Navbar({ onAdminClick, onThemeToggle, isDarkMode, searchQuery, onSearchChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 ${isDarkMode ? 'glass-effect' : 'bg-white border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-neon-green to-neon-dark rounded-lg flex items-center justify-center">
              <span className="text-dark-bg font-bold text-lg">📚</span>
            </div>
            <h1 className={`text-xl font-bold hidden sm:block ${
              isDarkMode ? 'text-neon-green' : 'text-dark-bg'
            }`}>
              AZS BookVerse
            </h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className={`relative w-full max-w-md ${
              isDarkMode ? 'glass-effect' : 'bg-gray-100'
            } rounded-lg`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neon-green" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border-0 outline-none transition-smooth ${
                  isDarkMode
                    ? 'bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-green'
                    : 'bg-white text-dark-bg placeholder-gray-500 focus:ring-2 focus:ring-neon-dark'
                }`}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-smooth ${
                isDarkMode
                  ? 'hover:bg-white/10 text-neon-green'
                  : 'hover:bg-gray-200 text-dark-bg'
              }`}
              title="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Admin Button */}
            <button
              onClick={onAdminClick}
              className={`p-2 rounded-lg transition-smooth ${
                isDarkMode
                  ? 'hover:bg-white/10 text-neon-green'
                  : 'hover:bg-gray-200 text-dark-bg'
              }`}
              title="Admin panel"
            >
              <Settings size={20} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-smooth ${
                isDarkMode
                  ? 'hover:bg-white/10 text-neon-green'
                  : 'hover:bg-gray-200 text-dark-bg'
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-down">
            <div className={`relative ${
              isDarkMode ? 'glass-effect' : 'bg-gray-100'
            } rounded-lg`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neon-green" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border-0 outline-none transition-smooth ${
                  isDarkMode
                    ? 'bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-neon-green'
                    : 'bg-white text-dark-bg placeholder-gray-500 focus:ring-2 focus:ring-neon-dark'
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
