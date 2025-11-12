// src/pages/Auth/Signup.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/validators";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const { signup, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const pwdErr = validatePassword(password);
    if (pwdErr) {
      setError(pwdErr);
      return;
    }
    try {
      await signup({ name, email, photoURL, password });
      navigate("/");
    } catch {
      setError("Signup failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch {
      setError("Google signup failed");
    }
  };

  return (
    <div className="card p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Create an account</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="text-sm">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="text-sm">Photo URL</label>
          <input
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
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
          {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
        </div>

        <button className="btn btn-primary w-full">Register</button>
      </form>

      <div className="divider">OR</div>

      <div className="flex gap-2">
        <button onClick={handleGoogle} className="btn btn-outline w-full">
          {<FcGoogle />} Continue with Google
        </button>
      </div>
      <div className="mt-3">
        <span className="text-xs">Already have an account? </span>
        <Link to="/login" className="text-xs text-primary link">
          Login here
        </Link>
      </div>
    </div>
  );
}
