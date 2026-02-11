"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Lock,
  Camera,
  Save,
  MessageSquare,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import TextArea from "@/components/UI/TextArea";
import DropDown from "@/components/UI/DropDown";
import Card from "@/components/UI/Card";
import { toast } from "sonner";
import {
  updateProfileApi,
  changePasswordApi,
  uploadProfilePictureApi,
} from "@/ApiClient/Profile/profile";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";

const SettingsView = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [post, setPost] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null,
  );
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loading states
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setMobileNo(user.mobileNo || "");
      setPost(user.post || "");
      setDescription((user as any).description || "");
      setAddress((user as any).address || "");
      setProfilePicture((user as any).profilePicture || null);
    }
  }, [user]);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setProfilePictureFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadProfilePicture = async () => {
    if (!profilePictureFile) {
      toast.error("Please select an image first");
      return;
    }

    setIsUploadingPicture(true);
    try {
      const result = await uploadProfilePictureApi(profilePictureFile);
      setProfilePicture(result.filename);
      setProfilePicturePreview(null);
      setProfilePictureFile(null);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploadingPicture(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      await updateProfileApi({
        name,
        email,
        mobileNo,
        post,
        description,
        address,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePasswordApi({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password change failed:", error);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const postOptions = [
    { value: "hr", label: "HR" },
    { value: "manager", label: "Manager" },
    { value: "quality", label: "Quality" },
    { value: "production", label: "Production" },
    { value: "maintenance", label: "Maintenance" },
    { value: "labIncharge", label: "Lab Incharge" },
  ];

  return (
    <div className="p-4 md:p-6 max-w-[95%] mx-auto space-y-6">
      <div className="mb-6">
        <Typography variant="h3" className="mb-2">
          Account Settings
        </Typography>
        <Typography variant="p" textColor="#64748b" className="text-sm">
          Manage your profile information and account settings
        </Typography>
      </div>

      {/* Profile Picture Section */}
      <Card className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-slate-200">
                {profilePicturePreview || profilePicture ? (
                  <img
                    src={
                      profilePicturePreview ||
                      `${process.env.NEXT_PUBLIC_API_BASE_URL}${profilePicture}`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 md:w-12 md:h-12 text-slate-400" />
                )}
              </div>
              <label
                htmlFor="profile-picture-input"
                className="absolute bottom-0 right-0 bg-[#707FDD] text-white p-2 rounded-full cursor-pointer hover:bg-[#5a6bc9] transition-colors shadow-md"
              >
                <Camera className="w-4 h-4" />
              </label>
              <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </div>
            <div>
              <Typography variant="h6" className="mb-1">
                Profile Picture
              </Typography>
              <Typography
                variant="span"
                textColor="#64748b"
                className="text-xs md:text-sm"
              >
                JPG, PNG, GIF or WEBP. Max size 5MB
              </Typography>
            </div>
          </div>
          {profilePictureFile && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleUploadProfilePicture}
              isLoading={isUploadingPicture}
              loadingText="Uploading..."
              leftIcon={<Save className="w-4 h-4" />}
            >
              Upload Photo
            </Button>
          )}
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="p-4 md:p-6">
        <Typography variant="h5" className="mb-4">
          Personal Information
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
            size="sm"
          />
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@metalixia.com"
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            size="sm"
          />
          <Input
            label="Mobile Number"
            type="tel"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            placeholder="1234567890"
            leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
            size="sm"
          />
          <DropDown
            label="Department / Post"
            value={post}
            onChange={(value) => setPost(value as string)}
            options={postOptions}
            placeholder="Select your department"
            leftIcon={<Briefcase className="w-4 h-4 text-slate-400" />}
            size="sm"
            disabled={true}
          />
          <Input
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            size="sm"
          />
        </div>
        <div className="mt-4">
          <Button
            variant="primary"
            size="md"
            onClick={handleSaveProfile}
            isLoading={isSavingProfile}
            loadingText="Saving..."
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Changes
          </Button>
        </div>
      </Card>

      {/* About Me */}
      <Card className="p-4 md:p-6">
        <Typography variant="h5" className="mb-4">
          About Me
        </Typography>
        <div className="space-y-4">
          <TextArea
            label="Bio / Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
            maxLength={500}
          />
          <div className="text-xs text-slate-500 text-right">
            {description.length}/500 characters
          </div>
        </div>
        <div className="mt-4">
          <Button
            variant="primary"
            size="md"
            onClick={handleSaveProfile}
            isLoading={isSavingProfile}
            loadingText="Saving..."
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Change Password */}
      <Card className="p-4 md:p-6">
        <Typography variant="h5" className="mb-4">
          Change Password
        </Typography>
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            size="sm"
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            size="sm"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            size="sm"
          />
        </div>
        <div className="mt-4">
          <Button
            variant="primary"
            size="md"
            onClick={handleChangePassword}
            isLoading={isChangingPassword}
            loadingText="Changing..."
            disabled={!currentPassword || !newPassword || !confirmPassword}
            leftIcon={<Lock className="w-4 h-4" />}
          >
            Change Password
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsView;
