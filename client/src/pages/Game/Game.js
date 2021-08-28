import React from 'react';
import { Badge, Box, Container, Grid, Typography } from '@material-ui/core'
import { BlockComponent } from '../../components';
import './Game.css';

export default function Game({ socket, username, currentGame, isGameOver }) {
  console.log(username, currentGame);
  const handleBlockClick = (e, indexMap) => {
    if (
      e.target.innerHTML === '' &&
      currentGame.nextPlayerTurn === username &&
      !isGameOver
    ) {
      socket.emit('player-turn', {
        gameId: currentGame.id,
        username,
        block: indexMap,
      });
    }
  };

  return (
    <Container sx={{ paddingTop: '1.5rem'}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Badge color={currentGame.nextPlayerTurn === currentGame.playerX ? 'success' : 'secondary'} variant="dot">
            <Typography variant="h6">{currentGame.playerX}</Typography>
          </Badge>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Box>
            <Typography variant="h6" >
              Game ID
            </Typography>
            <Typography variant="h6">{currentGame.id}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          {currentGame.playerO ? <Badge color={currentGame.nextPlayerTurn === currentGame.playerO ? 'success' : 'secondary'} variant="dot">
            <Typography variant="h6">{currentGame.playerO}</Typography>
          </Badge> : null}
        </Grid>
      </Grid>

      {isGameOver ? (
        <Grid container>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h4">GAME OVER! Winner is {currentGame.winner}</Typography>
          </Grid>
        </Grid>
      ) : null}

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
    </Container>
  );
}
