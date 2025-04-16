import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation , Navigate } from "react-router-dom";
import './App.css';
import { AppProvider } from "./contexts/AppContext";

import Products from './components/Products.js';
import Navbar from './components/NavBar.js';
import ProfilePage from './components/Profile.js';
import Login from './components/Login.js';
import Order from './components/Order.js';
import Register from './components/Register.js';
import Payment from "./components/Payment.js";
import BannerPage from './components/BannerPage.js';
import AboutContent from "./components/About.js";
import CrudProduct from "./components/CRUDProduct.js";
import Catalog from "./components/Catalog.js";
import ProductList from "./components/productsList.js";
import OrdersList from "./components/OrderList.js";
import AuthContext from "./context/AuthContext.js";
import { useState, useEffect, useContext } from 'react';
import JwtLogin from "./components/JwtLogin.js";
import JWTRegister from "./components/JWTRegister.js";
import Feedback from "./components/Feedback.js";
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  // const ProtectedRoute = ({ children, role }) => {
  //   const { user } = useContext(AuthContext);
  //   if (!user) return <Navigate to="/login" />;
  //   if (role && user.role !== role) return <Navigate to="/" />;
  //   return children;
  // };
  
    return (
      <AppProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<BannerPage/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/ProfilePage" element={<ProfilePage/>} />
        <Route path="/Order" element={<Order/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/Products" element={<PrivateRoute element={<Products />} />}/>
        <Route path="/Payment" element={<Payment />} />
        <Route path="/AboutContent" element={<AboutContent />} />
        <Route path="/CRUDProduct" element={<CrudProduct />} />
        <Route path="/Catalog" Component={Catalog} />
        <Route path="/productlist" Component={ProductList} />
        <Route path="/ordersList" Component={OrdersList} />
        <Route path="/api/users/login" Component={JwtLogin} />
        <Route path="/api/users/register" Component={JWTRegister} />
        
      
        
       
        {/* <Route
        path="/products"
        element={
          <ProtectedRoute role="admin">
            <Products />
          </ProtectedRoute>
        }
      /> */}

      </Routes>
    </Router>
    </AppProvider>
  );
}


export default App;
