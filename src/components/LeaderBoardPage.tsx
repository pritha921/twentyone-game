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
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <div className={styles.column}>Players</div>
          <div className={styles.column}>Status</div>
        </div>
        {users.map((user, index) => (
          <div key={index} className={styles.listItem}>
            <div className={styles.column}>{user.name}</div>
            <div className={styles.column}>{user.status}</div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")} className={styles.backToHome}>
        Back to Home
      </button>
    </div>
  );
};

export default LeaderboardPage;

