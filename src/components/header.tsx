import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { toast } from "react-hot-toast";

const Header = () => {
  interface RootState {
    isLogin: boolean;
  }
  const isLogin = useSelector((state: RootState) => state.isLogin);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [value, setValue] = useState();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      localStorage.clear();
      toast.success("Logout Successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" sx={{ color: "white" }}>
          My Blog App
        </Typography>

        {isLogin && (
          <>
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(_, val) => setValue(val)}
              >
                <Tab label="Blogs" component={Link} to="/blogs" />
                <Tab label="My Blogs" component={Link} to="/my-blogs" />
                <Tab label="Create Blog" component={Link} to="/create-blog" />
              </Tabs>
            </Box>
          </>
        )}

        <Box sx={{ display: "flex", marginLeft: "auto" }}>
          {!isLogin && (
            <>
              <Button
                sx={{ margin: 1, color: "white" }}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </>
          )}

          {!isLogin && (
            <>
              <Button
                sx={{ margin: 1, color: "white" }}
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}

          {isLogin && (
            <>
              <Button
                onClick={handleLogout}
                sx={{ margin: 1, color: "white" }}
                component={Link}
                to="/login"
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
