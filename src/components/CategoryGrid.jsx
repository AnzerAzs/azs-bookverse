import { useState } from 'react';
import { Trash2, Edit2, Save, X } from 'lucide-react';

export default function CategoryGrid({ categories, onRemove, onUpdate, isDarkMode }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (category) => {
    setEditingId(category.id);
    setEditData(category);
  };

  const saveEdit = (id) => {
    onUpdate(id, editData);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  if (categories.length === 0) {
    return (
      <section className={`py-20 px-4 ${
        isDarkMode ? 'bg-dark-bg' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            No categories found. Try a different search or add new categories!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 px-4 ${
      isDarkMode ? 'bg-dark-bg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-3xl font-bold mb-12 text-center ${
          isDarkMode ? 'text-neon-green' : 'text-dark-bg'
        }`}>
          📚 Browse Categories
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl transition-smooth ${
                isDarkMode
                  ? 'glass-effect hover:shadow-glow-lg'
                  : 'bg-gray-50 border-2 border-gray-200 hover:shadow-lg'
              }`}
            >
              {editingId === category.id ? (
                // Edit Mode
                <div className={`p-6 ${
                  isDarkMode ? 'bg-dark-card' : 'bg-white'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-neon-green' : 'text-dark-bg'
                  }`}>
                    Edit Category
                  </h3>
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={editData.name || ''}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className={`w-full mb-2 p-2 rounded border ${
                      isDarkMode
                        ? 'bg-dark-bg border-neon-green text-white'
                        : 'bg-white border-gray-300 text-dark-bg'
                    } outline-none focus:ring-2 focus:ring-neon-green`}
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={editData.image || ''}
                    onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                    className={`w-full mb-2 p-2 rounded border ${
                      isDarkMode
                        ? 'bg-dark-bg border-neon-green text-white'
                        : 'bg-white border-gray-300 text-dark-bg'
                    } outline-none focus:ring-2 focus:ring-neon-green`}
                  />
                  <input
                    type="text"
                    placeholder="Google Drive Link"
                    value={editData.link || ''}
                    onChange={(e) => setEditData({ ...editData, link: e.target.value })}
                    className={`w-full mb-4 p-2 rounded border ${
                      isDarkMode
                        ? 'bg-dark-bg border-neon-green text-white'
                        : 'bg-white border-gray-300 text-dark-bg'
                    } outline-none focus:ring-2 focus:ring-neon-green`}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(category.id)}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <Save size={18} /> Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 btn-secondary flex items-center justify-center gap-2"
                    >
                      <X size={18} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x300?text=No+Image';
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-neon-green/30 transition-smooth`}></div>
                  </div>

                  <div className={`p-6 ${
                    isDarkMode ? 'bg-dark-card' : 'bg-white'
                  }`}>
                    <h3 className={`text-xl font-bold mb-4 ${
                      isDarkMode ? 'text-neon-green' : 'text-dark-bg'
                    }`}>
                      {category.name}
                    </h3>

                    <a
                      href={category.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full btn-primary text-center mb-3 hover:shadow-glow-lg"
                    >
                      📖 Get Access to Read
                    </a>

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(category)}
                        className={`flex-1 p-2 rounded-lg border-2 border-neon-green text-neon-green hover:bg-glass-effect transition-smooth flex items-center justify-center gap-2`}
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => onRemove(category.id)}
                        className={`flex-1 p-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500/10 transition-smooth flex items-center justify-center gap-2`}
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
