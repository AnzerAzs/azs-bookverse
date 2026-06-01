import { Mail, MapPin, Phone, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer({ isDarkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${
      isDarkMode ? 'bg-dark-card' : 'bg-gray-900 text-white'
    } py-12 px-4`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-green to-neon-dark rounded-lg flex items-center justify-center">
                <span className="text-dark-bg font-bold">📚</span>
              </div>
              <h3 className={`text-lg font-bold ${
                isDarkMode ? 'text-neon-green' : 'text-white'
              }`}>
                AZS BookVerse
              </h3>
            </div>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-300'
            }`}>
              Knowledge Beyond Time - Your gateway to endless digital libraries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-neon-green' : 'text-white'
            }`}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {['Categories', 'About Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className={`transition-smooth hover:text-neon-green ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-300'
                  }`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-neon-green' : 'text-white'
            }`}>
              Get in Touch
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-neon-green" />
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-300'}>
                  contact@azsbookverse.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-neon-green" />
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-300'}>
                  +92-XXX-XXXXXXX
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-neon-green" />
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-300'}>
                  Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-700'
        } pt-8`}>
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-6">
            {[
              { icon: Github, link: '#' },
              { icon: Twitter, link: '#' },
              { icon: Linkedin, link: '#' },
            ].map(({ icon: Icon, link }, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-smooth ${
                  isDarkMode
                    ? 'hover:bg-white/10 text-neon-green'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className={`text-center text-sm ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <p>© {currentYear} AZS BookVerse. All rights reserved.</p>
            <p className="mt-2">
              Designed & Built with ❤️ by <span className="text-neon-green font-semibold">AZS Dev Team</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
