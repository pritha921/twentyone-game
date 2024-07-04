import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface User {
  name: string;
  status: string;
}

interface LocationState {
  users: User[];
}

const LeaderboardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { users } = location.state as LocationState;

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="leaderboard-container">
      <h1>Game Results</h1>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default LeaderboardPage;
