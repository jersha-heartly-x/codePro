import React from 'react'
import Profile from './Profile'
import UserCircle from '../images/user-circle.png'
import firebaseConfig from "../config.js"

const UserDropdown = () => {
    const signOutUser = () => {
        firebaseConfig.auth().signOut().then(function() {
            console.log('signed out');
        }).catch(function(error) {
        // An error happened.
        });
    };

    return (
        <div className='dropdown'>
            <img src={UserCircle} alt="user-circle" className='user-circle'></img>
            <div className='dropdown-content'>
                <Profile />
                <button onClick={signOutUser} className='signout-btn'>Sign out</button>
            </div>
        </div>
    )
}

export default UserDropdown