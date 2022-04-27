import { useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { SET_AUTHENTICATED, SET_AUTH_LOADING } from "../redux/types";
import { setAuthHeaders } from "src/redux/actions/auth";

export const ProtectedView = (props) => {
  const { children } = props;

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let token = sessionStorage.getItem("authToken");
    setAuthHeaders(token);
    let user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    if (!user) {
      router.push("/login");
    } else {
      dispatch({ type: SET_AUTHENTICATED, payload: user });
      dispatch({ type: SET_AUTH_LOADING, payload: false });
    }
  }, []);

  return (
    <>
      {!loading && user ? (
        <>
          <Box>
            {isAuthenticated ? (
              <Box
                sx={{
                  display: "flex",
                  flex: "1 1 auto",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {children}
              </Box>
            ) : null}
          </Box>
        </>
      ) : (
        <Box
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
