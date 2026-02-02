"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import Typography from "../UI/Typography";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { API_BASE_URL } from "@/lib/constants";
import ApiClient from "@/lib/apiClient";

const LoginModal = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const response = await ApiClient.post(`${API_BASE_URL}/auth/login`, {
                identifier,
                password,
            });
            
        } catch (error) {
            setError("An error occurred during login");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
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

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                >
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700">{error}</p>
                </motion.div>
            )}

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