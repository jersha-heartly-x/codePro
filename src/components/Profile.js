import React from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function Profile() {
    const user = firebase.auth().currentUser;
  return (
    <div style={{color: 'white'}}>{user.email}</div>
  )
}

export default Profile;