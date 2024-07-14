import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Home from "./screens/Home";
import AppointmentBooking from "./screens/AppointmentBooking";
import CreateDoctorProfile from "./screens/CreateDoctorProfile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/appointment-booking" element={<AppointmentBooking/>}/>
                <Route path="/doctor/create-profile" element={<CreateDoctorProfile/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
