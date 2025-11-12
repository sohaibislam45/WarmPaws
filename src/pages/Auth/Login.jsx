// src/pages/Auth/Login.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { login, googleSignIn, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user]); // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

 const handleGoogle = async () => {
   try {
     await googleSignIn(); // AuthProvider sets user
     navigate(from, { replace: true });
   } catch (err) {
     toast.error("Google sign-in failed: " + (err.message || ""));
   }
 };



  return (
    <div className="card p-6 shadow">
      <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="text-sm">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full"
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div>
          <Link to="/forgot-password" className="text-xs link">
            Forgot password?
          </Link>
        </div>
        <button className="btn btn-primary w-full">Login</button>
      </form>

      <div className="divider">OR</div>

      <div className="flex gap-2">
        <button onClick={handleGoogle} className="btn btn-outline w-full">
          {<FcGoogle />}
          Continue with Google
        </button>
      </div>
      <div className="mt-3">
        <span className="text-xs">Don't have an account? </span>
        <Link to="/signup" className="text-xs text-primary link">
          Register here
        </Link>
      </div>
    </div>
  );
}
