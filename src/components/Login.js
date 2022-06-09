import React, { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EyeIcon from '../images/eye.png';
import EyeCross from '../images/cross-eye.png';

const Login = () => {

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  }
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value).catch((error) => {
        if (error.code === 'auth/wrong-password') {
          toast.error('Invalid password');
        }
        if (error.code === 'auth/user-not-found') {
          toast.error('Invalid Email');
        }
      });
    } catch (error) {
      alert(error);
    }

  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/editor" />;
  }
  else {
    console.log('Login failed');
  }
  return (
    <div className="bg">
      <ToastContainer theme="dark"/>
      <div><Link to={`/`} style={{ textDecoration: 'none' }}><h1 className="title_">code<b>Pro</b></h1></Link></div>
      <div className="cont">
        <h3 style={{ marginBottom: '40px', textAlign: 'center' }}>Log In</h3>
        <form onSubmit={handleSubmit}>
          <div className="signup-form">
            <input className="form-input" type="email" name="email" placeholder="Email" autoComplete="off" required />
            <div style={{width:'344px', margin: '0 0 0 37px'}}>
              <input 
                className="form-input" 
                type={passwordType} 
                name="password" 
                placeholder="Password" 
                autoComplete="off" 
                required 
                onChange={ handlePasswordChange } 
                value = { passwordInput } />
                <button onClick={togglePassword} style={{background:'#272727', border:'none', borderBottom:'2px solid #bfbfbf'}}>
                  { passwordType==="password"? <img src={EyeIcon} alt="eye" style={{width:'20px', height:'20px'}}></img> : <img src={EyeCross} alt="eye-cross" style={{width:'20px', height:'20px'}}></img> }
                </button>
              </div>
            <button className="submit-btn" type="submit">Login</button>
            <p>Don't have an account? <Link class="login-hyper" to={`/signup`}>Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

