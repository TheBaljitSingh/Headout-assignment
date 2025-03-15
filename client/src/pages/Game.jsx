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
  //     funFact: 'The statue’s full name is "Liberty Enlightening the World".',
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
      setFeedback(null);
      setIsCorrectAnswered(false); // ✅ Reset for next question

  
    } catch (error) {
      console.error('Error fetching destination:', error);
    } finally{
      setIsLoading(false);
    }
  };
  


  const handleAnswer = async (destinationId, selectedOption) => {


      const isCorrect = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/game/answer`, {destinationId, selectedOption});


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

  const handleShare = () => {
    const shareData = {
      title: 'Globetrotter Challenge',
      text: `Hey! I scored ${score} out of ${attempts} in Globetrotter Challenge. Can you beat my score?`,
      url: `${window.location.origin}/challenge/?ref=${username}`
    };
    
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback for browsers that don't support Web Share API
      window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`);
    }
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
          <span className='text-white/70 flex'>for Correct +2, for Incorrect -1</span>

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
                onClick={() => handleAnswer(currentDestination._id, option )}
                disabled={isCorrectAnswered}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {feedback && (
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
            onClick={handleShare}
            className="btn btn-secondary"
          >
            Challenge Friends 🤝
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Game; 