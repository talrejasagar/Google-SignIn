import { auth, provider } from "./firebase";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const SignIn = () => {
  const [profile, setProfile] = useState({});

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setProfile({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });
      }
    });
  }, []);

  const GSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const name = user.displayName;
        const email = user.email;
        const photo = user.photoURL;
        setProfile({ name, email, photo });
        setIsLogin(true);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsLogin(false);
        setProfile({});
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      {isLogin ? (
        <button onClick={logOut}>Sign Out</button>
      ) : (
        <button onClick={GSignIn}>Sign In</button>
      )}
      <p>{profile.name}</p>
      <p>{profile.email}</p>
      <img src={profile.photo} alt="" />{" "}
    </>
  );
};

export default SignIn;
