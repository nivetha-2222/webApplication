import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, FormEvent } from "react";
import { auth } from "../components/firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "../screens/SignInwithGoogle";
import "../components/auth.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      window.location.href = "/counter";
      toast.success("User logged in successfully", {
        position: "top-center",
      });
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>

                {/* Register Link */}
                <p className="forgot-password text-right mt-3">
                  New user? <a href="/register">Register Here</a>
                </p>

                {/* Google Sign-in Button */}
                <SignInwithGoogle />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
