import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { Box, Typography, TextField, Button } from "@mui/material";
const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(
      (prevState: { name: string; email: string; password: string }) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
        {
          username: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }
      );

      if (data.data.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
      } else {
        toast.error("Registration failed.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            Register
          </Typography>
          <TextField
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"name"}
            required
          />
          <TextField
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type={"email"}
            required
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type={"password"}
            required
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Already Registered... <span> Please Login</span>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
