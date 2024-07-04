import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserInputForm from "./components/UserInputForm";
import ShufflingPage from "./components/ShufflingUsers";
import GameComponent from "./components/Game";
import NavBar from "./components/Heading";
import LeaderBoardPage from "./components/LeaderBoardPage";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/userInputForm"
            element={<UserInputForm onSubmit={(data) => console.log(data)} />}
          />
          <Route path="/shufflingPage" element={<ShufflingPage />} />
          <Route path="/game" element={<GameComponent />} />
          <Route path="/LeaderBoard" element={<LeaderBoardPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
