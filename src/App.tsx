import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Blogs from "./pages/blogs";
import Login from "./pages/login";
import Register from "./pages/register";
import UserBlogs from "./pages/userBlogs";
import CreateBlog from "./pages/createBlog";
import BlogDetails from "./pages/blogDetails";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer";
import { Box } from "@mui/material";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <BrowserRouter>
        <Header />
        <Toaster />
        <Box flex={1}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/my-blogs" element={<UserBlogs />} />
            <Route path="/all-blog" element={<Blogs />} />
            <Route path="/blog-details/:id" element={<BlogDetails />} />
            <Route path="/create-blog" element={<CreateBlog />} />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
