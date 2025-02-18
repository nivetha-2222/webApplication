import React from "react";
import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import googleLogo from "../assets/google.png";

const SignInwithGoogle: React.FC = () => {
  let isLoggingIn = false; // Flag to prevent multiple login requests

  const googleLogin = async () => {
    if (isLoggingIn) return; // Prevent duplicate triggers
    isLoggingIn = true;

    const provider = new GoogleAuthProvider();
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      console.log("User Credential: ", result);

      const user = result.user;
      if (user) {
        // Save user data to Firestore
        await setDoc(
          doc(db, "Users", user.uid),
          {
            email: user.email,
            firstName: user.displayName || "Anonymous",
            photo: user.photoURL || "",
            lastName: "",
            createdAt: new Date(),
          },
          { merge: true } // Avoid overwriting existing user data
        );

        toast.success("User logged in successfully!", {
          position: "top-center",
        });

        // Redirect user after successful login
        window.location.href = "/profile";
      }
    } catch (error: any) {
      console.error("Login error: ", error);

      // Handle specific Firebase Auth errors
      if (error.code === "auth/popup-blocked") {
        toast.error("Popup blocked. Please allow popups and try again.", {
          position: "bottom-center",
        });
      } else if (error.code === "auth/cancelled-popup-request") {
        toast.error("Multiple login requests detected. Please try again.", {
          position: "bottom-center",
        });
      } else {
        toast.error("Login failed. Please try again.", {
          position: "bottom-center",
        });
      }
    } finally {
      isLoggingIn = false; // Reset the flag after the login attempt
    }
  };

  return (
    <div>
      <p className="continue-p">-- Or continue with --</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={googleLogo} width={"60%"} alt="Google Sign In" />
      </div>
    </div>
  );
};

export default SignInwithGoogle;
