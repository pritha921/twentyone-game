import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface User {
  name: string;
}

interface LocationState {
  users: User[];
  winningNumber: number;
  maxInputPerTurn: number;
}

const ShufflingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { users, winningNumber, maxInputPerTurn } = location.state as LocationState;
  const [shuffledUsers, setShuffledUsers] = useState<User[]>([]);

  const shuffleArray = (array: User[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  useEffect(() => {
    setShuffledUsers(shuffleArray(users));
  }, [users]);

  const startGame = () => {
    navigate('/game', { state: { users: shuffledUsers, winningNumber, maxInputPerTurn } });
  };

  return (
    <div>
      <h1>TwentyOne Game</h1>
      <h3>Let's Decide the order of playing</h3>
      <ul>
        {shuffledUsers.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
      <button onClick={startGame}>Play now</button>
    </div>
  );
};

export default ShufflingPage;

