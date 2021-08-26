import React from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@material-ui/core';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PlayGameModal({ isOpen, handleModalClose, onChangeUsername, onChangeGameId, onClickNewGame, onClickJoinGame }) {
  // const [open, setOpen] = useState(isOpen);
  // const handleOpen = () => setOpen(true);

  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container sx={{ marginBottom: '1.5rem'}} spacing={3}>
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <TextField
              required
              id="outlined-required"
              label="Usernmae"
              sx={{ marginBlock: '1.5rem'}}
              fullWidth
              onChange={onChangeUsername}
            />
            <Button variant="text" onClick={onClickNewGame}>
            <Typography variant="h6">New Game</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h4">OR</Typography>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <TextField
              required
              id="outlined-required"
              label="Username"
              sx={{ marginBottom: '1.5rem'}}
              fullWidth
              onChange={onChangeUsername}
            />
            <TextField
              required
              id="outlined-required"
              label="Game ID"
              sx={{ marginBottom: '1.5rem'}}
              fullWidth
              onChange={onChangeGameId}
            />
            <Button variant="text" onClick={onClickJoinGame}>
              <Typography variant="h6">Join Game</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <Grid item sm={12} sx={{ textAlign: 'center'}}>
            <Button variant="text" onClick={handleModalClose}>
              <Typography variant="h6">Close</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
