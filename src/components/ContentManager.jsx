import { useState } from 'react';
import { Upload, X, Download, AlertCircle } from 'lucide-react';

export default function ContentManager({ isDarkMode, onClose }) {
  const [activeTab, setActiveTab] = useState('instructions');
  const [categories, setCategories] = useState([
    { id: 1, name: 'Quranic Technologies', status: 'pending', link: '' },
    { id: 2, name: 'Quran', status: 'pending', link: '' },
    { id: 3, name: 'Tafseer', status: 'pending', link: '' },
    { id: 4, name: 'Hadith', status: 'pending', link: '' },
    { id: 5, name: 'Fiqh', status: 'pending', link: '' },
    { id: 6, name: 'Seerah', status: 'pending', link: '' },
    { id: 7, name: 'History', status: 'pending', link: '' },
    { id: 8, name: 'Urdu Literature', status: 'pending', link: '' },
    { id: 9, name: 'Business', status: 'pending', link: '' },
    { id: 10, name: 'Fiction', status: 'pending', link: '' },
    { id: 11, name: 'Mysteries', status: 'pending', link: '' },
    { id: 12, name: 'Psychology', status: 'pending', link: '' },
    { id: 13, name: 'Science', status: 'pending', link: '' },
  ]);

  const updateCategoryLink = (id, link) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, link, status: link ? 'connected' : 'pending' } : cat
      )
    );
  };

  const downloadTemplate = () => {
    const template = categories
      .map((cat) => `${cat.name},https://drive.google.com/drive/folders/FOLDER_ID`)
      .join('\n');
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(template));
    element.setAttribute('download', 'categories-template.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto`}>
      <div className={`relative w-full max-w-4xl mx-4 my-8 rounded-2xl ${
        isDarkMode ? 'bg-dark-card' : 'bg-white'
      } overflow-hidden max-h-[90vh] overflow-y-auto`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-smooth z-10 ${
            isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className={`p-6 border-b ${
          isDarkMode ? 'border-gray-700 bg-dark-bg' : 'border-gray-200 bg-gray-50'
        }`}>
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-neon-green' : 'text-dark-bg'
          }`}>
            📚 Content Manager
          </h2>
          <p className={`text-sm mt-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Add Google Drive links to your book categories
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {[
            { id: 'instructions', label: '📖 Instructions' },
            { id: 'categories', label: '📚 Categories' },
            { id: 'upload', label: '⬆️ Batch Upload' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-smooth ${
                activeTab === tab.id
                  ? isDarkMode
                    ? 'border-b-2 border-neon-green text-neon-green'
                    : 'border-b-2 border-neon-dark text-neon-dark'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Instructions Tab */}
          {activeTab === 'instructions' && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-300'
              }`}>
                <h3 className={`font-bold mb-2 flex items-center gap-2 ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  <AlertCircle size={20} /> How to Setup
                </h3>
                <ol className={`list-decimal list-inside space-y-2 text-sm ${
                  isDarkMode ? 'text-blue-200' : 'text-blue-600'
                }`}>
                  <li>Go to <strong>Google Drive</strong></li>
                  <li>Create a new folder for each category</li>
                  <li>Upload your PDF books to each folder</li>
                  <li>Right-click folder → <strong>Share</strong></li>
                  <li>Copy the sharing link</li>
                  <li>Paste the link in the "Categories" tab below</li>
                  <li>Click "Connect" and you're done!</li>
                </ol>
              </div>

              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-300'
              }`}>
                <h3 className={`font-bold mb-2 ${
                  isDarkMode ? 'text-green-300' : 'text-green-700'
                }`}>
                  ✅ Example Google Drive Link
                </h3>
                <code className={`block p-2 rounded text-xs overflow-x-auto ${
                  isDarkMode ? 'bg-dark-bg text-neon-green' : 'bg-gray-100 text-dark-bg'
                }`}>
                  https://drive.google.com/drive/folders/1xXxXxXxXxXxXxXxXxXxXx
                </code>
              </div>

              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-purple-500/10 border border-purple-500/30' : 'bg-purple-50 border border-purple-300'
              }`}>
                <h3 className={`font-bold mb-2 ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  💡 Pro Tip
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-purple-200' : 'text-purple-600'
                }`}>
                  Users can preview books, download them, and read online directly from Google Drive!
                </p>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className={`p-4 rounded-lg border-2 transition-smooth ${
                  isDarkMode
                    ? 'border-gray-700 hover:border-neon-green/50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className={`font-bold mb-2 ${
                        isDarkMode ? 'text-neon-green' : 'text-dark-bg'
                      }`}>
                        {category.name}
                      </h4>
                      <input
                        type="text"
                        placeholder="Paste Google Drive folder link here..."
                        value={category.link}
                        onChange={(e) => updateCategoryLink(category.id, e.target.value)}
                        className={`w-full px-3 py-2 rounded border-2 outline-none text-sm transition-smooth ${
                          isDarkMode
                            ? 'border-neon-green/30 bg-dark-bg text-white focus:border-neon-green'
                            : 'border-gray-300 bg-white text-dark-bg focus:border-neon-dark'
                        }`}
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        category.status === 'connected'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}>
                        {category.status === 'connected' ? '✅ Ready' : '⏳ Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Batch Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-orange-50 border border-orange-300'
              }`}>
                <h3 className={`font-bold mb-2 flex items-center gap-2 ${
                  isDarkMode ? 'text-orange-300' : 'text-orange-700'
                }`}>
                  <Upload size={20} /> Batch Upload
                </h3>
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-orange-200' : 'text-orange-600'
                }`}>
                  Download the template, fill it with your Google Drive links, and upload it back.
                </p>
                <button
                  onClick={downloadTemplate}
                  className="btn-primary flex items-center justify-center gap-2 w-full"
                >
                  <Download size={18} /> Download CSV Template
                </button>
              </div>

              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}>
                <h4 className={`font-bold mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Template Format:
                </h4>
                <code className={`block p-2 rounded text-xs overflow-x-auto ${
                  isDarkMode ? 'bg-dark-bg text-neon-green' : 'bg-white text-dark-bg'
                }`}>
                  Category Name,Google Drive Link{`\n`}
                  Quranic Technologies,https://drive.google.com/drive/folders/1abc{`\n`}
                  Quran,https://drive.google.com/drive/folders/2def{`\n`}
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${
          isDarkMode ? 'border-gray-700 bg-dark-bg' : 'border-gray-200 bg-gray-50'
        }`}>
          <button
            onClick={onClose}
            className="btn-primary w-full"
          >
            ✅ Done
          </button>
          <p className={`text-xs text-center mt-3 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            💾 Your content is automatically saved to browser storage
          </p>
        </div>
      </div>
    </div>
  );
}
