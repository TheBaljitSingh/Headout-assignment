import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Game = React.lazy(() => import('./pages/Game'));
const Challenge = React.lazy(() => import('./pages/Challenge'));

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <React.Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-bounce-slow text-4xl">🌍</div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/challenge/:username" element={<Challenge />} />
          </Routes>
        </React.Suspense>
      </AnimatePresence>
    </Router>
  );
}

export default App;
