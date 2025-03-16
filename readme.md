# 🌍 Globetrotter Challenge – The Ultimate Travel Guessing Game!

## Overview  
Globetrotter is a full-stack web application where users receive cryptic clues about famous destinations and must guess the correct place. Upon guessing, they unlock fun facts, trivia, and surprises!  

## ✨ Features  
- **Random Clues**: Presents 1–2 random hints about a destination.  
- **Multiple Choice**: Users select from multiple possible answers.  
- **Instant Feedback**:  
  - 🎉 **Correct Answer**: Confetti animation + fun fact reveal.  
  - 😢 **Incorrect Answer**: Sad-face animation + fun fact.  
- **Score Tracking**: Displays total user score, tracking score with No of attempts.  
- **Challenge a Friend**:  
  - Users enter a **unique username** to create a profile.  
  - Clicking ‘Challenge a Friend’ generates an **invite link** with a dynamic image.  
  - Friends can view the inviter’s score before playing.  
  - Anyone with the invitation link can play!  

---

## 📁 Project Structure  

```
Headout-Assignment/
```plaintext
Headout-Assignment/
├── client/              # Frontend (Vite React)
│   ├── public/          # Public assets
│   ├── src/             # Source files
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   │   ├── Game.jsx
│   │   │   ├── Leaderboard.jsx
│   │   ├── App.jsx      # Main App component
│   │   ├── index.jsx    # Entry point
│   ├── package.json     # Client dependencies and scripts
│   ├── vite.config.js   # Vite configuration
│
├── server/              # Backend (Node.js with Express)
│   ├── controller/      # Controllers
│   │   ├── gameController.js
│   ├── models/          # Database models
│   │   ├── Destination.js
│   │   ├── User.js
│   ├── routes/          # API routes
│   │   ├── gameRoutes.js
│   ├── test/            # Unit Tests
│   │   ├── userController.test.js
│   ├── app.js           # Express app setup
│   ├── server.js        # Server entry point
│   ├── package.json     # Server dependencies and scripts
│
```

---

## ⚙️ Installation & Setup  

### 🛠 Prerequisites  
- **Node.js** (Latest version recommended)  
- **MongoDB** (Local or Cloud Database)  

### 🚀 Clone the Repository  
```sh
git clone https://github.com/your-username/Headout-Assignment.git
cd Headout-Assignment
```

---

## 🖥 Backend (Server) Setup  

Navigate to the server directory:  
```sh
cd server
```

Install dependencies:  
```sh
npm install
```

### 🔑 Environment Variables  

Create a `.env` file inside the `server/` directory and add:  
```
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
FRONTEND_URL=http://localhost:3000
```

Start the server:  
```sh
npm start
```

---

## 🎨 Frontend (Client) Setup  

Navigate to the client directory:  
```sh
cd client
```

Install dependencies:  
```sh
npm install
```

Start the React app:  
```sh
npm start
```


---

## 🚀 Deployment  

### **Deploy Backend on Render**  
1. Push your code to **GitHub**.  
2. Go to **Render** → Create a new **Web Service**.  
3. Connect your repository.  
4. Set **Build Command**:  
   ```sh
   npm install && npm run build
   ```  
5. Set **Start Command**:  
   ```sh
   npm start
   ```  
6. Add **Environment Variables** in Render Dashboard.  
7. Deploy! 🚀  

---

## 📜 License  
This project is licensed under the MIT License.  

---

## 💡 Contributing  
Want to improve this project? Follow these steps:  
1. Fork the repository  
2. Create a new feature branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m "Add new feature"`)  
4. Push to your branch (`git push origin feature-name`)  
5. Submit a **Pull Request** 🎉  

---
