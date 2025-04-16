import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useAppContext } from "../contexts/AppContext"; // ✅ import context

const allPages = [
  "SignUp",
  "Login",
  "Catalog",
  "Products",
  "Products List",
  "Orders List",
  "Payments",
  "Orders",
  "Profile",
  "AboutUs",
  "Feedback",
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useAppContext(); // ✅ access user context

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (page) => {
    const routes = {
      SignUp: "/api/users/register",
      Login: "/api/users/login",
      Catalog: "/Catalog",
      Products: "/Products",
      "Products List": "/productList",
      "Orders List": "/ordersList",
      "API Products": "/api-products",
      Orders: "/Order",
      AboutUs: "/AboutContent",
      Payments: "/Payment",
      Profile: "/ProfilePage",
      Feedback: "/feedback",
    };

    navigate(routes[page]);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ remove JWT token
    setUser(null); // ✅ clear user state
    navigate("/api/users/login"); // ✅ redirect to login
  };

  // ✅ Filter pages based on user login status
  const visiblePages = allPages.filter((page) =>
    user ? page !== "Login" && page !== "SignUp" : page === "Login" || page === "SignUp"
  );

  return (
    <AppBar
      position="static"
      sx={{
        background: "#02075D",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "8px 0",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              letterSpacing: ".2rem",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            DoorStep
          </Typography>

      
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#FFFFFF" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {visiblePages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigation(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
             {user && (
            <MenuItem
    onClick={handleLogout}
    sx={{
      backgroundColor: "#FF0000", // Red background
      "&:hover": {
        backgroundColor: "#cc0000", // Darker red on hover
      },
    }}
  >
    <Typography textAlign="center" sx={{ color: "#FFFFFF" }}>
      Logout
    </Typography>
  </MenuItem>
)}

            </Menu>
          </Box>

          {/* Desktop View Buttons */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              letterSpacing: ".2rem",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            DoorStep
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {visiblePages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{ my: 2, color: "#00FFFF", display: "block" }}
              >
                {page}
              </Button>
            ))}
            {user && (
              <Button
                onClick={handleLogout}
                sx={{ my: 2, color: "#FF6666", display: "block" }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
