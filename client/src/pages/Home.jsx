import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



const Home = () => {

  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate('/game', { state: { username } });
    }
  };


  
  return (



    <div className="container mx-auto px-4">

     

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <h1 className="title">
          <span role="img" aria-label="globe" className="text-3xl">🌍</span>
          Globetrotter Challenge
        </h1>
        <p className="subtitle">
          The Ultimate Travel Guessing Game!
        </p>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleStart}
          className="form-container"
        >
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full"
          />
          <button type="submit" className="btn btn-primary">
            Start Adventure 🎯
          </button>
        </motion.form>
      </motion.div>
 
   </div>
  );
};

export default Home;
