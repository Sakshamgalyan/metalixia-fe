"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle, CheckCircle2, Building } from "lucide-react";
import Typography from "../UI/Typography";
import Input from "../UI/Input";
import Dropdown from "../UI/DropDown";
import Button from "../UI/Button";
import CheckBox from "../UI/CheckBox";

const SignUpModal = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        department: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const handleChange = () => {
        setSelectedDepartments(selectedDepartments);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!agreeToTerms) {
            setError("Please accept the terms and conditions");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Add your registration logic here
        }, 1500);
    };

    const passwordStrength = () => {
        const password = formData.password;
        if (!password) return { strength: 0, label: "", color: "" };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        const levels = [
            { strength: 0, label: "", color: "" },
            { strength: 1, label: "Weak", color: "bg-red-500" },
            { strength: 2, label: "Fair", color: "bg-orange-500" },
            { strength: 3, label: "Good", color: "bg-yellow-500" },
            { strength: 4, label: "Strong", color: "bg-green-500" },
        ];

        return levels[strength];
    };

    const strength = passwordStrength();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mb-4">
                <Typography variant="h4" weight="medium">
                    Register Administrator
                </Typography>
                <Typography variant="p" weight="normal" textColor="#5a67ba" className="text-xs">
                    Create a new admin account for factory operations
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

            <div className="space-y-3">
                <Input
                    label="Full Name"
                    name="fullName"
                    type="text"
                    size="sm"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    leftIcon={<User className="w-4 h-4 text-slate-400" />}
                />

                <Input
                    label="Email Address"
                    type="email"
                    size="sm"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="[EMAIL_ADDRESS]"
                    required
                    leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                />

                <Dropdown
                    label="Department"
                    value={selectedDepartments}
                    onChange={handleChange}
                    placeholder="Select your department"
                    size="sm"
                    multiple
                    options={[
                        { value: "engineering", label: "Engineering" },
                        { value: "sales", label: "Sales" },
                        { value: "marketing", label: "Marketing" },
                        { value: "human-resources", label: "Human Resources" },
                        { value: "finance", label: "Finance" },
                        { value: "operations", label: "Operations" },
                    ]}
                />

                <Input 
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    size="sm"
                    required
                    leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                    rightIcon={showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                />

                <Input 
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    size="sm"
                    required
                    leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                    rightIcon={showConfirmPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
                {/* Password Strength Indicator */}
                {/* {formData.password && (
                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-600">Password Strength:</span>
                            <span className={`text-xs font-semibold ${strength.strength === 4 ? 'text-green-600' :
                                    strength.strength === 3 ? 'text-yellow-600' :
                                        strength.strength === 2 ? 'text-orange-600' :
                                            'text-red-600'
                                }`}>
                                {strength.label}
                            </span>
                        </div>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={`h-1.5 flex-1 rounded-full ${level <= strength.strength ? strength.color : 'bg-slate-200'
                                        } transition-all`}
                                />
                            ))}
                        </div>
                    </div>
                )}  */}
                <div className="my-4 mx-1">
                    <CheckBox
                        label="I agree to the Terms & Conditions"
                        size="sm"
                        checked={agreeToTerms}
                        onChange={handleChange}
                    />
                </div>

                <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={isLoading}
                    isLoading={isLoading}
                    loadingText="Creating..."
                >
                    <div className="flex items-center gap-2">
                        Create an Account <ArrowRight className="w-5 h-5" />
                    </div>
                </Button>
            </div>
        </motion.div>
    );
};

export default SignUpModal;