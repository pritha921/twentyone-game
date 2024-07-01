import { Link } from "react-router-dom";
import "./HomePageStyling.css";
import "../index.css";
const HomePage = () => {
  return (
    <div className="homepage-container">
      <div style={{ textAlign: "center" }}>
        <p className="description-container">
          Welcome to the ultimate showdown of wits and strategy—**BAGRAM GAME**!
          Here, you and your friends will face off in a thrilling race to reach
          a number of your choosing. Ready for the challenge? You get to set the
          winning number, decide how many players are in the game, and even
          choose how many numbers each player can enter per turn. Once you’ve
          got everything set up, players will take turns entering consecutive
          numbers, aiming to hit the magic number before their opponents. Be
          careful, though! If someone crosses the winning number on their turn,
          it’s game over for them! So gear up, get your game face on, and let
          the number-crunching fun begin!
        </p>
      </div>
      <Link to="/userInputForm">
        <button className="letsGoButton" role="button">
          Let's Go
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
