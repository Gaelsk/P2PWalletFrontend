import { Avatar, Box, Button, Card, Divider, Typography } from "@mui/material";
import { ProtectedView } from "../ProtectedView";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getUserData } from "src/redux/actions/auth";
import CreditWallet from "./CreditWallet";
import TransferFunds from "./TransferFunds";

const UserWallet = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const refreshWallet = () => {
    console.log("refreshWallet");
    dispatch(getUserData());
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h5">Balance</Typography>
            <Typography variant="h4">NGN {user.wallet.balance.toFixed(2)}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button sx={{ mr: 2 }} color="primary" variant="outlined" onClick={refreshWallet}>
            <RefreshIcon />
            Refresh balance
          </Button>
          <CreditWallet />

          {user.wallet.balance > 0 && <TransferFunds user={user} />}
        </Box>

        {/* <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box> */}
      </Card>
    </form>
  );
};

UserWallet.getLayout = (page) => <ProtectedView>{page}</ProtectedView>;

export default UserWallet;
