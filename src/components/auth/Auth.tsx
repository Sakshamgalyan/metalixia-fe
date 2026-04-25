'use client';

import { AnimatePresence } from 'framer-motion';
import DecorativePanel from './DecorativePanel';
import FormPanel from './FormPanel';
import { AuthProvider, useAuthContext } from './AuthContext';

const AuthContent = () => {
  const { activeTab } = useAuthContext();

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'login' ||
            activeTab === 'verification' ||
            activeTab === 'reset-password' ? (
              <DecorativePanel side="login" />
            ) : (
              <FormPanel />
            )}
          </AnimatePresence>
        </div>

        {/* Right side - FormPanel on mobile, switches content on desktop */}
        <div className="relative overflow-hidden min-h-screen">
          <AnimatePresence mode="wait">
            {activeTab === 'login' ||
            activeTab === 'verification' ||
            activeTab === 'reset-password' ? (
              <FormPanel />
            ) : (
              <>
                {/* Show DecorativePanel only on large screens */}
                <div className="hidden lg:block h-full">
                  <DecorativePanel side="signup" />
                </div>
                {/* Show FormPanel on mobile */}
                <div className="lg:hidden h-full">
                  <FormPanel />
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Auth = () => {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
};

export default Auth;
