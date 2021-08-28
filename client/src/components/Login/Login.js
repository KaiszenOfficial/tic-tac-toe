import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';

function Login({ onChangeUsername, onChangeGameId, onClickNewGame, onClickJoinGame }) {
  return (
    <Grid container sx={{ marginBottom: '1.5rem' }} spacing={3}>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Usernmae"
          sx={{ marginBlock: '1.5rem' }}
          fullWidth
          onChange={onChangeUsername}
        />
        <Button variant="contained" onClick={onClickNewGame}>
          <Typography variant="h6">New Game</Typography>
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">OR</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Username"
          sx={{ marginBottom: '1.5rem' }}
          fullWidth
          onChange={onChangeUsername}
        />
        <TextField
          required
          id="outlined-required"
          label="Game ID"
          sx={{ marginBottom: '1.5rem' }}
          fullWidth
          onChange={onChangeGameId}
        />
        <Button variant="contained" onClick={onClickJoinGame}>
          <Typography variant="h6">Join Game</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}

export default Login;
