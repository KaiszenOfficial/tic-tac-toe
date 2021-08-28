import { AppBar, Container, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { LoginComponent } from '../../components';
import logo from '../../logo.svg';

export default function Landing({ socket }) {
  const [username, setUsername] = useState('');
  const [gameId, setGameId] = useState('');

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
        <Container sx={{ padding: '1rem' }}>
          <Typography
            variant="h4"
            color="text.secondary"
            sx={{ textAlign: 'center', color: '#abb2bf' }}
          >
            What is TicTacToe?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'justify', color: '#abb2bf' }}
          >
            Tic-tac-toe, noughts and crosses, or Xs and Os/“X’y O’sies”, is a
            paper-and-pencil game for two players, X and O, who take turns
            marking the spaces in a 3×3 grid. The player who succeeds in placing
            three of their marks in a diagonal, horizontal, or vertical row is
            the winner. Now this tranditionally pen and paper game is available
            for you to play with anyone from anywhere and using any device
            available, be it computers, laptops or mobiles.
          </Typography>
        </Container>
      </AppBar>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '1.5rem',
        }}
      >
        <LoginComponent
          onClickNewGame={handleNewGameCreate}
          onClickJoinGame={handleJoinGame}
          onChangeUsername={(e) => setUsername(e.target.value)}
          onChangeGameId={(e) => setGameId(e.target.value)}
        />
      </Container>
    </Fragment>
  );
}
