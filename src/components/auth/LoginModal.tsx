"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { forgotPasswordApi, loginApi, profileApi, sendOtpApi } from "@/ApiClient/Auth/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setError, setUser } from "@/slices/Auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginModal = ({ onVerificationNeeded, onForgotPassword }: { onVerificationNeeded?: () => void, onForgotPassword?: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!identifier) {
            toast.error("Please enter your email address first");
            return;
        }
        try {
            await forgotPasswordApi({ email: identifier });
            dispatch(setUser({ email: identifier } as any));
            if (onForgotPassword) onForgotPassword();
        } catch (error) {
            console.error("Forgot password error:", error);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await loginApi({ identifier, password });
            if (response.status === "success") {
                const user = await profileApi();

                dispatch(setUser(user));

                if (user.isVerified) {
                    router.push("/");
                } else {
                    if (onVerificationNeeded) {
                        try {
                            await sendOtpApi({ email: user.email });
                            onVerificationNeeded();
                        } catch (otpError) {
                            console.error("Failed to send OTP:", otpError);
                            onVerificationNeeded();
                        }
                    } else {
                        router.push("/not-access");
                    }
                }
            } else {
                dispatch(setError(response.message));
            }
        } catch (error: any) {
            if (error?.response?.status === 401 &&
                error?.response?.data?.message === "Email not verified. Please verify your email to continue."
            ) {
                if (onVerificationNeeded) {
                    try {
                        const email = identifier;
                        await sendOtpApi({ email });
                        dispatch(setUser({ email } as any));

                        onVerificationNeeded();
                        return;
                    } catch (otpError) {
                        console.error("Failed to send OTP:", otpError);
                    }
                }
            }

            dispatch(setError(error?.message || "An error occurred during login"));
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
            <div className="mb-4">
                <Typography variant="h4" weight="medium">
                    Administrator Login
                </Typography>
                <Typography variant="p" weight="normal" textColor="#5a67ba" className="text-xs">
                    Sign in to access the factory management system
                </Typography>
            </div>

            <div className="space-y-4">
                <Input
                    type="email"
                    value={identifier}
                    label="Email Address"
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="user@metalixia.com"
                    required
                    size="sm"
                    leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                />

                <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    size="sm"
                    leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                    rightIcon={showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                />

                <div className="flex items-center justify-end">
                    <Button
                        variant="link"
                        size="md"
                        type="button"
                        className="text-sm transition-colors duration-200"
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        onClick={handleForgotPassword}
                    >
                        Forgot password?
                    </Button>
                </div>

                <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={isLoading || !identifier || !password}
                    isLoading={isLoading}
                    loadingText="Logging in..."

                >
                    <div className="flex items-center gap-2">
                        Login <ArrowRight className="w-5 h-5" />
                    </div>
                </Button>
            </div>
        </motion.div>
    );
};

export default LoginModal;