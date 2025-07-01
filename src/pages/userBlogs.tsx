import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/blogCard";
import NoBlogs from "../components/noBlogs";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  username: string;
  createdAt: string;
}

const UserBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <>
      {blogs.length === 0 ? (
        <NoBlogs/>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.username}
            time={blog.createdAt}
          />
        ))
      )}
    </>
  );
};

export default UserBlogs;
