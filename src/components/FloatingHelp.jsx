import { MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function FloatingHelp({ isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Help Menu */}
      {isOpen && (
        <div className={`mb-4 p-4 rounded-2xl shadow-lg max-w-xs ${
          isDarkMode ? 'bg-dark-card border border-neon-green/30' : 'bg-white border-2 border-gray-300'
        } animate-in slide-in-up`}>
          <h3 className={`font-bold mb-3 ${
            isDarkMode ? 'text-neon-green' : 'text-dark-bg'
          }`}>
            📞 Need Help?
          </h3>
          <div className="space-y-2">
            <a
              href="https://www.youtube.com/watch?v=example"
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-2 rounded text-sm hover:shadow-md transition-smooth ${
                isDarkMode ? 'bg-neon-green/10 hover:bg-neon-green/20 text-neon-green' : 'bg-gray-100 hover:bg-gray-200 text-dark-bg'
              }`}
            >
              📺 Video Tutorial
            </a>
            <a
              href="https://github.com/AnzerAzs/AZS-BookVerse/wiki"
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-2 rounded text-sm hover:shadow-md transition-smooth ${
                isDarkMode ? 'bg-neon-green/10 hover:bg-neon-green/20 text-neon-green' : 'bg-gray-100 hover:bg-gray-200 text-dark-bg'
              }`}
            >
              📖 Documentation
            </a>
            <a
              href="mailto:contact@azsbookverse.com"
              className={`block p-2 rounded text-sm hover:shadow-md transition-smooth ${
                isDarkMode ? 'bg-neon-green/10 hover:bg-neon-green/20 text-neon-green' : 'bg-gray-100 hover:bg-gray-200 text-dark-bg'
              }`}
            >
              ✉️ Email Support
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-smooth hover:scale-110 ${
          isDarkMode
            ? 'bg-gradient-to-r from-neon-green to-neon-dark text-dark-bg hover:shadow-glow-lg'
            : 'bg-gradient-to-r from-neon-dark to-neon-green text-white hover:shadow-lg'
        }`}
        title="Help & Support"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
