import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import React from "react";
import googleLogo from "../assets/google.png";




const SignInwithGoogle: React.FC = () => {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      console.log(result);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        window.location.href = "/profile";
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed", { position: "bottom-center" });
    }
  };

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        {/* <img src={require("../assets/google.png")} width={"60%"} alt="Google Sign In" /> */}
        <img src={googleLogo} width={"60%"} alt="Google Sign In" />
      </div>
    </div>
  );
};

export default SignInwithGoogle;
