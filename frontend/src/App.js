import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout components
import Header from './components/portfolio/Header';
import Footer from './components/portfolio/Footer';
import EasterEggs from './components/portfolio/EasterEggs';

// Pages
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import { BlogListPage, BlogPostPage } from './pages/BlogPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="App min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <EasterEggs>
          {({ onEasterEggFound }) => (
            <>
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              <Routes>
                <Route path="/" element={<HomePage onEasterEggFound={onEasterEggFound} />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
              <Footer />
            </>
          )}
        </EasterEggs>
      </BrowserRouter>
    </div>
  );
}

export default App;
