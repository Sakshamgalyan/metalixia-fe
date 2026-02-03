import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginModal";
import SignupForm from "./SignUpModal";
import Tab from "../UI/Tab";
import Card from "../UI/Card";

const FormPanel = ({ activeTab, setActiveTab }: { activeTab: "login" | "signup"; setActiveTab: (tab: "login" | "signup") => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-2 md:p-2 lg:p-2 bg-white"
    >
        {/* Tab switcher */}
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

        {/* Form container */}
        <div className="w-full max-w-[95%] md:max-w-[80%]">
                <Card variant="elevated">
                <AnimatePresence mode="wait">
                    {activeTab === "login" ? (
                        <LoginForm key="login" />
                    ) : (
                        <SignupForm key="signup" />
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

