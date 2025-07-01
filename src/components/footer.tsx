import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main", 
        color: "white",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My Blog App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
