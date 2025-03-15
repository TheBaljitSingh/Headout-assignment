import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import Home from './pages/Home';
import Game from './pages/Game';
import Challenge from './pages/Challenge';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/challenge/:username" element={<Challenge />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
