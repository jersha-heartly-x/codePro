import React from 'react'
import './AboutUs.css'
import Typewriter from "typewriter-effect"
import Tam from '../images/tam.jpg'
import Jhx from '../images/jhx.jpg'
import { Link } from 'react-router-dom';
import Footer from './Footer'

const AboutUs = () => {
  return (
    <div className='bg_'>
        <div className='flexContent'>
            <h1 className='about'>About <span className='gradient'>US</span></h1>
            <Link to={`/`} style={{ textDecoration: 'none' }}><p style={{marginRight:'100px', fontSize:'30px', color: 'white'}}>code<b>Pro</b></p></Link>
        </div>
        <div className='flex'>
            <h1 style={{fontWeight:'700', margin: '100px'}}>
            <Typewriter
                options={{
                    strings: "For coders, by coders",
                    autoStart: true,
                    loop: false,
                    delay: 100
                }}
            />
            </h1>
            <p>we are a small tight-knit team, focused on making this online code editor fully functional and easy to use. 
            we are obsessively passionate about it and our mission is to make coding more accessible. 
            We are currently running Beta, feel free to report bugs to one of the below contacts.
            <br />Happy {"{"}coding{"}"}</p>
        </div>
        <div style={{textAlign:'Right', margin:'100px 100px'}}>
            <p>with Love,<br />codePro developer team</p>
        </div>
        <div>
            <h1 style={{fontWeight:'700', margin: '60px'}}>meet our team!</h1>
            <div className='flexContent' style={{marginBottom: '100px'}}>
                <img src={ Tam } alt="tam" style={{borderRadius: '50%', width: '275px', marginLeft: '40px'}}></img>
                <div style={{marginRight: '350px', width: '40%'}}>
                    <h1 style={{fontWeight:'900', margin: '60px 0'}}><span className='gradient'>hey,</span> this is tam.</h1>
                    <p>I’m a UI designer and web Developer from Pondicherry, India.<br /><br />
                    I enjoy taking complex problems and turning them into simple and beautiful interface designs.</p>
                </div>
            </div>
            <div className='flexContent' style={{paddingBottom: '100px'}}>
                <div style={{marginLeft: '380px', width: '40%', textAlign:'Right'}}>
                    <h1 style={{fontWeight:'900', margin: '60px 0'}}><span className='gradient'>hello,</span> this is jhx.</h1>
                    <p>I’m a UI designer and web Developer from Ariyalur, India.<br /><br />
                    I enjoy taking complex problems and turning them into simple and beautiful interface designs.</p>
                </div>
                <img src={Jhx} alt="jhx" style={{borderRadius: '50%', width: '235px', marginRight: '120px'}}></img>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default AboutUs