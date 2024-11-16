import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import ContactUs from "./Pages/ContactUs/ContactUs";
import LoginPop from "./Components/Login/LoginPop";
import MyOrders from "./Pages/MyOrders/MyOrders";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const App = () => {
  const url = "http://localhost:4000";
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin?<LoginPop setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
       
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Cart />} path="/cart" />
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route element={<PlaceOrder />} path="/order" />
          <Route element={<ContactUs />} path="/contactus" />
          <Route element={<MyOrders />} path="/myorders" />
        </Routes>
        {/* Contact Page is remaining
            Navbar in Mobile Phone is Remaining
             */}
      </div>
      <Footer />
    </>
  );
};  

export default App;
