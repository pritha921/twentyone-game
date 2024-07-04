// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import styles from "./GameStyling.module.css";

// interface User {
//   name: string;
// }

// interface LocationState {
//   users: User[];
//   winningNumber: number;
//   maxInputPerTurn: number;
// }

// const GameComponent = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { users: initialUsers, winningNumber, maxInputPerTurn } =
//     location.state as LocationState;

//   const [users, setUsers] = useState(initialUsers);
//   const [currentNumber, setCurrentNumber] = useState(0);
//   const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
//   const [input, setInput] = useState("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };

//   const handleSubmit = () => {
//     const numbers = input.split(",").map(Number);

//     if (numbers.length > maxInputPerTurn) {
//       alert(`You can only enter up to ${maxInputPerTurn} numbers per turn.`);
//       return;
//     }

//     for (let i = 1; i < numbers.length; i++) {
//       if (numbers[i] !== numbers[i - 1] + 1) {
//         alert("Numbers must be consecutive.");
//         return;
//       }
//     }

//     if (numbers[0] !== currentNumber + 1) {
//       alert(`You must start with ${currentNumber + 1}.`);
//       return;
//     }

//     const newCurrentNumber = numbers[numbers.length - 1];
//     setCurrentNumber(newCurrentNumber);

//     if (newCurrentNumber >= winningNumber) {
//       alert(`${users[currentPlayerIndex].name} loses!`);

//       const remainingUsers = users.filter((_, index) => index !== currentPlayerIndex);

//       if (remainingUsers.length > 1) {
//         if (window.confirm("Do you want to continue with the remaining players?")) {
//           setUsers(remainingUsers);
//           setCurrentNumber(0);
//           setCurrentPlayerIndex(0);
//           setInput("");
//         } else {
//           navigate("/");
//         }
//       } else {
//         navigate("/");
//       }
//       return;
//     }

//     setCurrentPlayerIndex((currentPlayerIndex + 1) % users.length);
//     setInput("");
//   };

//   const handleRestart = () => {
//     navigate("/userInputForm");
//   };

//   const handleBackToHome = () => {
//     navigate("/");
//   };

//   return (
//     <div className={styles.gameContainer}>
//       <div className={styles.fullWidth}>
//         <p className={styles.winningNumber}>Winning number: {winningNumber}</p>
//         <p className={styles.currentNumber}>Current Number: {currentNumber}</p>
//       </div>
//       <div className={styles.fullWidth}>
//         <p style={{ fontSize: '1.5em' }}>It's {users[currentPlayerIndex].name}'s turn</p>
//         <input type="text" value={input} onChange={handleInputChange} />
//         <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
//         <p>Users must separate the numbers using commas.</p>
//       </div>
//       <div className={`${styles.fullWidth} ${styles.bottomBar}`}>
//         <div>
//           <button onClick={handleRestart} className={styles.submitButton}>Restart</button>
//           <button onClick={handleBackToHome} className={styles.submitButton}>Back to Home</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameComponent;


import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./GameStyling.module.css";

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
  const { users, winningNumber, maxInputPerTurn } =
    location.state as LocationState;

  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const numbers = input.split(",").map(Number);

    if (numbers.length > maxInputPerTurn) {
      alert(`You can only enter up to ${maxInputPerTurn} numbers per turn.`);
      return;
    }

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] !== numbers[i - 1] + 1) {
        alert("Numbers must be consecutive.");
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
      if (users.length > 2) {
        const remainingUsers = users.filter((_, index) => index !== currentPlayerIndex);
        if (remainingUsers.length > 1) {
          const continueGame = window.confirm("Do you want to continue with the remaining players?");
          if (continueGame) {
            setCurrentNumber(0);
            navigate("/game", {
              state: { users: remainingUsers, winningNumber, maxInputPerTurn },
            });
            return;
          }
        }
      }
      navigate("/leaderboard", {
        state: {
          users: users.map((user, index) => ({
            name: user.name,
            status: index === currentPlayerIndex ? "Lost" : "Won",
          })),
        },
      });
      return;
    }

    setCurrentPlayerIndex((currentPlayerIndex + 1) % users.length);
    setInput("");
  };

  const handleRestart = () => {
    navigate("/userInputForm");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.fullWidth}>
        <p className={styles.winningNumber}>Winning number:{winningNumber} </p>
        <p className={styles.currentNumber}>Current Number: {currentNumber}</p>
      </div>
      <div className={styles.fullWidth}>
        <p style={{ 'fontSize': '1.5em' }}>It's {users[currentPlayerIndex].name}'s turn</p>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
        <p>Users must separate the numbers using comma.</p>
      </div>
      <div className={`${styles.fullWidth} ${styles.bottomBar}`}>
        <div>
          <button onClick={handleRestart} className={styles.submitButton}>Restart</button>
          <button onClick={handleBackToHome} className={styles.submitButton}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default GameComponent;
