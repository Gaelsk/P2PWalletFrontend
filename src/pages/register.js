import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { API_BASE_URL, PROJECT_NAME } from "src/utils/data";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SET_AUTHENTICATED, SET_AUTH_LOADING } from "src/redux/types";
import { setAuthHeaders } from "src/redux/actions/auth";
import { useState } from "react";

const Register = () => {
  const [errorMsg, setErrorMsg] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),

      email: Yup.string().email("Email invalid").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values) => {
      dispatch({ type: SET_AUTH_LOADING, payload: true });
      const registrationData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      try {
        const { data } = await axios.post(`${API_BASE_URL}/users/register`, registrationData);
        if (data.success) {
          console.log(data);
          dispatch({ type: SET_AUTHENTICATED, payload: data.data.user });
          dispatch({ type: SET_AUTH_LOADING, payload: false });
          setAuthHeaders(data.data.token);
          sessionStorage.setItem("user", JSON.stringify(data.data.user));
          sessionStorage.setItem("token", data.data.token);

          //alert("GREAT")
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        if (error.response?.data) {
          console.log(error.response.data);
          setErrorMsg(error.response.data?.message);
        }
        dispatch({ type: SET_AUTH_LOADING, payload: false });
      }
    },

    //router.push('/');
  });

  return (
    <>
      <Head>
        <title>Register | {PROJECT_NAME}</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              P2P Wallet System
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Register
              </Typography>
            </Box>

            {errorMsg && (
              <Box sx={{ my: 3 }}>
                <Alert severity="error">{errorMsg}</Alert>
              </Box>
            )}

            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Already have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Login
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
