import React from "react";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div style={{padding: '20px 0', backgroundColor: '#282A36', marginTop: '150px'}}>
      <h3 className="title footer-title">
        code<b>Pro</b>
      </h3>

      <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px 0', margin: '0 100px', borderBottom: '2px solid #bfbfbf',}}>
        <div><Link to={`/about`} style={{ textDecoration: 'none' }}><p className="name">About Us</p></Link></div>
        <div style={{width: '220px'}}>
            Contact us at<br /><br />
            <a className="mail-link" style={{textDecoration: 'None', color: 'white'}} href="mailto:jershaxavier@gmail.com">jershaxavier@gmail.com</a><br />
            <a className="mail-link" style={{textDecoration: 'None', color: 'white'}} href="mailto:lstamjid2002@gmail.com">lstamjid2002@gmail.com</a>
        </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px 0', margin: '0 100px',}}>
          <p>&copy;2022 codePro, LLC. All Rights Reserved</p>

          <div>
          <a href="https://www.instagram.com/" style={{padding: "0 10px",}}><box-icon name='instagram' type='logo' color='#ffffff'></box-icon></a>
          <a href="https://www.linkedin.com/in/tamjid-l-a26772214/" style={{padding: "0 10px",}}><box-icon name='linkedin' type='logo' color='#ffffff' ></box-icon></a>
          <a href="https://www.github.com/JERSHA20PW13" style={{padding: "0 10px",}}><box-icon name='github' type='logo' color='#ffffff' ></box-icon></a>
          </div>
      </div>

    </div>
  );
};

export default Footer;