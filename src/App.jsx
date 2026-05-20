import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Location from './components/Location';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';

import { Toaster } from 'react-hot-toast';
import Chatbot from './components/Chatbot';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [loading, setLoading] = useState(true);

  // Initialize dark mode from localStorage
  useEffect(() => {
    // Already initialized in useState
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: 'dark:bg-zinc-900 dark:text-white bg-white text-black border border-zinc-200 dark:border-zinc-800 rounded-2xl font-semibold',
          style: {
            borderRadius: '1rem',
            background: darkMode ? '#18181b' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e4e4e7',
          }
        }} 
      />
      <ScrollProgress />
      <ScrollToTop />
      <Chatbot />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Certificates />
        <Contact />
        <Location />
      </main>
      <Footer />
    </div>
  );
}

export default App;
