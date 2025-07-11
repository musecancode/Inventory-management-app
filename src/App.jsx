import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Signup";
import Login from "./Login";
import VendorDashboard from "./VendorDashboard";
import ConsumerDashboard from "./ConsumerDashboard";
import Home from "./Home";
import Header from "./Header";
import CartPage from "./CartPage";
import Footer from "./Footer";

import AddProduct from "./AddProduct";
import VendorProduct from "./VendorProduct";

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
        <Route path="/cart" element={<CartPage />} />

        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/vendor-products" element={<VendorProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
