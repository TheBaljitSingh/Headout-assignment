import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Game from './pages/Game';
import Challenge from './pages/Challenge';
import Leaderboard from './pages/Leaderboard';


const Loader = ()=>{
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500 flex justify-center items-center">
      <span className="absolute text-center">wait until server is ready</span>
    </div>
  </div>
  
  );
};



function App() {

  const [isServerReady, setIsServerReady] = useState(false);

  useEffect(()=>{
       const checkServerStatus = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/server-status`); 
            const data = await response.json();
            
            if (data.status === 'ready') {
              setIsServerReady(true);
            } else {
              console.error('Server is not ready');
            }
          } catch (error) {
            console.error('Error checking server status:', error);
          }
        };
    
        checkServerStatus();
  }, [])

  if(!isServerReady){
    return <Loader/>;
  }

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
