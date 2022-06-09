import React, { useContext } from "react"
import { Link } from "react-router-dom"
import Typewriter from "typewriter-effect"
import CountUp from 'react-countup'

import './Landing.css'
import editor from '../images/editor.png'
import language from '../images/language.png'
import theme from '../images/themes.png'
import { languages } from '../data/languages'
import { AuthContext } from "./Auth"
import firebaseConfig from "../config.js"
import Profile from "./Profile"
import Footer from './Footer'

const Landing = () => {
    let languagesArr = languages.map(language => language.value);
    languagesArr = [...new Set(languagesArr)];

    const signOutUser = () => {
        firebaseConfig.auth().signOut().then(function() {
            console.log('signed out');
        }).catch(function(error) {
        // An error happened.
        });
    };

    const { currentUser } = useContext(AuthContext);

    return (
        <div className="bg_">
            <div className="start-div">
                <div><Link to={`/`} style={{ textDecoration: 'none' }}><h1 className="title">code<b>Pro</b></h1></Link></div>
                <div className="nav">
                    {!currentUser ? (
                        <>
                            <div className="login-btn"><Link className="login-btn-link" to={`/login`}>Log In</Link></div>
                            <div className="signup-btn"><Link className="signup-btn-link" to={`/signup`}>Sign Up</Link></div>
                        </>
                    ) : (
                        <>
                            <Profile />
                            <div><button onClick={signOutUser} className="signout-btn-link">Sign out</button></div>
                        </>
                    )}
                </div>
            </div>
            <div className="start-div">
                <div className="first-div">
                    <h1 className="quote">eat, sleep,</h1>
                    <h1 className="quote">{"{"}<span className="grad-quote">code</span>{"}"}, repeat</h1>
                    <p className="content">Compile, run your code with codePro online IDE and up your {"<"}programming skills{"/>"}</p>
                    <p className="content">Because learning to code might be the easiest way to change your career</p>
                    <div className="start-btn"><Link className="grad-btn" to={`/editor`}>Let's start coding</Link></div>
                </div>
                <div>
                    <img src={editor} alt="Editor" className="editor"></img>
                </div>
            </div>
            <div className="middle-div">
                <div className="second-div">
                    <img src={theme} alt="Themes" className="themes-img"></img>
                </div>
                <div className="last-div">
                    <h1 className="quote">Code in style <span className="normal">with</span></h1>
                    <h1 className="quote">
                        <CountUp start={0} end={50} enableScrollSpy={true} duration={2} useEasing={true}>
                            {({ countUpRef }) => (
                                <span className="bold" ref={countUpRef} />
                            )}
                        </CountUp>
                        + themes
                    </h1>
                </div>
            </div>
            <div className="end-div">
                <div className="second-div">
                    <h1 className="text">support for</h1>
                    <h1 className="bold-lang">multiple languages</h1>
                    <h1 className="text">including</h1>
                    <span className="language">
                        <Typewriter
                            options={{
                                strings: languagesArr,
                                autoStart: true,
                                loop: true,
                                deleteSpeed: 200,
                            }}
                        />
                    </span>
                </div>
                <div className="">
                    <img src={language} alt="Languages" className="languages-img"></img>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Landing;
