import React, { useState } from "react";

import "./AddBlog.css";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import axios from "axios";



const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: "24px",
  fontWeight: "bold",
  color: "white",
};

const AddBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("https://backend-tachyon.herokuapp.com/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(()=>navigate("/blogs"));
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="box2">
          <div className="log2">POST BLOG</div>
          <br />
          TITLE <br />
          <textarea
            className="inp2"
            name="title"
            onChange={handleChange}
            value={inputs.title}
            rows="3"
          ></textarea>
          <br />
          DESCRIPTION <br />
          <textarea
            className="inp2"
            name="description"
            onChange={handleChange}
            value={inputs.description}
            rows="6"
          ></textarea>
          <br />
          IMAGE URL <br />
          <textarea
            className="inp2"
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            rows="3"
          ></textarea>
          <br />
          <br />
          <div className="btnbox2">
            <input className="btn2" type="submit" value="POST" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
