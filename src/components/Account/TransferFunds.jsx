import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Box, Button, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserBalance } from "src/redux/actions/auth";
import { API_BASE_URL } from "src/utils/data";
import MUIModal from "../Utils/MuiModal";

const TransferFunds = ({ user, ...props }) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/users`);
        if (data.success) {
          const formatedResults = data.data
            .filter((u) => u.id !== user.id)
            .map((item) => ({ label: item.name, id: item.id }));
          console.log("formatedResults", formatedResults);
          setUsers(formatedResults);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (selectedUser && amount > 0) {
      try {
        setLoading(true);
        const { data } = await axios.post(`${API_BASE_URL}/wallets/transfer`, {
          amount: parseInt(amount),
          toUserId: selectedUser.id,
        });
        if (data.success) {
          const newBalance = data.data.data.fromWallet.balance;
          dispatch(setUserBalance(newBalance));

          setLoading(false);
          handleClose();
          setSelectedUser(null);
          setAmount(0);
          setSearchText("");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please select a user and specify amount");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{ ml: 2 }} color="secondary" variant="outlined">
        <CurrencyExchangeIcon />
        Transfer money
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
            <Autocomplete
              sx={{ mt: 2 }}
              disablePortal
              id="combo-box-demo"
              options={users}
              value={selectedUser}
              onChange={(event, newValue) => {
                setSelectedUser(newValue);
              }}
              inputValue={searchText}
              onInputChange={(event, newInputValue) => {
                setSearchText(newInputValue);
              }}
              id="controllable-states-demo"
              renderInput={(params) => (
                <TextField
                  {...params}
                  //error={Boolean(errors?.client)}
                  fullWidth
                  //helperText={errors?.client}
                  label="User"
                />
              )}
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

export default TransferFunds;
