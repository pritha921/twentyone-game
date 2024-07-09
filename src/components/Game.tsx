import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../models/GameContext";
import styles from "./GameStyling.module.css";

const GameComponent = () => {
  const { users, winningNumber, maxInputPerTurn, setGameData, addHistory } = useGame();
  const navigate = useNavigate();

  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [input, setInput] = useState("");
  const [allUsers, setAllUsers] = useState(users);

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

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

    addHistory(users[currentPlayerIndex].name, numbers);

    if (newCurrentNumber >= winningNumber) {
      alert(`${users[currentPlayerIndex].name} loses!`);

      const updatedUsers = allUsers.map((user, index) =>
        index === currentPlayerIndex ? { ...user, status: "Lost" } : user
      );

      const remainingUsers = updatedUsers.filter((user) => !user.status);

      if (remainingUsers.length === 1) {
        const finalUsers = updatedUsers.map((user) =>
          !user.status ? { ...user, status: "Won" } : user
        );
        setGameData({ users: finalUsers });
        navigate("/leaderboard");
        return;
      } else if (remainingUsers.length > 1) {
        const continueGame = window.confirm(
          "Do you want to continue with the remaining players?"
        );

        if (continueGame) {
          setAllUsers(updatedUsers);
          setCurrentNumber(0);
          setInput("");
          setCurrentPlayerIndex(0);
          return;
        } else {
          const finalUsers = updatedUsers.map((user) =>
            !user.status ? { ...user, status: "Won" } : user
          );
          setGameData({ users: finalUsers });
          navigate("/leaderboard");
          return;
        }
      }
    }

    const remainingPlayers = allUsers.filter((user) => !user.status);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % remainingPlayers.length);
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
        <p className={styles.winningNumber}>Winning number: {winningNumber} </p>
        <p className={styles.currentNumber}>Current Number: {currentNumber}</p>
      </div>
      <div className={styles.fullWidth}>
        <p style={{ fontSize: "1.5em" }}>
          It's {allUsers[currentPlayerIndex].name}'s turn
        </p>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
        <p>Users must separate the numbers using comma.</p>
      </div>
      {/* <div className={styles.history}>
        <h3>History</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              {entry.player} - {entry.inputs.join(", ")}
            </li>
          ))}
        </ul>
      </div> */}
      <div className={`${styles.fullWidth} ${styles.bottomBar}`}>
        <div>
          <button onClick={handleRestart} className={styles.submitButton}>
            Restart
          </button>
          <button onClick={handleBackToHome} className={styles.submitButton}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameComponent;

