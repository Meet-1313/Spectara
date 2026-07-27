import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import MovieSection from "../components/MovieSection";
import { getProfile, uploadProfileImage } from "../services/profileService";
import { getMovieDetails } from "../services/movieService";
import {
  updateProfile,
  changePassword,
} from "../services/authService";
import EditModal from "../components/EditModal";

function Profile() {

  const [profileData, setProfileData] = useState(null);

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  const [activeTab, setActiveTab] = useState("favorites");

  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const data = await getProfile();
        console.log(data);

        setProfileData(data.profile);

        setProfileData(data.profile);


        const favoritePromises = data.profile.favorites.map(movie =>
          getMovieDetails(movie.movie_id)
        );

        const watchlistPromises = data.profile.watchlist.map(movie =>
          getMovieDetails(movie.movie_id)
        );

        const favorites = await Promise.all(favoritePromises);
        const watchlist = await Promise.all(watchlistPromises);

        setFavoriteMovies(favorites);
        setWatchlistMovies(watchlist);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const data = await uploadProfileImage(file);

      setProfileData((prev) => ({
        ...prev,
        profile_image: data.imageUrl,
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    }
  };

  // const handleUpdateProfile = async () => {

  //   try {

  //     const token = localStorage.getItem("token");

  //     const response = await updateProfile(
  //       username,
  //       email,
  //       token
  //     );

  //     setProfileData(response.user);

  //     setEditing(false);

  //     alert("Profile updated successfully");

  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to update profile");

  //   }
  // };



  // const handleChangePassword = async () => {

  //   if (newPassword !== confirmPassword) {

  //     alert("Passwords do not match");

  //     return;

  //   }
  //   try {

  //     const token = localStorage.getItem("token");

  //     await changePassword(
  //       currentPassword,
  //       newPassword,
  //       token
  //     );

  //     setCurrentPassword("");
  //     setNewPassword("");
  //     setConfirmPassword("");

  //     setChangingPassword(false);

  //     alert("Password updated successfully");

  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to change password");

  //   }
  // };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-950"></div>
      </div>
    );

  }


  return (
    <Layout>

      {/* Profile Card */}
      <div className="mb-10   border-zinc-800  p-10 shadow-xl">

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">

          {/* Avatar */}
          <div className="flex w-full shrink-0 flex-col items-center lg:w-40">

            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-gray-900 text-5xl font-bold">
              {profileData.profile_image ? (
                <img
                  src={profileData.profile_image}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (profileData.username.charAt(0).toUpperCase())}
            </div>

            <h1 className="mt-4 text-2xl font-bold text-center">
              {profileData.username}

            </h1>
            <button
              onClick={() => fileInputRef.current.click()}
              className="mt-3 rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium transition hover:bg-zinc-700"
            >
              Change Photo
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfileImageUpload}
              className="hidden"
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-1 flex-col gap-6">

            <div className="flex items-center">
              <span className="w-14 font-semibold text-zinc-300">
                Email:
              </span>

              <span className="text-zinc-400">
                {profileData.email}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-22 font-semibold text-zinc-300">
                Username:
              </span>

              <span className="text-zinc-300">
                {profileData.username}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-30 font-semibold text-zinc-300">
                Member Since:
              </span>

              <span className="text-zinc-400">
                {new Date(profileData.created_at).toLocaleDateString()}
              </span>
            </div>

            <button
              onClick={() => setShowEditModal(true)}
              className="btn"
            >
              Edit Profile
            </button>

          </div>

        </div>

      </div>

      {/* Tabs */}

      <div className="  border border-zinc-800">

        <div className="grid grid-cols-2">

          <button
            onClick={() => setActiveTab("favorites")}
            className={`py-10 transition ${activeTab === "favorites"
              ? " text-white"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
          >
            <h2 className="text-xl font-bold">
              Favorites ({favoriteMovies.length})
            </h2>
          </button>

          <button
            onClick={() => setActiveTab("watchlist")}
            className={`py-10 transition ${activeTab === "watchlist"
              ? " text-white"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
          >
            <h2 className="text-xl font-bold">
              Watchlist ({watchlistMovies.length})
            </h2>
          </button>

        </div>

      </div>

      <MovieSection
        title={
          activeTab === "favorites"
            ? "Favorite Movies"
            : "Watchlist"
        }
        movies={
          activeTab === "favorites"
            ? favoriteMovies
            : watchlistMovies
        }
      />

      <EditModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        profileData={profileData}
        setProfileData={setProfileData}
      />

    </Layout>
  );
}
export default Profile;