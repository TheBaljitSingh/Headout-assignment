import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  // const dummyDestinations = [
  //   {
  //     name: 'Eiffel Tower',
  //     clue: 'This famous landmark is known as the "Iron Lady" of France.',
  //     funFact: 'The Eiffel Tower can be 15 cm taller in the summer due to heat expansion!',
  //     options: ['Eiffel Tower', 'Statue of Liberty', 'Big Ben', 'Sydney Opera House']
  //   },
  //   {
  //     name: 'Great Wall of China',
  //     clue: 'This structure is visible from space and stretches over 13,000 miles!',
  //     funFact: 'Contrary to popular belief, it is not fully visible from space without aid.',
  //     options: ['Great Wall of China', 'Machu Picchu', 'Colosseum', 'Taj Mahal']
  //   },
  //   {
  //     name: 'Statue of Liberty',
  //     clue: 'A symbol of freedom gifted by France to the USA.',
  //     funFact: 'The statue's full name is "Liberty Enlightening the World".',
  //     options: ['Statue of Liberty', 'Christ the Redeemer', 'Eiffel Tower', 'Mount Rushmore']
  //   }
  // ];



  const [currentDestination, setCurrentDestination] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isCorrectAnswered, setIsCorrectAnswered] = useState(false); // Track correct answer
  const [showClue, setShowClue] = useState(false);


  const [currentClue, setCurrentClue] = useState('');


  
  useEffect(() => {
    if (!username) {
      navigate('/');
    }
    fetchNewDestination();
  }, [username, navigate]);


  const fetchNewDestination = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/game/random`);
      const newDestination = response.data.destination; // Single question response
     
  
      // Update state with the new question
      
      setCurrentDestination(newDestination);
      setOptions(newDestination.options);
      setCurrentClue(newDestination.clue);
      setFeedback(null);
      setIsCorrectAnswered(false); // ✅ Reset for next question

  
    } catch (error) {
      console.error('Error fetching destination:', error);
    } finally{
      setIsLoading(false);
    }
  };
  


  const handleAnswer = async (destinationId, selectedOption) => {

    setAttempts(prev => prev+1);


      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/game/answer`, {destinationId, selectedOption});
      const isCorrect = response.data.isCorrect;


    // const isCorrect = selectedOption === currentDestination.name;
    setAttempts(prev => prev + 1);
    
    if (isCorrect) {
      setScore(prev => prev + 2);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      setFeedback({
        type: 'success',
        message: '🎉 Correct! ' + currentDestination.funFact
      });
      setIsCorrectAnswered(true);
    } else {
      setScore(prev =>prev-1);
      setFeedback({
        type: 'error',
        message: '😢 Not quite! ' + currentDestination.funFact
      });
    }
  };

  const handleShare = async (username, score, attempts) => {
    try {
      // Step 1: Check if the user is already registered
      // const checkResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/check/${username}`);
      
      // Step 2: Register the user if not already registered
      const registeredUser = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/register`, { username, score, attempts });
      
        
          // Step 3: Generate the shareable link
          const shareUrl = `${window.location.origin}/challenge/?ref=${username}`;
          const shareText = `Hey! I scored ${score} out of ${attempts} in Globetrotter Challenge. Can you beat my score?`;
          
          const shareData = {
            title: 'Globetrotter Challenge',
            text: shareText,
            url: shareUrl
          };
          
          // Step 4: Share using Web Share API if available, else use WhatsApp fallback
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
          }
          
    } catch (error) {
      console.error('Error sharing:', error.response?.data || error.message);
    }
  };

  const handleViewLeaderboard = () => {
    navigate('/leaderboard', { 
      state: { 
        from: 'game',
        // You can also pass any game state you want to preserve
      } 
    });
  };

  if (!currentDestination) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {showConfetti && <Confetti />}
      
      <div className="page-container">
        <div className="flex justify-between items-center mb-8">
          <div className="glass px-4 py-2 rounded-lg">
            <span className="text-white/70">Player:</span>
            <span className="ml-2 text-white font-semibold">{username}</span>
          </div>
          
          <div className='glass'>
          <span className='text-white/70 flex'>for Correct answer +2 and for Incorrect -1</span>

          </div>
          
        </div>

        <motion.div
          layout
          className="card hover-lift mb-8"
        >
          <div className="glass px-4 py-2 rounded-lg ml-12">
            <span className="text-white/70">Score:</span>
            <span className="ml-2 text-white font-semibold">{score} with {attempts} attempts</span>
          </div>
          <h2 className="heading-secondary">🤔 Guess the Destination</h2>
          <p className="text-lg mb-6 text-white/90">{currentDestination.clue}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-secondary  "
                onClick={() => handleAnswer(currentDestination._id,  option)}
                disabled={isCorrectAnswered}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {feedback?.message && (
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`card mb-8 ${
                feedback.type === 'success' 
                  ? 'bg-green-500/20' 
                  : 'bg-red-500/20'
              }`}
            >
              <p className="text-lg text-white">{feedback.message}</p>
            </motion.div>
          )}
        </AnimatePresence>


        <div className="mt-6">
            <button
              onClick={() => setShowClue(!showClue)}
              className="btn btn-secondary mb-4"
            >
              {showClue ? '🎯 Hide Clue' : '💡 Show Clue'}
            </button>

            {/* Clue Display */}
            {showClue && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
              >
                <p className="text-white/90 text-sm">
                  <span className="font-semibold text-white">Clue:</span> {currentClue}
                </p>
              </motion.div>
            )}
          </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={fetchNewDestination}
          className="btn btn-primary w-full"
        >
          Next Destination 🌟
        </motion.button>

        <div className="flex justify-between mt-8">
          <button
            onClick={()=>handleShare(username, score,attempts)}
            className="btn btn-secondary"
          >
            Challenge Friends 🤝
          </button>
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handleViewLeaderboard}
            className="btn btn-secondary"
          >
            Leaderboard 🥇
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Game; 