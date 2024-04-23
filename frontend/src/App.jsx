import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Messages from "./components/Messages";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        // Perform authentication logic here (e.g., API request)
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Perform logout logic here (e.g., clear session, remove tokens)
        setIsLoggedIn(false);
    };

    return (
        <div>
            <Router>
                <div className="app">
                    {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} logout={logout} />}
                    <div className="content">
                        {isLoggedIn && <Sidebar />}
                        <div className="main-content">
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Navigate to="/login" />}
                                />
                                <Route
                                    path="/login"
                                    element={<Login login={login} logout={logout} />}
                                />
                                <Route
                                    path="/register"
                                    element={<Register login={login} logout={logout}/>}
                                />
                                {isLoggedIn && <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                    isLoggedIn={isLoggedIn}
                                />  }
                                {isLoggedIn && <Route
                                    path="/messages"
                                    element={<Messages />}
                                    isLoggedIn={isLoggedIn}
                                /> }
								{isLoggedIn && <Route
                                    path="/logout"
                                    element={<Navigate to="/login" />}
                                    isLoggedIn={isLoggedIn}
                                /> }
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    );
};

// const PrivateRoute = ({ element, isLoggedIn, ...rest }) => {
//     return isLoggedIn ? (
//         <Route {...rest} element={element} />
//     ) : (
//         <Navigate to="/login" />
//     );
// };

export default App;






// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Sidebar from "./components/Sidebar";
// import Messages from "./components/Messages";
// import Logout from "./components/Logout";
// import Navbar from "./components/Navbar";

// const App = () => {
//     return (
//         <div>
//             <Router>
//                 <div className="app">
//                     <Navbar />
//                     <div className="content">
//                         <Sidebar />
//                         <div className="main-content">
//                             <Routes>
//                                 <Route
//                                     path="/dashboard"
//                                     element={<Dashboard />}
//                                 />
//                                 <Route
//                                     path="/messages"
//                                     element={<Messages />}
//                                 />
//                                 <Route path="/logout" element={<Logout />} />
//                             </Routes>
//                         </div>
//                     </div>
//                 </div>
//             </Router>
//         </div>
//     );
// };

// export default App;
