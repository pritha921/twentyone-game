import { Link } from "react-router-dom";
import "./HomePageStyling.css";
import "../index.css";
const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "8vh",
      }}
    >
      <h1>TwentyOne Game!!</h1>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "30px", padding: "30px 25px 30px 25px" }}>
          21, Bagram, or Twenty plus one is a game which progresses by counting
          up 1 to 21, with the player who calls “21” is eliminated. It can be
          played between any number of players. Implementation This is a simple
          21 number game using Python programming language. The game illustrated
          here is between the player and the computer. There can be many
          variations in the game. The player can choose to start first or
          second. The list of numbers is shown before the Player takes his turn
          so that it becomes convenient. If consecutive numbers are not given in
          input then the player is automatically disqualified. The player loses
          if he gets the chance to call 21 and wins otherwise.
        </p>
      </div>
      <Link to="/userinput">
        <button className="letsGoButton" role="button">
          Let's Go
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
