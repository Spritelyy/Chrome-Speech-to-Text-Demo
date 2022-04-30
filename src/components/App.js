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
                <Route path="Chrome-Speech-to-Text-Demo/signup" element={<Signup/>} />
                <Route path="Chrome-Speech-to-Text-Demo/login" element={<Login/>} />
                <Route excat path="Chrome-Speech-to-Text-Demo/" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
                <Route path="Chrome-Speech-to-Text-Demo/notes" element={<PrivateRoute><Notes /></PrivateRoute>}></Route>
                <Route path="Chrome-Speech-to-Text-Demo/forgot-password" element={<ForgotPassword/>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </>  
  )
}

export default App;
