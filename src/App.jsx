import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdSlot from './components/AdSlot';
import CategoryGrid from './components/CategoryGrid';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

export default function App() {
  const defaultCategories = [
    {
      id: 1,
      name: 'Quranic Technologies',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 2,
      name: 'Quran',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 3,
      name: 'Tafseer',
      image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      id: 4,
      name: 'Hadith',
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 5,
      name: 'Fiqh',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      id: 6,
      name: 'Seerah',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 7,
      name: 'History',
      image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 8,
      name: 'Urdu Literature',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 9,
      name: 'Business',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-rose-500 to-orange-500',
    },
    {
      id: 10,
      name: 'Fiction',
      image: 'https://images.unsplash.com/photo-1507842357343-583f30343343?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-orange-500 to-amber-500',
    },
    {
      id: 11,
      name: 'Mysteries',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      id: 12,
      name: 'Psychology',
      image: 'https://images.unsplash.com/photo-1500930855697-b586d89ba3ee?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-yellow-500 to-lime-500',
    },
    {
      id: 13,
      name: 'Science',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop',
      link: 'https://drive.google.com/drive/folders/1example',
      color: 'from-lime-500 to-green-500',
    },
  ];

  const [categories, setCategories] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('azs-bookverse-categories');
    if (saved) {
      try {
        setCategories(JSON.parse(saved));
      } catch {
        setCategories(defaultCategories);
      }
    } else {
      setCategories(defaultCategories);
    }
  }, []);

  // Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem('azs-bookverse-categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (newCategory) => {
    const category = {
      ...newCategory,
      id: Date.now(),
      color: 'from-emerald-500 to-teal-500',
    };
    setCategories([...categories, category]);
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories(
      categories.map((cat) => (cat.id === id ? { ...cat, ...updatedCategory } : cat))
    );
  };

  const removeCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={isDarkMode ? 'bg-dark-bg' : 'bg-white'}>
      <Navbar
        onAdminClick={() => setShowAdmin(!showAdmin)}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        isDarkMode={isDarkMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {showAdmin && (
        <AdminPanel onAddCategory={addCategory} isDarkMode={isDarkMode} />
      )}

      <Hero isDarkMode={isDarkMode} />

      <AdSlot position="top" isDarkMode={isDarkMode} />

      <CategoryGrid
        categories={filteredCategories}
        onRemove={removeCategory}
        onUpdate={updateCategory}
        isDarkMode={isDarkMode}
      />

      <AdSlot position="bottom" isDarkMode={isDarkMode} />

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
