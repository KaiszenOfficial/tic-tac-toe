import { useEffect, useState } from 'react';
import './App.css';
import { GamePage, LandingPage } from './pages';
import io from 'socket.io-client';
import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#61afef',
    },
    secondary: {
      main: '#282c34'
    },
    success: {
      main: '#98c379'
    },
    text: {
      main: '#282c34',
      secondary: "#abb2bf"
    }
  },
  typography: {
    fontFamily: ['"Baloo Chettan 2"', 'cursive'].join(','),
    h4: {
      fontWeight: 'bold'
    },
    h6: {
      fontWeight: 'bold'
    }
  },
});

const initialState = {
  id: null,
  playerX: null,
  playerO: null,
  currentGameState: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  winner: null,
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentGame, setCurrentGame] = useState(initialState);
  const [isGameOver, setIsGameOver] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('new-game-created', ({ newGame, username }) => {
      setUsername(username);
      setCurrentGame(newGame);
      setIsLoggedIn(true);
      // newSocket.emit("join-game", { username, gameId: newGame.id });
    });

    newSocket.on('game-joined', (currentGame) => {
      setUsername(currentGame.playerO);
      setCurrentGame(currentGame);
      setIsLoggedIn(true);
    });

    newSocket.on('new-player-joined', ({ username, currentGame }) => {
      alert(`New player ${username} has joined`);
      setCurrentGame(currentGame);
    });

    newSocket.on('player-turn-over', (currentGame) => {
      setCurrentGame(currentGame);
    });

    newSocket.on('game-over', (currentGame) => {
      setCurrentGame(currentGame);
      setIsGameOver(true);
    });

    return () => newSocket.close();
  }, [setSocket]);

  return socket ? (
    !isLoggedIn ? (
      <ThemeProvider theme={theme}>
        <LandingPage socket={socket} />
      </ThemeProvider>
    ) : (
      <ThemeProvider theme={theme}>
        <GamePage
          socket={socket}
          username={username}
          currentGame={currentGame}
          isGameOver={isGameOver}
        />
      </ThemeProvider>
    )
  ) : null;
}

export default App;
