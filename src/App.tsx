import "./index.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserInputForm from './components/UserInputForm';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/userinputForm" element={<UserInputForm />} />
      </Routes>
    </Router>
  );
};


export default App
