import React, {useState} from "react";
import { Navigate, Link } from "react-router-dom";
import firebaseConfig from "../config";
import './signup-login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EyeIcon from '../images/eye.png';
import EyeCross from '../images/cross-eye.png';

const Signup = () => {
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
        <ToastContainer theme="dark"/>
        <div><Link to={`/`} style={{ textDecoration: 'none' }}><h1 className="title_">code<b>Pro</b></h1></Link></div>
        <div className="cont">
            <h3 style={{marginBottom : '40px',textAlign : 'center',}}>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <div className="signup-form">
                    <input className="form-input" type="email" name="email" placeholder="Email" autoComplete="off" required/>
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
                    <button className="submit-btn" type="submit">Sign up</button>
                    <p>Already have an account? <Link class="login-hyper" to={ `/login` }>Log in</Link></p>
                </div>
            </form>
        </div>
    </div>
  );
};

export default Signup;