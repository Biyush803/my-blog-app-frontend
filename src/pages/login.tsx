import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

type LoginInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState<LoginInputs>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/user/login", inputs);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        dispatch(authActions.login());
        toast.success("User Login Successful");

        navigate("/");
      } else {
        toast.error("Login failed. Try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <>
      <Box
        display="flex"
        position={"fixed"}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        padding={2}
        gap={4}
      >
        <Box 
         position="fixed"
            top="50%"
            left="15%"
            sx={{
              transform: "translateY(-50%)",
              maxWidth: 400,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              boxShadow: "10px 10px 20px #ccc",
              borderRadius: 2,
            }}>

          <img
            src="/BlogLogo.jpg"
            alt="My Blog App Logo"
            style={{ width: "100%", maxWidth: "350px", borderRadius: "10px" }}
          />
          
            <Typography variant="h6" padding={2} textAlign="center" fontFamily="sans-serif" fontWeight="bold" color="primary">
              Welcome to My Blog App
            </Typography>
        </Box>
         

        <form onSubmit={handleSubmit}>
          <Box
            position="fixed"
            top="50%"
            right="15%"
            sx={{
              transform: "translateY(-50%)",
              maxWidth: 400,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              boxShadow: "10px 10px 20px #ccc",
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" padding={3} textAlign="center">
              Login
            </Typography>

            <TextField
              label="Email"
              name="email"
              type="email"
              value={inputs.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={inputs.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 3, mt: 3 }}
            >
              Submit
            </Button>

            <Button
              onClick={() => navigate("/register")}
              sx={{ borderRadius: 3, mt: 3 }}
            >
              <span>Not a User?&nbsp;Please Register</span>
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Login;
