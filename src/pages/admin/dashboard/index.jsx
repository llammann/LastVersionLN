import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import "./../../../assets/style/admin/Dashboard.scss";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="container" style={{ padding: 0 }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{
              background: "#2196f3",
              color: "white",
              textAlign: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <i>
                  <Link
                    to="products"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontStyle: "italic",
                    }}
                  >
                    Products
                  </Link>{" "}
                  <Link
                    to="users"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontStyle: "italic",
                    }}
                  >
                    Users
                  </Link>{" "}
                  <Link
                    to="addProducts"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontStyle: "italic",
                    }}
                  >
                    Add Products
                  </Link>{" "}
                  <Link
                    to="addUsers"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontStyle: "italic",
                    }}
                  >
                    Add Users
                  </Link>
                </i>
              </Typography>
              {auth && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className="container">
        <div className="adminPanel">
          <h1 style={{ textShadow: "2px 2px 4px #000", paddingLeft: "320px" }}>
            WELCOME TO MY ADMIN PANEL
          </h1>
        </div>
      </div>
    </>
  );
}
