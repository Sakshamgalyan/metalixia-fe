"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PanelLeft } from "lucide-react";
import Skeleton from "../UI/Skeleton";
import Button from "../UI/Button";
import Typography from "../UI/Typography";
import { menuItems } from "./Constants";
import { useAppSelector } from "@/store/hooks";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.auth);
  const role = user?.role;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading || !user) {
    return (
      <div
        className={`h-screen bg-slate-50 border-r border-slate-200 p-4 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="mb-8 flex items-center gap-3">
          <Skeleton width="40px" height="40px" variant="circular" />
          {!isCollapsed && <Skeleton width="120px" height="20px" />}
        </div>

        <div className="mb-6">
          {!isCollapsed && (
            <Skeleton width="60px" height="14px" className="mb-4" />
          )}
          <div className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-3 px-3 py-2">
                <Skeleton width="20px" height="20px" variant="rectangular" />
                {!isCollapsed && <Skeleton width="100px" height="16px" />}
              </div>
            ))}
          </div>
        </div>

        <div>
          {!isCollapsed && (
            <Skeleton width="70px" height="14px" className="mb-4" />
          )}
          <div className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-3 px-3 py-2">
                <Skeleton width="20px" height="20px" variant="rectangular" />
                <Skeleton width="100px" height="16px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen bg-slate-50 border-r border-slate-200 p-4 transition-all duration-300 flex flex-col ${isCollapsed ? "w-22" : "w-64"}`}
    >
      <div className="mb-6 flex items-center justify-between flex-shrink-0">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}
        >
          <div className="w-10 h-10 rounded-full bg-[#5a67ba] flex items-center justify-center text-white font-semibold">
            M
          </div>
          {!isCollapsed && (
            <Typography variant="h6" weight="medium" textColor="#334155">
              METALIXIA
            </Typography>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            title="Collapse sidebar"
          >
            <PanelLeft className="w-5 h-5 text-slate-600" />
          </button>
        )}
      </div>

      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full mb-6 p-2 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
          title="Expand sidebar"
        >
          <PanelLeft className="w-5 h-5 text-slate-600" />
        </button>
      )}

      <div className="flex-1 overflow-y-auto -mx-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {menuItems.map((section, sectionIndex) => {
          const visibleItems = section.items.filter((item) => {
            return !item.visible || (role && item.visible.includes(role));
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={sectionIndex} className="mb-4">
              {!isCollapsed && (
                <Typography
                  variant="small"
                  weight="semibold"
                  textColor="#94a3b8"
                  className="uppercase tracking-wider mb-2 px-3 block"
                >
                  {section.title}
                </Typography>
              )}
              <div className="">
                {visibleItems.map((item, itemIndex) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={itemIndex}
                      variant="tertiary"
                      fullWidth
                      leftIcon={
                        <span
                          className={
                            isActive ? "text-[#5a67ba]" : "text-slate-400"
                          }
                        >
                          {item.icon}
                        </span>
                      }
                      className={`${
                        isActive
                          ? "!bg-[#a3adf3ff]/20 !text-[#5a67ba] hover:!bg-[#a3adf3ff]/30"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      } ${isCollapsed ? "justify-center pr-9 mr-1" : ""}`}
                      title={isCollapsed ? item.label : ""}
                      onClick={() => router.push(item.href)}
                    >
                      {!isCollapsed && item.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
