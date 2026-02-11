import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginModal";
import SignupForm from "./SignUpModal";
import Tab from "../UI/Tab";
import Card from "../UI/Card";
import VerificationForm from "./VerificationForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Factory } from "lucide-react";
import Typography from "../UI/Typography";

const FormPanel = ({ activeTab, setActiveTab }: { activeTab: "login" | "signup" | "verification" | "reset-password"; setActiveTab: (tab: "login" | "signup" | "verification" | "reset-password") => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-2 md:p-2 lg:p-2 bg-white overflow-y-auto"
    >
        {/* Mobile-only Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8 sm:mb-10 w-full max-w-[90%] justify-center">
            <div className="p-2 sm:p-2.5 bg-gradient-to-br from-[#707FDD] to-[#5a67c4] rounded-xl shadow-lg flex-shrink-0">
                <Factory className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex flex-col">
                <Typography variant="h1" weight="semibold" className="leading-tight">
                    Metalixia
                </Typography>
                <Typography variant="p" weight="normal" textColor="#5a67ba" className="text-[10px] sm:text-xs leading-tight">
                    Electronic Metal Refining Works
                </Typography>
            </div>
        </div>
        {/* Tab switcher - Hidden when in verification or reset mode */}
        {activeTab !== "verification" && activeTab !== "reset-password" && (
            <div className="w-full max-w-[80%] mb-4 sm:mb-4">
                <Tab
                    variant="classic"
                    size="md"
                    activeTab={activeTab}
                    items={[
                        { id: "login", label: "Login" },
                        { id: "signup", label: "Register" },
                    ]}
                    onTabChange={(tab) => setActiveTab(tab as "login" | "signup")}
                    fullWidth
                />
            </div>
        )}

        {/* Form container */}
        <div className="w-full max-w-[95%] md:max-w-[80%]">
            <Card variant="elevated">
                <AnimatePresence mode="wait">
                    {activeTab === "login" ? (
                        <LoginForm key="login" onVerificationNeeded={() => setActiveTab("verification")} onForgotPassword={() => setActiveTab("verification")} />
                    ) : activeTab === "signup" ? (
                        <SignupForm key="signup" />
                    ) : activeTab === "verification" ? (
                        <VerificationForm key="verification" onVerified={() => setActiveTab("reset-password")} />
                    ) : (
                        <ResetPasswordForm key="reset-password" onSuccess={() => setActiveTab("login")} />
                    )}
                </AnimatePresence>
            </Card>
        </div>

        {/* Footer */}
        <div className="mt-2 sm:mt-2 text-center">
            <p className="text-[10px] sm:text-xs text-slate-500">
                © 2026 Metalixia Refining Works. All rights reserved.
            </p>
        </div>
    </motion.div>
);

export default FormPanel;

