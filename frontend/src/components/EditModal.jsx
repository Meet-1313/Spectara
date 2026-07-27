import { useEffect, useState } from "react";
import {
  updateProfile,
  changePassword,
} from "../services/authService";
import {toast} from 'sonner';

function EditProfileModal({
  show,
  onClose,
  profileData,
  setProfileData,
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profileData) {
      setUsername(profileData.username);
      setEmail(profileData.email);
    }
  }, [profileData]);

  if (!show) return null;

  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await updateProfile(
        username,
        email,
        token
      );

      setProfileData((prev) => ({
        ...prev,
        username: response.user.username,
        email: response.user.email,
      }));

      if (showPassword) {
        if (newPassword !== confirmPassword) {
          alert("Passwords do not match.");
          setSaving(false);
          return;
        }

        await changePassword(
          currentPassword,
          newPassword,
          token
        );
      }

      toast.success("Profile updated successfully!");

      onClose();

    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Update your account information.
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-2xl text-zinc-400 hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* Username */}

        <div className="mb-5">

          <label className="mb-2 block text-sm text-zinc-400">
            Username
          </label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-red-500"
          />

        </div>

        {/* Email */}

        <div className="mb-8">

          <label className="mb-2 block text-sm text-zinc-400">
            Email
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-red-500"
          />

        </div>

        {/* Password Section */}

        <button
          onClick={() => setShowPassword(!showPassword)}
          className="btn"
        >
          <span className="font-semibold">
            🔒 Change Password
          </span>

          <span>
            {showPassword ? "▲" : "▼"}
          </span>

        </button>

        {showPassword && (

          <div className="space-y-4">

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none focus:border-red-500"
            />

          </div>

        )}

        {/* Footer */}

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="btn"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={handleSave}
            className="btn"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProfileModal;