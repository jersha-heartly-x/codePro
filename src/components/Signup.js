import React, {useState} from "react";
import { Navigate, Link } from "react-router-dom";
import firebaseConfig from "../config";
import './signup-login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [currentUser, setCurrentUser] = useState(null);    

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(() => {
          setCurrentUser(true);
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email already in use");
          }
        });
    } catch (error) {
      alert(error);
    }
  };

  if (currentUser) {
      return <Navigate to="/editor" />;
  }
  return (
    <div className="bg">
        <ToastContainer />
        <div><Link to={`/`} style={{ textDecoration: 'none' }}><h1 className="title_">code<b>Pro</b></h1></Link></div>
        <div className="cont">
            <h3 style={{marginBottom : '40px',textAlign : 'center',}}>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <div className="signup-form">
                    <input className="form-input" type="email" name="email" placeholder="Email" autoComplete="off" required/>
                    <input className="form-input" type="password" name="password" placeholder="Password" autoComplete="off" required/>
                    <button className="submit-btn" type="submit">Sign up</button>
                    <p>Already have an account? <Link class="login-hyper" to={ `/login` }>Log in</Link></p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Signup;