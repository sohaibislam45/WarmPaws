// src/pages/Auth/Login.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

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
      await googleSignIn();
      navigate(from, { replace: true });
    } catch {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <div className="card p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
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
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link to="/forgot-password" className="text-xs link">
            Forgot password?
          </Link>
          <button className="btn btn-primary">Login</button>
        </div>
      </form>

      <div className="divider">OR</div>

      <div className="flex gap-2">
        <button onClick={handleGoogle} className="btn btn-outline w-full">
          Continue with Google
        </button>
        <Link to="/signup" className="btn btn-ghost">
          Signup
        </Link>
      </div>
    </div>
  );
}
