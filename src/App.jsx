// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Signup";
import Login from "./Login";
import VendorDashboard from "./VendorDashboard";
import ConsumerDashboard from "./ConsumerDashboard";
import Home from "./Home"; // 🆕 import HomePage
import Header from "./Header"; // 🆕 ensure Header is also imported

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/consumer" element={<ConsumerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
