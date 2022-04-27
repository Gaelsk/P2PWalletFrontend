import { Avatar, Box, Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "src/redux/actions/auth";
import { getInitials } from "src/utils";

export const AccountProfile = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  function logout() {
    dispatch(logoutUser());
    router.push("/login");
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          >
            {getInitials(user.name)}
          </Avatar>
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${user.email}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button onClick={logout} sx={{ mt: 2 }} fullWidth variant="outlined" color="error">
          Logout
        </Button>
      </Box>
    </Card>
  );
};
