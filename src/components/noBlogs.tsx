import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoBlogs = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
      py={4}
    >
      <Box textAlign="center">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          No Blogs Found
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Sorry, we couldn't find the page you're looking for.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/blogs")}
          >
            Go to Blogs
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/create-blog")}
          >
            Create Blog →
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NoBlogs;
