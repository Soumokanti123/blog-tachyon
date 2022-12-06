import {
  Avatar,
  Card,
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useStyles } from "./utils";
import axios from "axios";
import { useSelector } from "react-redux";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`https://tachyon-backend-production-3687.up.railway.app/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest().then(() => navigate("/").then(() => navigate("/blogs")));
  };
  
  // time stamp
  const date = new Date();
  const d = date.getDate();
  const day = (d < 10 ? "0" : "") + d;
  const m = date.getMonth() + 1;
  const month = (m < 10 ? "0" : "") + m;
  const year = date.getFullYear();
  const h = date.getHours();
  const hour = (h < 10 ? "0" : "") + h;
  const min = date.getMinutes();
  const minute = (min < 10 ? "0" : "") + min;
  const sec = date.getSeconds();
  const second = (sec < 10 ? "0" : "") + sec;
  
  const time = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  


  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          mt: 2,
          padding: 2,
          border: "2px black solid",
          borderRadius: "10px",
          ":hover": {
            boxShadow: "2px 3px 20px #2B34D9",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditTwoToneIcon sx={{ color: "lightgreen" }} />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteSweepTwoToneIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              // className={classes.font}
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={userName}
          subheader= {time}
        />
        <CardMedia component="img" height="200" image={imageURL} alt="img" />

        <CardContent>
          <br />
          <Typography
            // className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>
              <h1>{title}</h1>
            </b>
            <br />
            {description}
          </Typography>
        </CardContent>
      </Card>{" "}
    </div>
  );
};

export default Blog;
