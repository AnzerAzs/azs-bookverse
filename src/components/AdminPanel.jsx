import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function AdminPanel({ onAddCategory, isDarkMode }) {
  const [form, setForm] = useState({ name: '', image: '', link: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Category name is required';
    if (!form.image.trim()) newErrors.image = 'Image URL is required';
    if (!form.link.trim()) newErrors.link = 'Google Drive link is required';
    if (form.link && !form.link.startsWith('http')) newErrors.link = 'Link must start with http';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddCategory(form);
    setForm({ name: '', image: '', link: '' });
    setErrors({});
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className={`py-8 px-4 border-b-2 ${
      isDarkMode ? 'bg-dark-card border-neon-green/30' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
          isDarkMode ? 'text-neon-green' : 'text-dark-bg'
        }`}>
          ⚙️ Admin Panel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Name Input */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Category Name
              </label>
              <input
                type="text"
                placeholder="e.g., Science"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-smooth ${
                  errors.name
                    ? isDarkMode
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-red-500 bg-red-50'
                    : isDarkMode
                      ? 'border-neon-green/30 bg-dark-bg text-white focus:border-neon-green'
                      : 'border-gray-300 bg-white text-dark-bg focus:border-neon-dark'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Image URL Input */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Image URL
              </label>
              <input
                type="text"
                placeholder="https://..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-smooth ${
                  errors.image
                    ? isDarkMode
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-red-500 bg-red-50'
                    : isDarkMode
                      ? 'border-neon-green/30 bg-dark-bg text-white focus:border-neon-green'
                      : 'border-gray-300 bg-white text-dark-bg focus:border-neon-dark'
                }`}
              />
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            </div>

            {/* Google Drive Link Input */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Google Drive Link
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/..."
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border-2 outline-none transition-smooth ${
                  errors.link
                    ? isDarkMode
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-red-500 bg-red-50'
                    : isDarkMode
                      ? 'border-neon-green/30 bg-dark-bg text-white focus:border-neon-green'
                      : 'border-gray-300 bg-white text-dark-bg focus:border-neon-dark'
                }`}
              />
              {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2 hover:shadow-glow-lg"
              >
                <Plus size={20} /> Add Category
              </button>
            </div>
          </div>
        </form>

        {/* Success Message */}
        {success && (
          <div className="mt-4 p-4 rounded-lg bg-green-500/20 border border-green-500 text-green-300 flex items-center gap-2">
            <span>✓</span> Category added successfully!
          </div>
        )}

        {/* Info Message */}
        <div className={`mt-4 p-4 rounded-lg ${
          isDarkMode ? 'bg-blue-500/10 border border-blue-500 text-blue-300' : 'bg-blue-50 border border-blue-200 text-blue-600'
        }`}>
          💡 <strong>Tip:</strong> All categories are saved automatically to your browser's local storage.
        </div>
      </div>
    </section>
  );
}
