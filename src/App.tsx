import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserInputForm from "./components/UserInputForm";
import ShufflingPage from "./components/ShufflingUsers";
import GameComponent from "./components/Game";
import NavBar from "./components/Heading";
import LeaderBoardPage from "./components/LeaderBoardPage";
import { GameProvider } from "./models/GameContext";

const App = () => {
  return (
    <GameProvider>
      <Router>
        <div>
          <NavBar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-input-form" element={<UserInputForm />} />
            <Route path="/shuffle-users" element={<ShufflingPage />} />
            <Route path="/game" element={<GameComponent />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
};

export default App;
