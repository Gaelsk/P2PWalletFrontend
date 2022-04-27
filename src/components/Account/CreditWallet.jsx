import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "src/utils/data";
import MUIModal from "../Utils/MuiModal";

const CreditWallet = ({ props }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_BASE_URL}/wallets`, { amount: parseInt(amount) });
      console.log(data);
      if (data.success) {
        const { authorization_url } = data.data.data;
        //redirect to authorization_url
        window.open(authorization_url);

        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color="secondary" variant="outlined">
        <AddIcon />
        Credit account
      </Button>
      <MUIModal maxWidth="xs" open={open} handleClose={handleClose}>
        <Box px={2} py={4}>
          <form autoComplete="off" noValidate {...props}>
            <TextField
              fullWidth
              helperText="Please specify the amount"
              label="Amount"
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
              required
              value={amount}
              variant="outlined"
            />
            <Button
              sx={{ mt: 2 }}
              fullWidth
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              disabled={loading}
              loading={loading}
            >
              Submit
            </Button>
          </form>
        </Box>
      </MUIModal>
    </>
  );
};

export default CreditWallet;
