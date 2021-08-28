import Debug from 'debug';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { nanoid } from 'nanoid';

// setup debug namespace for file
const debug = Debug('TicTacToe:app');

const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';
const app = express();
let users = [];
let games = [];
const initialGameState = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
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
      // emit to joining player that he has joined the game
      socketio.to(socket.id).emit('game-joined', currentGame);
      // find the other player clientId and send an event notifying that another player has joined
      let playerX = users.find((user) => user.username === currentGame.playerX);
      socketio.to(playerX.clientId).emit('new-player-joined', { username, currentGame });
    } else if (currentGame.playerX && currentGame.playerO) {
      // emit this event only when game is full
      socketio
        .to(socket.id)
        .emit('game-full', { error: 'Max participant capacity reached' });
    }
  });

  socket.on('player-turn', ({ gameId, username, block }) => {
    debug(gameId, username, block);
    // fetch currentGame based on gameId supplied
    let currentGame = games.find((game) => game.id == gameId);
    // assign currentGameState with currentGame's currentGameState
    let currentGameState = currentGame.currentGameState;

    // assign block based on which player turn it is currently
    currentGameState[block[0]][block[1]] =
      currentGameState[block[0]][block[1]] === ''
        ? currentGame.playerX === username
          ? 'X'
          : 'O'
        : currentGameState[block[0]][block[1]];

    // assign nextPlayerTurn based on currentPlayer
    currentGame.nextPlayerTurn =
      currentGame.playerX === username
        ? currentGame.playerO
        : currentGame.playerX;

    // assign currentGame state back to currentGame object
    currentGame.currentGameState = currentGameState;

    // handle winning and game-over logic
    // emit event based on above logic
    let isGameOver = false;
    // get row and column length
    let rowLength = currentGameState.length;
    let columnLength = currentGameState[0].length;

    // loop through elements in currentGameSate to check whether winning conditions have been met
    for (let i = 0; i < rowLength; i++) {
      let row = '';
      let column = '';
      let leftDiagonal = '';
      let rightDiagonal = '';
      for (let j = 0; j < columnLength; j++) {
        // value of rows
        row = row + currentGameState[i][j];
        // value of columns
        column = column + currentGameState[j][i];
        // check left diagonal
        if (i === j) {
          leftDiagonal = leftDiagonal + currentGameState[i][j];
        }
        // check right diagonal
        if (j == rowLength - i - 1) {
          rightDiagonal = rightDiagonal + currentGameState[i][j];
        }
      }
      debug(
        `row: ${row}, column: ${column}, leftDiagonal: ${leftDiagonal}, rightDiagonal: ${rightDiagonal}`
      );
      if (
        row == 'XXX' ||
        column == 'XXX' ||
        leftDiagonal == 'XXX' ||
        rightDiagonal == 'XXX'
      ) {
        isGameOver = true;
        currentGame.winner = currentGame.playerX;
        break;
      } else if (
        row == 'OOO' ||
        column == 'OOO' ||
        leftDiagonal == 'OOO' ||
        rightDiagonal == 'OOO'
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
