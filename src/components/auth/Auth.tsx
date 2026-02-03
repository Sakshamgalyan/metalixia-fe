"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import DecorativePanel from "./DecorativePanel";
import FormPanel from "./FormPanel";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <DecorativePanel side="login" />
            ) : (
              <FormPanel activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
          </AnimatePresence>
        </div>

        {/* Right side - FormPanel on mobile, switches content on desktop */}
        <div className="relative overflow-hidden min-h-screen">
          <AnimatePresence mode="wait">
            {activeTab === "login" ? (
              <FormPanel activeTab={activeTab} setActiveTab={setActiveTab} />
            ) : (
              <>
                {/* Show DecorativePanel only on large screens */}
                <div className="hidden lg:block h-full">
                  <DecorativePanel side="signup" />
                </div>
                {/* Show FormPanel on mobile */}
                <div className="lg:hidden h-full">
                  <FormPanel
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;
