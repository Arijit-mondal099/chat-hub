import { useAuthStore } from "../store/useAuthStore.js";
import { Camera, Mail, User } from "lucide-react";
import { avatar } from "../assets";
import { useState } from "react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImage = async (e) => {
    try {
      const image = e.target.files[0];
      if (!image) return;

      setUploadedImage(URL.createObjectURL(image));

      const formData = new FormData();
      formData.append("profilePic", image);

      updateProfile(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen pt-20 p-2 overflow-auto">
      <div className="w-full max-w-xl mx-auto bg-base-300 rounded-lg">
        {/* profile section */}
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="mt-5 text-2xl font-semibold">
            Hello {authUser?.fullName?.split(" ")[0]}
          </h1>
          <p className="text-sm text-zinc-400">Your profile information</p>

          <div className="relative mt-5">
            <img
              src={uploadedImage || authUser?.profilePic || avatar}
              alt="avatar"
              className="size-32 rounded-full object-cover object-top border-4"
            />

            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                hidden
                onChange={handleImage}
              />
            </label>
          </div>

          <p className="text-sm text-zinc-400 mt-2">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your photo"}
          </p>
        </div>

        {/* fullName & email section */}
        <div className="w-full flex flex-col gap-4 p-4">
          <div className="w-full space-y-1">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </div>
            <div className="border px-4 py-2.5 rounded-lg bg-base-200">
              <p>{authUser?.fullName}</p>
            </div>
          </div>

          <div className="w-full space-y-1">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </div>
            <div className="border px-4 py-2.5 rounded-lg bg-base-200">
              <p>{authUser?.email}</p>
            </div>
          </div>
        </div>

        {/* Account Information section */}
        <div className="mt-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Account Information</h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
