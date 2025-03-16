import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import Home from './pages/Home';
import Game from './pages/Game';
import Challenge from './pages/Challenge';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
