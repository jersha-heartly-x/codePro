import React from "react"
import { Link } from "react-router-dom"
import Typewriter from "typewriter-effect"

import './Landing.css';
import editor from '../images/editor.png'
import language from '../images/language.png'
import theme from '../images/themes.png'
import { languages } from '../data/languages'

const Landing = () => {
    let languagesArr = languages.map(language => language.value);
    languagesArr = [... new Set(languagesArr)];

    return(
        <div className="bg">
            <div>
                <pre></pre>
            </div>
            <div>
                <h1 className="title">codePro</h1>
            </div>
            <div className="start-div">
                <div>
                    <h1 className="quote">eat, sleep,</h1>
                    <h1 className="quote">{"{"}<span className="grad-quote">code</span>{"}"}, repeat</h1>
                    <p className="content">Compile, run your code with codePro online IDE and up your {"<"}programming skills{"/>"}</p>
                    <p className="content">Because learning to code might be the easiest way to change your career</p>
                    <div className="grad-btn"><Link className="start-btn" to={`/editor`}>Let's start coding</Link></div>
                </div>
                <div>
                    <img src={editor} alt="Editor" className="editor"></img>
                </div>
            </div>
            <div className="middle-div">
                <div>
                    <img src={language} alt="Languages" className="languages-img"></img>
                </div>
                <div>
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
            </div>
            <div className="end-div">
                <div>
                    <h1 className="quote">Code in style <span className="normal">with</span></h1>
                    <h1 className="quote"><span className="bold">50+ </span>themes</h1>
                </div>
                <div>
                    <img src={theme} alt="Themes" className="themes-img"></img>
                </div>
            </div>
        </div>
    );
};

export default Landing;