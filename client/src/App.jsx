import React from "react"
import Auth from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Calender from "./pages/Calender";
import CreateEvent from "./pages/CreateEvent";
import SavedEvents from "./pages/SavedEvents";
function App() {

  return (
    <div className="h-[100%] w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/user" element={<UserDashboard />}></Route>
          <Route path="/user/savedEvents" element={<SavedEvents />}></Route>
          <Route path="/user/calender" element={<Calender />}></Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
          <Route path="/admin/savedEvents" element={<SavedEvents />}></Route>
          <Route path="/admin/createEvent" element={<CreateEvent />}></Route>
          <Route path="/admin/calender" element={<Calender />}></Route>

        </Routes>
      </Router>
      

    </div>
  )
}

export default App
