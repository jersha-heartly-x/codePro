import React, { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
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
      <ToastContainer />
      <div><Link to={`/`} style={{ textDecoration: 'none' }}><h1 className="title_">code<b>Pro</b></h1></Link></div>
      <div className="cont">
        <h3 style={{ marginBottom: '40px', textAlign: 'center' }}>Log In</h3>
        <form onSubmit={handleSubmit}>
          <div className="signup-form">
            <input className="form-input" type="email" name="email" placeholder="Email" autoComplete="off" required/>
            <input className="form-input" type="password" name="password" placeholder="Password" autoComplete="off" required/>
            <button className="submit-btn" type="submit">Login</button>
            <p>Don't have an account? <Link class="login-hyper" to={`/signup`}>Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

