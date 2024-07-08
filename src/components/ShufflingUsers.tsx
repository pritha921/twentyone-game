import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useGame } from '../models/GameContext'
import styles from "./ShufflingUsers.module.css";

const ShufflingPage = () => {
  const { users, winningNumber, maxInputPerTurn, setGameData } = useGame();
  const navigate = useNavigate();
  const [shuffledUsers, setShuffledUsers] = useState(users);

  const shuffleArray = (array: typeof users) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  useEffect(() => {
    setShuffledUsers(shuffleArray(users));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const startGame = () => {
    setGameData({
      users: shuffledUsers,
      winningNumber,
      maxInputPerTurn,
      setGameData,
    });
    navigate("/game");
  };

  return (
    <div className={styles.pageContainer}>
      <h3 className={styles.headingContainer}>Let's Decide the Order of Playing</h3>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#FEFFD2", padding: "20px" }}>
        {shuffledUsers.map((user, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={user.name} src="/static/images/avatar/default.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontFamily: "Chakra Petch, sans-serif", fontSize: "1.5rem" }}
                  >
                    {user.name}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{
                        fontFamily: "Chakra Petch, sans-serif",
                        display: "inline",
                        fontSize: "1rem",
                      }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Player {index + 1}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < shuffledUsers.length - 1 && <Divider variant="inset" component="li" />}
          </div>
        ))}
      </List>
      <button onClick={startGame} style={{ marginTop: "20px" }} className={styles.playNow}>
        Play now
      </button>
    </div>
  );
};

export default ShufflingPage;
