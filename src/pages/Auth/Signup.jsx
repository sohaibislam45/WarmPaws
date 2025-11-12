import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { validatePassword } from "../../utils/validators";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Signup() {
  const { signup, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = form;

    const pwdErr = validatePassword(password);
    if (pwdErr) {
      toast.error(pwdErr);
      return;
    }

    try {
      setSubmitting(true);
      await signup({ name, email, password, photoURL: photoURL || undefined });
      toast.success("Account created");
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error(err?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setSubmitting(true);
      await googleSignIn();
      navigate("/");
    } catch (err) {
      console.error("Google signup failed:", err);
      toast.error("Google signup failed: " + (err.message || ""));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card p-6 shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create an account</h2>

      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="text-sm">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="Full name"
          />
        </div>

        <div>
          <label className="text-sm">Photo URL</label>
          <input
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="https://example.com/avatar.jpg (optional)"
          />
        </div>

        <div>
          <label className="text-sm">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="At least 6 chars, upper & lower"
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute right-2 top-2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <button className="btn btn-primary w-full" disabled={submitting}>
          {submitting ? "Creating..." : "Register"}
        </button>
      </form>

      <div className="divider">OR</div>

      <div className="flex gap-2">
        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full"
          disabled={submitting}
        >
          <FcGoogle className="mr-2 text-lg" /> Continue with Google
        </button>
      </div>

      <div className="mt-3 text-center">
        <span className="text-xs">Already have an account? </span>
        <Link to="/login" className="text-xs text-primary link">
          Login here
        </Link>
      </div>
    </div>
  );
}
