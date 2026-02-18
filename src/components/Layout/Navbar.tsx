"use client";

import { useState } from "react";
import { User, Settings, LogOut } from "lucide-react";
import Accordion from "../UI/Accordion";
import Typography from "../UI/Typography";
import Button from "../UI/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/slices/Auth";
import { useRouter } from "next/navigation";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <nav className="w-full bg-white border-b border-slate-200 shadow-b-lg px-6 py-3">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-4">
          <Accordion
            trigger={
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium overflow-hidden">
                  {(user as any)?.profilePicture ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${(user as any).profilePicture}`}
                      alt={user?.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0).toUpperCase() || "U"
                  )}
                </div>
                <Typography
                  variant="p"
                  weight="medium"
                  textColor="#334155"
                  className="hidden sm:block capitalize text-sm"
                >
                  {user?.name || "User"}
                </Typography>
              </div>
            }
            triggerClassName="hover:bg-slate-50 px-2 py-1.5 rounded-lg transition-colors"
            contentClassName="min-w-[200px]"
            align="right"
          >
            <div className="py-2 px-1 rounded-lg">
              <Button
                variant="menu"
                size="sm"
                fullWidth
                onClick={handleProfile}
                leftIcon={<User className="w-4 h-4" />}
              >
                Profile
              </Button>

              <Button
                variant="menu"
                size="sm"
                fullWidth
                onClick={handleSettings}
                leftIcon={<Settings className="w-4 h-4" />}
              >
                Settings
              </Button>

              <div className="my-1 border-t border-slate-200"></div>

              <Button
                variant="menu"
                size="sm"
                fullWidth
                onClick={handleLogout}
                leftIcon={<LogOut className="w-4 h-4" />}
                textColor="#dc2626"
                className="hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </Accordion>
        </div>
      </div>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
