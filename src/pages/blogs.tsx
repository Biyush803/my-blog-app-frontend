import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/blogCard";

type Blog = {
  _id: string;
  title: string;
  description: string;
  image: string;
  username: string;
  userId: string;
  createdAt: string;
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  //get blogs

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/blog/all-blog`
      );
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.userId}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.username}
            time={blog.createdAt}
          />
        ))}
    </>
  );
};

export default Blogs;
