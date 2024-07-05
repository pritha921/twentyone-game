import { useLocation, useNavigate } from "react-router-dom";
import styles from "./LeaderboardPage.module.css";

interface User {
  name: string;
  status: string;
}

const LeaderboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { users } = location.state as { users: User[] };

  return (
    <div className={styles.leaderboardContainer}>
      <h1>Leaderboard</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index} className={styles.user}>
            {user.name} - {user.status}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")} className={styles.homeButton}>
        Back to Home
      </button>
    </div>
  );
};

export default LeaderboardPage;
