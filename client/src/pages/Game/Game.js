import React from "react";
import { BlockComponent } from "../../components";
import "./Game.css";

export default function Game({ socket, username, currentGame, isGameOver }) {
  console.log(username, currentGame)
  const handleBlockClick = (e, indexMap) => {
    if(e.target.innerHTML === "-" && currentGame.nextPlayerTurn === username && !isGameOver) {
      socket.emit("player-turn", { gameId: currentGame.id, username, block: indexMap })
    }
  }

  return (
    <>
    <div style={{ display: "flex", justifyContent: "space-evenly", padding: "10px 30px"}}>
      <h3 style={{ color: currentGame.nextPlayerTurn === currentGame.playerX ? "#61dafb" : "#ffffff" }}>PlayerX: {currentGame.playerX}</h3>
      <h3>GameID: {currentGame.id}</h3>
      <h3 style={{ color: currentGame.nextPlayerTurn === currentGame.playerO ? "#61dafb" : "#ffffff" }}>PlayerO: {currentGame.playerO}</h3>
    </div>

    {isGameOver ? <div style={{ display: "flex", justifyContent: "center", padding: "10px 30px"}}>
      <h2>GAME OVER! Winner is {currentGame.winner}</h2>
    </div> : null}
    
    <div className="game-container">
      {currentGame.currentGameState.map((gameState, index) =>
        gameState.map((state, nestedIndex) => (
          <BlockComponent
            key={nestedIndex}
            gameState={state}
            indexMap={[index, nestedIndex]}
            handleOnClick={handleBlockClick}
          />
        ))
      )}
    </div>
    </>
  );
}
