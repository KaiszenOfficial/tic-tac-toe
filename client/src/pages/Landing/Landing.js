import { AppBar, Button, Container, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import {
  PlayGameModal,
} from '../../components';
import logo from '../../logo.svg';

export default function Landing({ socket }) {
  const [isOpen, setIsOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [gameId, setGameId] = useState('');

  const handleModalClose = () => {
    setIsOpen(false);
    setUsername('');
    setGameId('');
  };

  const handleNewGameCreate = () => {
    socket.emit('new-game', { username });
  };

  const handleJoinGame = () => {
    socket.emit('join-game', { username, gameId });
  };

  return (
    <Fragment>
        <AppBar
          position="static"
          sx={{ backgroundColor: '#282c34', alignItems: 'center' }}
        >
          <img src={logo} alt="TicTacToe" className="app-logo" />
          <Container sx={{ padding: '1rem'}}>
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
              What is TicTacToe?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'justify' }}>
            Tic-tac-toe, noughts and crosses, or Xs and Os/“X’y O’sies”, is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a diagonal, horizontal, or vertical row is the winner.
            Now this tranditionally pen and paper game is available for you to play with anyone from anywhere and using any device available, be it computers, laptops or mobiles.
            </Typography>
          </Container>
        </AppBar>
        <Container
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '1.5rem' }}
        >
          <Button variant="contained" size="large" onClick={() => setIsOpen(true)}>
            <Typography variant="h6">Play</Typography>
          </Button>
        </Container>
        <PlayGameModal 
          isOpen={isOpen} 
          handleModalClose={handleModalClose} 
          onClickNewGame={handleNewGameCreate} 
          onClickJoinGame={handleJoinGame}
          onChangeUsername={(e) => setUsername(e.target.value)}
          onChangeGameId={(e) => setGameId(e.target.value)}
        />
    </Fragment>
  );
}
