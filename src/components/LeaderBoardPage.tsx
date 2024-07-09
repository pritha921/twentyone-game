// import { useNavigate } from "react-router-dom";
// import { useGame } from "../models/GameContext";
// import styles from "./LeaderboardPage.module.css";

// const LeaderboardPage = () => {
//   const { users } = useGame();
//   const navigate = useNavigate();

//   return (
//     <div className={styles.leaderboardContainer}>
//       <h1>Leaderboard</h1>
//       <div className={styles.listContainer}>
//         <div className={styles.listHeader}>
//           <div className={styles.column}>Players</div>
//           <div className={styles.column}>Status</div>
//         </div>
//         {users.map((user, index) => (
//           <div key={index} className={styles.listItem}>
//             <div className={styles.column}>{user.name}</div>
//             <div className={styles.column}>{user.status}</div>
//           </div>
//         ))}
//       </div>
//       <button onClick={() => navigate("/")} className={styles.backToHome}>
//         Back to Home
//       </button>
//     </div>
//   );
// };

// export default LeaderboardPage;


import { useNavigate } from "react-router-dom";
import { useGame } from "../models/GameContext"; // Adjusted import path to match your structure
import styles from "./LeaderboardPage.module.css";

const LeaderboardPage = () => {
  const { users } = useGame();
  const navigate = useNavigate();

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
            <div className={styles.column}>{user.status || "Playing"}</div> {/* Default to "Playing" if no status */}
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
