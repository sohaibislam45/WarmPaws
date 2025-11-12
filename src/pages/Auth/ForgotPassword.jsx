// src/pages/Auth/ForgotPassword.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    await resetPassword(email);
    // For challenge: open Gmail — we will open compose with search for email (note: user's browser)
    const gmailUrl = `https://mail.google.com/mail/u/0/#search/${encodeURIComponent(
      email
    )}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="card p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Reset password</h2>
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
        <button className="btn btn-primary w-full">Send reset</button>
      </form>
    </div>
  );
}
