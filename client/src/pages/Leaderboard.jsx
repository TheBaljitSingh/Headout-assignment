import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Leaderboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the values from location state
  const { username, score, attempts } = location.state || {};

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/leaderboard`);
        setLeaderboardData(response.data.slice(0, 10)); // Get top 10 users
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleBackToGame = () => {
    navigate('/game', {
      state: {
        from: 'leaderboard',
        username: username,
        score: score,
        attempts: attempts
      },
      replace: true
    });
  };
  
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
      >
        <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3 mb-6">
          <span role="img" aria-label="trophy" className="text-3xl">🏆</span>
          Leaderboard
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="px-6 py-3 text-left">#</th>
                  <th className="px-6 py-3 text-left">Username</th>
                  <th className="px-6 py-3 text-left">Score</th>
                  <th className="px-6 py-3 text-left">Attempts</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((player, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <td className="px-6 py-4">
                      {index < 3 ? (
                        <span className="text-xl">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                        </span>
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">{player.username}</td>
                    <td className="px-6 py-4">{player.score}</td>
                    <td className="px-6 py-4">{player.attempts}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBackToGame}
          className="w-full mt-8 py-4 px-6 bg-white text-primary font-semibold rounded-xl hover:bg-opacity-90 transition-all duration-200"
        >
          Back to Game
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
