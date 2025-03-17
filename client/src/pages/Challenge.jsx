import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from "axios"

const Challenge = () => {
  const location = useLocation();
  const queryParmas = new URLSearchParams(location.search);
  const referrer = queryParmas.get('ref');

  const navigate = useNavigate();
  const [challengerScore, setChallengerScore] = useState(null);
  const [challengerAttempts, setChallengerAttempts] = useState(null);

  const [playerName, setPlayerName] = useState('');

  console.log(referrer);

  useEffect(() => {
    const fetchChallengerScore = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/getUserDetails/?username=${referrer}`);
        
        // console.log(response.data?.user?.score);
        setChallengerScore(response?.data?.user?.score);
        setChallengerAttempts(response?.data?.user?.attempts);

      } catch (error) {
        console.error('Error fetching challenger score:', error);
      }
    };

    fetchChallengerScore();
  }, [referrer]);

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/game', { state: { username: playerName } });
    }
    
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary to-secondary"
    >
      <div className="text-center">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-white mb-6"
        >
          🎯 Challenge Accepted!
        </motion.h1>

        {challengerScore && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 rounded-lg p-4 mb-8 text-white"
          >
            <p className="text-xl mb-2">
              {referrer}'s Score
            </p>
            <p className="text-3xl font-bold">
            Scored {challengerScore} in {challengerAttempts} Attempts
            </p>
          </motion.div>
        )}

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-white/90 mb-8"
        >
          Think you can beat it? Let's find out!
        </motion.p>

        <motion.form
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onSubmit={handleStart}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="px-4 py-2 rounded-lg text-lg w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <button
            type="submit"
            className="btn btn-primary bg-accent hover:bg-accent/90 text-lg px-8 py-3"
          >
            Start Challenge 🚀
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Challenge; 