"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { loginApi } from "@/ApiClient/Auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setError, getProfile } from "@/slices/Auth";

const LoginModal = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { error } = useSelector((state: RootState) => state.auth);
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await loginApi({ identifier, password });
            if (response.status === "success") {
                await dispatch(getProfile()).unwrap();
            } else {
                dispatch(setError(response.message));   
            }
        } catch (error: any) {
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
                    type="text"
                    value={identifier}
                    label="Email Address / Phone Number"
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="user@metalixia.com / 1234567890"
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
                    >
                        Forgot password?
                    </Button>
                </div>

                <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={isLoading}
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