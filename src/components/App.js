import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import Signup  from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Notes from "./Notes"
import ForgotPassword from "./ForgotPassword";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
      <>
        <div style={{height:"100vh"}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route excat path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
                <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>}></Route>
                <Route path="/forgot-password" element={<ForgotPassword/>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </>  
  )
}

export default App;
