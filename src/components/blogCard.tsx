import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import type { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  username: string;
  time: string;
  isUser: boolean;
}

export default function BlogCard({
  id,
  title,
  description,
  image,
  username,
  isUser,
}: BlogCardProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const token: string | null = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/blog/delete-blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        alert("Blog Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 3,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <EditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="warning" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={title}
        subheader={moment().format()}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Digital Marketing"
      />

      <CardContent>
        <Typography variant="h6" color="textSecondary">
          Title: {title}{" "}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
