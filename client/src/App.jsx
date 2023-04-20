import React from "react"
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
function App() {

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="/user" element={<UserDashboard />}></Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
        </Routes>
      </Router>
      

    </div>
  )
}

export default App
