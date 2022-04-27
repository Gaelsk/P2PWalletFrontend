import Head from "next/head";
import { Box, Container, Grid, Card, Typography } from "@mui/material";
//import UsersLiveStats from "../components/Home/Lives/Stats"
import { ProtectedView } from "../components/ProtectedView";
import { PROJECT_NAME } from "src/utils/data";
import UserWallet from "src/components/Account/UserWallet";
import { AccountProfile } from "src/components/Account/AccountProfile";

const Home = () => (
  <>
    <Head>
      <title>Account | {PROJECT_NAME}</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Account
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <UserWallet />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Home.getLayout = (page) => <ProtectedView>{page}</ProtectedView>;

export default Home;
