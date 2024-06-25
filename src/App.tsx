import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserInput from "./components/UserInput";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userinput" element={<UserInput />} />
      </Routes>
    </Router>
  );
};

export default App;
