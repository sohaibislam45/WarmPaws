import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function MyProfile() {
  const { user, updateProfile, logout } = useContext(AuthContext);

  // Local state for the edit form (initialized from context user)
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  // Keep form values in sync when user context changes (important)
  useEffect(() => {
    setName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
  }, [user?.displayName, user?.photoURL]);

  // Handle update submit
  const handleUpdate = async (e) => {
    e && e.preventDefault();
    // Basic validation: name optional, but photoURL if present should be a string
    if (photoURL && typeof photoURL !== "string") {
      toast.error("Invalid photo URL");
      return;
    }

    try {
      setLoading(true);
      // call AuthProvider.updateProfile — should call firebase updateProfile + reload
      const updated = await updateProfile({
        displayName: name || null,
        photoURL: photoURL || null,
      });

      // updateProfile should update context; but we also update local state to be safe
      setName(updated?.displayName || "");
      setPhotoURL(updated?.photoURL || "");
      toast.success("Profile updated");
      setEditing(false);
    } catch (err) {
      console.error("Update profile failed:", err);
      toast.error(err?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-center">
        <div>
          <h2 className="text-2xl font-semibold">No user logged in</h2>
          <p className="text-gray-500 mt-2">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary bg-gray-100 flex items-center justify-center">
            {user.photoURL ? (
              // image tag will fallback to icon if it errors via onError
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="object-cover w-full h-full"
                onError={(e) => {
                  // hide broken image so icon appears
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <FaUserAlt className="text-gray-400 text-4xl" />
            )}
          </div>

          <h2 className="text-xl font-semibold mt-4">
            {user.displayName || "Unnamed User"}
          </h2>
          <p className="text-gray-500">{user.email}</p>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => setEditing((s) => !s)}
              className="btn btn-primary btn-lg flex-1"
            >
              {editing ? "Cancel" : "Update Profile"}
            </button>

            <button
              onClick={async () => {
                try {
                  await logout();
                  // optional: redirect/home refresh
                  window.location.href = "/";
                } catch (err) {
                  toast.error(err?.message || "Logout failed");
                }
              }}
              className="btn btn-outline btn-sm"
            >
              Logout
            </button>
          </div>

          {/* Edit form (inline) */}
          {editing && (
            <form onSubmit={handleUpdate} className="mt-6 w-full space-y-3">
              <div>
                <label className="text-sm block mb-1">Display Name</label>
                <input
                  name="displayName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Full name (optional)"
                />
              </div>

              <div>
                <label className="text-sm block mb-1">Photo URL</label>
                <input
                  name="photoURL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="https://example.com/avatar.jpg (optional)"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Use a direct image URL
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn btn-success btn-sm flex-1"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setName(user?.displayName || "");
                    setPhotoURL(user?.photoURL || "");
                    setEditing(false);
                  }}
                  className="btn btn-ghost btn-sm"
                  disabled={loading}
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
