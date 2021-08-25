import Debug from 'debug';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { nanoid } from 'nanoid';

// setup debug namespace for file
const debug = Debug('TicTacToe:app')

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';
const app = express();
let users = [];
let games = [];
const initialGameState = [
  ['-', '-', '-'],
  ['-', '-', '-'],
  ['-', '-', '-'],
];

const server = http.createServer(app);

const socketio = new Server(server, { cors: { origin: '*' } });

app.get('/', (req, res) => {
  res.send('Welcome to Tic Tac Toe server');
});

socketio.on('connection', (socket) => {
  debug(`client connection... ${socket.id}`);

  socket.on('new-game', ({ username }) => {
    users.push({ username, clientId: socket.id });

    let gameId = nanoid();
    let newGame = {
      id: gameId,
      playerX: username,
      playerO: null,
      currentGameState: initialGameState,
      winner: null,
      nextPlayerTurn: username,
    };
    games.push(newGame);
    socket.join(gameId);
    socketio.in(gameId).emit('new-game-created', { newGame, username });
  });

  socket.on('join-game', ({ username, gameId }) => {
    users.push({ username, clientId: socket.id });

    let currentGame = games.find((game) => game.id == gameId);

    if (!currentGame.playerO) {
      currentGame.playerO = username;
      socket.join(gameId);
      socketio.to(socket.id).emit('game-joined', currentGame);
      let playerX = users.find((user) => user.username === currentGame.playerX);
      socketio.in(playerX.clientId).emit('new-player-joined', { username });
    } else if (currentGame.playerX && currentGame.playerO) {
      socketio
        .to(socket.id)
        .emit('game-full', { error: 'Max participant capacity reached' });
    }
  });

  socket.on('player-turn', ({ gameId, username, block }) => {
    debug(gameId, username, block);
    let currentGame = games.find((game) => game.id == gameId);
    let currentGameState = currentGame.currentGameState;

    currentGameState[block[0]][block[1]] =
      currentGameState[block[0]][block[1]] === '-'
        ? currentGame.playerX === username
          ? 'X'
          : 'O'
        : currentGameState[block[0]][block[1]];

    currentGame.nextPlayerTurn =
      currentGame.playerX === username
        ? currentGame.playerO
        : currentGame.playerX;

    currentGame.currentGameState = currentGameState;

    // handle winning and game-over logic
    // emit event based on above logic
    let isGameOver = false;
    let rowLength = currentGameState.length;
    let columnLength = currentGameState[0].length;

    let sumRow = '';
    let sumColumn = '';
    let sumLeftDiag = '';
    let sumRightDiag = '';
    for (let i = 0; i < rowLength; i++) {
      for (let j = 0; j < columnLength; j++) {
        sumRow = sumRow + currentGameState[i][j];
        sumColumn = sumColumn + currentGameState[j][i];
        if (i === j) {
          sumLeftDiag = sumLeftDiag + currentGameState[i][j];
        }

        if (j == rowLength - i - 1) {
          sumRightDiag = sumRightDiag + currentGameState[i][j];
        }
      }
      debug(
        `sumRow: ${sumRow}, sumColumn: ${sumColumn}, sumLeftDiag: ${sumLeftDiag}, sumRightDiag: ${sumRightDiag}`
      );
      if (
        sumRow == 'XXX' ||
        sumColumn == 'XXX' ||
        sumLeftDiag == 'XXX' ||
        sumRightDiag == 'XXX'
      ) {
        isGameOver = true;
        currentGame.winner = currentGame.playerX;
        break;
      } else if (
        sumRow == 'OOO' ||
        sumColumn == 'OOO' ||
        sumLeftDiag == 'OOO' ||
        sumRightDiag == 'OOO'
      ) {
        isGameOver = true;
        currentGame.winner = currentGame.playerO;
        break;
      }
    }

    // if game is still ongoing
    // emit event to player one or two based on whose turn it is
    debug(currentGame);
    if (!isGameOver) {
      socketio.in(gameId).emit('player-turn-over', currentGame);
    } else {
      debug('GameOver', currentGame);
      currentGame.winner = username;
      socketio.in(gameId).emit('game-over', currentGame);
    }
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => user.clientId !== socket.id);
  });
});

server.listen(port, host, () =>
  debug('Server running on port %s:%s', host, port)
);
