// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Signup";
import Login from "./Login";
import VendorDashboard from "./VendorDashboard";
import ConsumerDashboard from "./ConsumerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/consumer" element={<ConsumerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
