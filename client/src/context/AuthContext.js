// import { createContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => setUser(userData);
//   const logout = () => setUser(null);


//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     }
//   }, []);

//   const login = (userData, token) => {
//     setUser(userData);
//     localStorage.setItem("token", token);
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//     delete axios.defaults.headers.common["Authorization"];
//   };

//   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
// // };
// import { createContext, useState } from "react";

// export const AuthContext = createContext(); // ✅ Ensure it's exported

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Mock login function
//   const login = () => {
//     setIsAuthenticated(true);
//   };

//   // Mock logout function
//   const logout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
// export default AuthContext;
import { createContext, useState, useEffect } from "react";
//import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
