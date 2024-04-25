import React, { useState } from "react";
import { expensory_ic_backend } from "../../declarations/expensory_ic_backend";
import { useNavigate } from "react-router-dom";
import './RegisterLoginUser.css';
import bg from '../assets/bg.png';
import logo from '../assets/logo.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterLoginUser = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setIsLoggingIn(!isLoggingIn);
  };

  // const generateOTP = () => {
  //   const digits = '0123456789';
  //   let otp = '';
  //   for (let i = 0; i < 6; i++) {
  //     otp += digits[Math.floor(Math.random() * 10)];
  //   }
  //   return otp;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password regular expression for minimum 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    if (isLoggingIn) {
      const loginRes = await expensory_ic_backend.verifyuser(username, password);
      if (loginRes === "Success") {
        toast.success("Login Successful");
        navigate("/app");
      } else {
        toast.error("Login Failed - Invalid Credentials");
      }
    } else {
      if (password !== confirmPassword) {
        toast.error("Confirm Password does not match Password");
        return;
      }

      

      const signUpRes = await expensory_ic_backend.registerUser(username, password);
      if (signUpRes) {
        toast.success("Signup Successful");
        handleClick();
      } else {
        toast.error("Username already exists");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo-column" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }}>
        <img src={logo} alt="Your Logo" />
        <h1>Expense Tracker</h1>
        <h3 className="web-txt-auth" style={{ color: '#D3D3D3' }}>
          A simple, web-based application for tracking expenses, built on the ICP blockchain.
        </h3>
      </div>

      <div className="form-column" style={{ backgroundColor: '#fff9eb', padding: '20px', borderRadius: '10px' }}>
        {isLoggingIn ? <h1>Login</h1> : <h1>Sign Up</h1>}
        <form>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLoggingIn && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              
            </>
          )}
          <button type="submit" onClick={handleSubmit}>
            {isLoggingIn ? "Login" : "Sign Up"}
          </button>
        </form>
        {isLoggingIn ? (
          <p onClick={handleClick}>Don't have an account?</p>
        ) : (
          <p onClick={handleClick}>Already have an account?</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default RegisterLoginUser;
