import  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface User {
  name: string;
}

interface LocationState {
  users: User[];
}

const ShufflingPage = () => {
  const location = useLocation();
  const { users } = location.state as LocationState;
  const [shuffledUsers, setShuffledUsers] = useState<User[]>([]);

  // Function to shuffle an array
  const shuffleArray = (array: User[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  // Shuffle users when component mounts
  useEffect(() => {
    setShuffledUsers(shuffleArray(users));
  }, [users]);

  return (
    <div>
      <h1>TwentyOne Game</h1>
      <h3>Let's Decide the order of playing</h3>
      <ul>
        {shuffledUsers.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
      <div>
        <button>Play now</button>
      </div>
    </div>
  );
};

export default ShufflingPage;
