// import React from 'react';
// import { AppBar, Toolbar, Button, Typography, Menu, MenuItem } from '@mui/material';
// import { Link,useNavigate, useLocation } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import OrdersList from './OrderList';
 

// function Navbar() {
// // Check if user is authenticated (token exists in localStorage)
// const [anchorEl, setAnchorEl] = useState(null);

// const handleProfileClick = (event) => {
//   setAnchorEl(event.currentTarget);
// };

// const handleClose = () => {
//   setAnchorEl(null);
// };
//   return(
//     <AppBar position="static" style={{ backgroundColor: '#02075D' }}>
//       <Toolbar>
//         <Typography variant="h6" style={{ flexGrow: 1, color: '#C0C0C0' }}>
//           MyApp
//         </Typography>
//         <Button color="inherit" component={Link} to="/" style={{ color: '#00FFFF' }}>
//           Home
//         </Button>
//         <Button color="inherit" component={Link} to="/Products" style={{ color: '#00FFFF' }}>
//           Products
//         </Button>
//         <Button color="inherit" component={Link} to="/Order" style={{ color: '#00FFFF' }}>
//           My Orders
//         </Button>
//         <Button color="inherit" component={Link} to="/Payment" style={{ color: '#00FFFF' }}>
//           Payments
//         </Button>
//         <Button color="inherit" component={Link} to="/AboutContent" style={{ color: '#00FFFF' }}>
//           About Us
//         </Button>
//         <Button color="inherit" component={Link} to="/Catalog" style={{ color: '#00FFFF' }}>
//           Catalog
//         </Button>
//         <Button color="inherit" component={Link} to="/productList" style={{ color: '#00FFFF' }}>
//           ProductList
//         </Button>
//         <Button color="inherit" component={Link} to="/ordersList" style={{ color: '#00FFFF' }}>
//           OrdersList
//         </Button>
//         <Button color="inherit" component={Link} to="/api/users/login" style={{ color: '#00FFFF' }}>
//           JWT Login
//         </Button>
//         <Button color="inherit" component={Link} to="/api/users/register" style={{ color: '#00FFFF' }}>
//           JWT Register
//         </Button>
//         <Button color="inherit" component={Link} to="/feedback" style={{ color: '#00FFFF' }}>
//           Feedback
//         </Button>
//         <Button
//           color="inherit"
//           style={{ color: '#00FFFF' }}
//           onClick={handleProfileClick}
//         >
//           Profile
//         </Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem component={Link} to="/ProfilePage" onClick={handleClose}>
//             View Profile
//           </MenuItem>
//           <MenuItem onClick={handleClose}>Logout</MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
  // return (
  //   <AppBar position="static" style={{ backgroundColor: '#02075D' }}>
  //     <Toolbar>
  //       <Typography variant="h6" style={{ flexGrow: 1, color: '#C0C0C0' }}>
  //         MyApp
  //       </Typography>

  //       {/* Navigation Buttons */}
  //       {[
  //         { label: "Home", path: "/" },
  //         { label: "Products", path: "/Products" },
  //         { label: "My Orders", path: "/Order" },
  //         { label: "Payments", path: "/Payment" },
  //         { label: "About Us", path: "/AboutContent" },
  //         { label: "Catalog", path: "/Catalog" },
  //         { label: "Product List", path: "/productList" },
  //         { label: "Orders List", path: "/ordersList" },
  //       ].map((item) => (
  //         <Button
  //           key={item.path}
  //           color="inherit"
  //           component={Link}
  //           to={item.path}
  //           style={{
  //             color: location.pathname === item.path ? '#FFD700' : '#00FFFF', // Highlight active page
  //             fontWeight: location.pathname === item.path ? 'bold' : 'normal',
  //           }}
  //         >
  //           {item.label}
  //         </Button>
  //       ))}

  //       {/* Profile Button (Shown Only if Logged In) */}
  //       {isAuthenticated && (
  //         <>
  //           <Button
  //             color="inherit"
  //             style={{ color: '#00FFFF' }}
  //             onClick={handleProfileClick}
  //           >
  //             Profile
  //           </Button>
  //           <Menu
  //             anchorEl={anchorEl}
  //             open={Boolean(anchorEl)}
  //             onClose={handleClose}
  //           >
  //             <MenuItem component={Link} to="/ProfilePage" onClick={handleClose}>
  //               View Profile
  //             </MenuItem>
  //             <MenuItem onClick={handleLogout}>Logout</MenuItem>
  //           </Menu>
  //         </>
  //       )}

  //       {/* Login Button (Shown Only if Not Logged In) */}
  //       {!isAuthenticated && (
  //         <Button
  //           color="inherit"
  //           component={Link}
  //           to="/login"
  //           style={{ color: '#00FFFF' }}
  //         >
  //           Login
  //         </Button>
  //       )}
  //     </Toolbar>
  //   </AppBar>
  // );

// }
// export default Navbar; 

import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
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
      About: "/about",
      Payments: "/Payment",
      Profile : "/ProfilePage",
      Feedback:"/feedback"
    };
   

    navigate(routes[page]);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");     // ✅ remove JWT token
    setUser(null);                        // ✅ clear user state
    navigate("/api/users/login");                   // ✅ redirect to login
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
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#FF9900" }} />
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
  {/* Mobile Menu */}
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
                  <Typography textAlign="center" sx={{ color: "#FFFFFF", fontSize: "16px" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
              {user && (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center" sx={{ color: "#FFFFFF", fontWeight: 600 }}>
                    Logout
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            {visiblePages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{
                  my: 1,
                  mx: 1,
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontWeight: 500,
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "rgba(255, 153, 0, 0.2)",
                    color: "#FF9900",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Logout Button on Right */}
          {user && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ mr: 2, color: "#F0C14B", fontSize: "15px", fontWeight: 500 }}
              >
                {user.name}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  color: "#FF9900",
                  borderColor: "#FF9900",
                  "&:hover": {
                    backgroundColor: "rgba(255, 153, 0, 0.1)",
                    borderColor: "#FF9900",
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;