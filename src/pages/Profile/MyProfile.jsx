// src/pages/Profile/MyProfile.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function MyProfile() {
  const { user, updateProfile } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const submit = async (e) => {
    e.preventDefault();
    await updateProfile({ displayName: name, photoURL: photo });
    setEditing(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
      <div className="card p-6 shadow max-w-md">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} />
            ) : (
              <div className="text-xl">{user?.displayName?.[0] || "U"}</div>
            )}
          </div>
          <div>
            <div className="font-medium">{user?.displayName}</div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
        </div>

        <div className="mt-4">
          {!editing ? (
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Update Profile
            </button>
          ) : (
            <form onSubmit={submit} className="space-y-3 mt-2">
              <div>
                <label className="text-sm">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="text-sm">Photo URL</label>
                <input
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex gap-2">
                <button className="btn btn-success">Save</button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
