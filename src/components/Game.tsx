import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface User {
  name: string;
}

interface LocationState {
  users: User[];
  winningNumber: number;
  maxInputPerTurn: number;
}

const GameComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { users, winningNumber, maxInputPerTurn } = location.state as LocationState;

  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const numbers = input.split(',').map(Number);

    if (numbers.length > maxInputPerTurn) {
      alert(`You can only enter up to ${maxInputPerTurn} numbers per turn.`);
      return;
    }

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] !== numbers[i - 1] + 1) {
        alert('Numbers must be consecutive.');
        return;
      }
    }

    if (numbers[0] !== currentNumber + 1) {
      alert(`You must start with ${currentNumber + 1}.`);
      return;
    }

    const newCurrentNumber = numbers[numbers.length - 1];
    setCurrentNumber(newCurrentNumber);

    if (newCurrentNumber >= winningNumber) {
      alert(`${users[currentPlayerIndex].name} loses!`);
      navigate('/');
      return;
    }

    setCurrentPlayerIndex((currentPlayerIndex + 1) % users.length);
    setInput('');
  };

  return (
    <div className="game-container">
      <h1>TwentyOne Game</h1>
      <p>Current Number: {currentNumber}</p>
      <p>It's {users[currentPlayerIndex].name}'s turn</p>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default GameComponent;


