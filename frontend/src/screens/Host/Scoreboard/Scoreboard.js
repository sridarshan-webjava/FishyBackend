import React, { useState, useEffect, useContext } from "react";
import FlashCard from "../../../components/Flashcard/Flashcard";
import "./Scoreboard.css";
import Icons from "../../../components/Icons/Icons";
import Scores from "../../../components/Scores/Scores";
import { SocketContext } from "../../../context/SocketContext";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

const Scoreboard = () => {
  const socket = useContext(SocketContext);
  const [show, setShow] = useState(false);
  const [scoreData, setScores] = useState([]);
  const [playerData, setPlayers] = useState([]);
  const clickHandler = () => {
    setShow(!show);
    socket.emit("set-visible");
  };

  useEffect(() => {
    socket.emit("show-scores");
    socket.emit("get-scores");
    socket.on("scores", ({ scores, players }) => {
      console.log(scores);
      setScores(scores);
      setPlayers(players);
    });
  }, [socket]);

  const clickHandler2 = () => {
    socket.emit("next-round");
    sessionStorage.removeItem("update-players");
    sessionStorage.removeItem("time");
    sessionStorage.removeItem("time-format");
    sessionStorage.removeItem("percent");
    sessionStorage.removeItem("player-option");
    sessionStorage.removeItem("timeC");
    sessionStorage.removeItem("disabled");

  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="md:w-96 xs-mobile:w-9/12">
        <FlashCard text={`Scores`} />
      </div>
      <div className="tables flex justify-center self-center xs-mobile:w-full md:w-5/6 ml-auto mr-auto overflow-y-auto">
        <div className="show-hidden-table">
          <Icons
            icon={
              show
                ? `https://ik.imagekit.io/sjbtmukew5p/Fishy_Equilibrium/eye-new.png`
                : `https://ik.imagekit.io/sjbtmukew5p/Fishy_Equilibrium/eye-off-new.png`
            }
            clickHandler={clickHandler}
          />
        </div>

        {scoreData ? (
          <Scores show={show} scores={scoreData} players={playerData} />
        ) : null}
      </div>
      <Link
        to={{
          pathname: `/round/${scoreData.length + 1}`,
          state: {
            value: { playerData },
          },
        }}
      >
        <Button
          text={"Next Round"}
          display={"bg-btn-bg-primary bg-center text-warning p-3 mt-2 btn-lg"}
          clickHandler={() => clickHandler2()}
        />
      </Link>
    </div>
  );
};

export default Scoreboard;
