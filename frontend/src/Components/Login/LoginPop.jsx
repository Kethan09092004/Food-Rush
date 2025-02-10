/* eslint-disable react/prop-types */
import "./LoginPop.css";
import { useContext, useState } from "react";
import assets from "../../assets/frontend_assets/cross_icon.png";
import { StoreContext } from "../../StoreContext/StoreContext";
import axios from "axios";

const LoginPop = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(`${url}${endpoint}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login/Register Error:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="container">
        <div className="title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets} alt="Close" />
        </div>
        <div className="inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <p>
          {currState === "Login" ? (
            <>
              Create a New Account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
            </>
          ) : (
            <>
              Already Have an account? <span onClick={() => setCurrState("Login")}>Login Here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPop;
