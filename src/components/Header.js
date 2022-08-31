import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import { authActions } from "../store";
import { useStyles } from "./utils";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [isSignup, setIsSignup] = useState(false);
  const [value, setValue] = useState();
  return (
    <AppBar position="sticky" sx={{ background: "#21212c" }}>
      <Toolbar>
        <div class="container">
          TAC
          <div class="red">H</div>
          YON
        </div>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs"
                sx={{
                  fontSize: "1.2rem",
                }}
                label="All Blogs"
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                sx={{
                  fontSize: "1.2rem",
                }}
                to="/myBlogs"
                label="My Blogs"
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                sx={{
                  fontSize: "1.2rem",
                }}
                to="/blogs/add"
                label="Add Blog"
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              {" "}
              <Button
                variant="contained"
                LinkComponent={Link}
                to="/"
                sx={{
                  margin: 2,
                  width: "100px",
                  borderRadius: 1,
                  fontSize: "2vh",
                  fontWeight: "bold",
                  background: "#2488F0",
                  boxShadow: "2px 3px 20px #2B34D9",
                  ":hover": {
                    background: "#4FF5F3",
                    color: "#010305",
                  },
                }}
                color="warning"
              >
                Home
              </Button>
              <Button
                variant="contained"
                LinkComponent={Link}
                to="/auth"
                sx={{
                  margin: 2,
                  width: "100px",
                  borderRadius: 1,
                  fontSize: "2vh",
                  fontWeight: "bold",
                  background: "#2488F0",
                  boxShadow: "2px 3px 20px #2B34D9",
                  ":hover": {
                    background: "#4FF5F3",
                    color: "#010305",
                  },
                }}
                color="warning"
              >
                Sign IN
              </Button>{" "}
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispath(authActions.logout())}
              variant="contained"
              LinkComponent={Link}
              to="/auth"
              sx={{
                margin: 2,
                width: "100px",
                borderRadius: 1,
                fontSize: "2vh",
                fontWeight: "bold",
                background: "#2488F0",
                boxShadow: "2px 3px 20px #2B34D9",
                ":hover": {
                  background: "#4FF5F3",
                  color: "#010305",
                },
              }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
