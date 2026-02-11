"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { resetPasswordApi } from "@/ApiClient/Auth/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";

interface ResetPasswordFormProps {
    onSuccess: () => void;
}

const ResetPasswordForm = ({ onSuccess }: ResetPasswordFormProps) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (!user?.email) {
            toast.error("User email not found. Please start over.");
            return;
        }

        setIsLoading(true);
        try {
            // We assume the OTP was already verified and stored or we need it here.
            // Based on backend, reset-password needs email, otp, and new password.
            // We need to pass the OTP from VerificationForm to here.
            // Let's check how we can get the OTP.
            // For now, let's assume we might have it in sessionStorage or similar if not in redux.
            // Actually, the prompt said "if otp is correct then new password will be set".
            // So reset-password should probably be called with the OTP.

            const otp = sessionStorage.getItem("reset_otp");
            if (!otp) {
                toast.error("Session expired. Please verify OTP again.");
                onSuccess(); // Go back to login
                return;
            }

            const response = await resetPasswordApi({
                email: user.email,
                otp,
                password
            });

            if (response.status === "success") {
                sessionStorage.removeItem("reset_otp");
                onSuccess();
            }
        } catch (error) {
            console.error("Reset password error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mb-6">
                <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <Typography variant="h4" weight="medium" className="text-center">
                    Set New Password
                </Typography>
                <Typography variant="p" weight="normal" textColor="#5a67ba" className="text-xs mt-2 text-center">
                    Please enter your new password below
                </Typography>
            </div>

            <div className="space-y-4">
                <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    label="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    size="sm"
                    leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                    rightIcon={showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                />

                <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    label="Confirm New Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    size="sm"
                    leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                />

                <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={isLoading}
                    isLoading={isLoading}
                    loadingText="Resetting..."
                >
                    <div className="flex items-center gap-2">
                        Reset Password <ArrowRight className="w-5 h-5" />
                    </div>
                </Button>
            </div>
        </motion.div>
    );
};

export default ResetPasswordForm;
