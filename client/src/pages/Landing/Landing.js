import React, { useState } from "react";
import {
  ButtonComponent,
  InputComponent,
  ModalComponent,
} from "../../components";
import logo from "../../logo.svg";

export default function Landing({ socket }) {

  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [showJoinGameModal, setShowJoinGameModal] = useState(false);
  
  const [username, setUsername] = useState("");
  const [gameId, setGameId] = useState("");

  const handleNewGameModalClose = () => {
    setShowNewGameModal(false);
    setUsername("");
    setGameId("");
  }

  const handleJoinGameModalClose = () => {
    setShowJoinGameModal(false);
    setUsername("");
    setGameId("");
  }

  const handleNewGameModalSave = () => {
    socket.emit("new-game", { username });
  }

  const handleJoinGameModalSave = () => {
    socket.emit("join-game", { username, gameId });
  }

  return (
    <>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Tic Tac Toe</h2>
        <div className="login-block">
          <ButtonComponent
            style={{ marginBottom: "1.5rem" }}
            handleOnClick={() => setShowNewGameModal(true)}
          >
            New Game
          </ButtonComponent>
          <ButtonComponent handleOnClick={() => setShowJoinGameModal(true)}>
            Join Game
          </ButtonComponent>
        </div>
      </div>
      <ModalComponent
        show={showNewGameModal}
        handleSave={handleNewGameModalSave}
        handleClose={handleNewGameModalClose}
      >
        <InputComponent
          type="text"
          style={{ marginBottom: "1.5rem", width: "50%" }}
          value={username}
          placeholder="Enter an username..."
          handleOnChange={(e) => setUsername(e.target.value)}
        />
      </ModalComponent>
      <ModalComponent
        show={showJoinGameModal}
        handleSave={handleJoinGameModalSave}
        handleClose={handleJoinGameModalClose}
      >
        <InputComponent
          type="text"
          style={{ marginBottom: "1.5rem", width: "50%" }}
          value={username}
          placeholder="Enter an username..."
          handleOnChange={(e) => setUsername(e.target.value)}
        />

        <InputComponent
          type="text"
          style={{ marginBottom: "1.5rem", width: "50%" }}
          value={gameId}
          placeholder="Enter a GameID..."
          handleOnChange={(e) => setGameId(e.target.value)}
        />
      </ModalComponent>
    </>
  );
}
