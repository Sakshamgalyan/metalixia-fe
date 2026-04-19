"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Users,
  Briefcase,
  CheckCircle,
  Factory,
  Wrench,
  FlaskConical,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Dropdown from "@/components/UI/DropDown";
import Button from "@/components/UI/Button";
import CheckBox from "@/components/UI/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setError, setLoading } from "@/slices/Auth";
import { registerApi } from "@/ApiClient/Auth/auth";
import { useAuthContext } from "./AuthContext";

const SignUpModal = () => {
  const { signupForm, setSignupForm, setActiveTab } = useAuthContext();
  const {
    name,
    email,
    password,
    mobileNo,
    confirmPassword,
    agreeToTerms,
    post,
  } = signupForm;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    dispatch(setError(""));

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (
      !name || name.length < 3 ||
      !email || !isValidEmail ||
      !mobileNo || mobileNo.length !== 10 ||
      !post ||
      !password || password.length < 8 ||
      password !== confirmPassword ||
      !agreeToTerms
    ) {
      return;
    }

    dispatch(setLoading(true));

    try {
      const response = await registerApi({
        name,
        email,
        mobileNo,
        post,
        password,
      });
      if (response.status === "success") {
        dispatch(setError(""));
        setActiveTab("login");
      } else {
        dispatch(setError(response.message));
      }
    } catch (error: any) {
      dispatch(
        setError(error?.message || "An error occurred during registration"),
      );
    } finally {
      dispatch(setLoading(false));
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
          Register Administrator
        </Typography>
        <Typography
          variant="p"
          weight="normal"
          textColor="#5a67ba"
          className="text-xs"
        >
          Create a new admin account for factory operations
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Full Name"
          name="name"
          type="text"
          size="sm"
          value={name}
          onChange={(e) =>
            setSignupForm((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Employee Name"
          required
          leftIcon={<User className="w-4 h-4 text-slate-400" />}
          hasError={isSubmitted && (!name || name.length < 3)}
          helperText={isSubmitted && !name ? "Name is required" : isSubmitted && name.length < 3 ? "Name must be at least 3 characters" : undefined}
        />

        <Input
          label="Email Address"
          type="email"
          size="sm"
          value={email}
          onChange={(e) =>
            setSignupForm((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="employee@metalixia.com"
          required
          leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
          hasError={isSubmitted && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))}
          helperText={isSubmitted && !email ? "Email is required" : isSubmitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Enter a valid email address" : undefined}
        />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full">
          <Input
            label="Mobile Number"
            name="mobileNo"
            type="text"
            size="sm"
            fullWidth
            value={mobileNo}
            onChange={(e) =>
              setSignupForm((prev) => ({ ...prev, mobileNo: e.target.value }))
            }
            placeholder="90XXXXXX90"
            required
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
            hasError={isSubmitted && (!mobileNo || mobileNo.length !== 10)}
            helperText={isSubmitted && !mobileNo ? "Mobile number is required" : isSubmitted && mobileNo.length !== 10 ? "Mobile number must be exactly 10 digits" : undefined}
          />

          <Dropdown
            label="Department"
            value={post}
            onChange={(value) =>
              setSignupForm((prev) => ({ ...prev, post: value as string }))
            }
            placeholder="Select your department"
            size="sm"
            leftIcon={
              post === "hr" ? (
                <Users className="w-4 h-4 text-slate-400" />
              ) : post === "manager" ? (
                <Briefcase className="w-4 h-4 text-slate-400" />
              ) : post === "quality" ? (
                <CheckCircle className="w-4 h-4 text-slate-400" />
              ) : post === "production" ? (
                <Factory className="w-4 h-4 text-slate-400" />
              ) : post === "maintenance" ? (
                <Wrench className="w-4 h-4 text-slate-400" />
              ) : post === "labIncharge" ? (
                <FlaskConical className="w-4 h-4 text-slate-400" />
              ) : (
                <Users className="w-4 h-4 text-slate-400" />
              )
            }
            options={[
              { value: "hr", label: "HR" },
              { value: "manager", label: "Manager" },
              { value: "quality", label: "Quality" },
              { value: "production", label: "Production" },
              { value: "maintenance", label: "Maintenance" },
              { value: "labIncharge", label: "Lab Incharge" },
            ]}
            hasError={isSubmitted && !post}
            errorMessage={isSubmitted && !post ? "Department is required" : undefined}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) =>
              setSignupForm((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Enter your password"
            size="sm"
            fullWidth
            required
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            rightIcon={
              showPassword ? (
                <EyeOff className="w-4 h-4 text-slate-400" />
              ) : (
                <Eye className="w-4 h-4 text-slate-400" />
              )
            }
            onRightIconClick={() => setShowPassword(!showPassword)}
            hasError={isSubmitted && (!password || password.length < 8)}
            helperText={isSubmitted && !password ? "Password is required" : isSubmitted && password.length < 8 ? "Password must be at least 8 characters" : undefined}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) =>
              setSignupForm((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            placeholder="Confirm your password"
            size="sm"
            fullWidth
            required
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            rightIcon={
              showConfirmPassword ? (
                <EyeOff className="w-4 h-4 text-slate-400" />
              ) : (
                <Eye className="w-4 h-4 text-slate-400" />
              )
            }
            onRightIconClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            hasError={isSubmitted && (!confirmPassword || password !== confirmPassword)}
            helperText={isSubmitted && !confirmPassword ? "Please confirm your password" : isSubmitted && password !== confirmPassword ? "Passwords do not match" : undefined}
          />
        </div>
        <div className="my-4 mx-1">
          <CheckBox
            label="I agree to the Terms & Conditions"
            size="sm"
            checked={agreeToTerms}
            onChange={() =>
              setSignupForm((prev) => ({
                ...prev,
                agreeToTerms: !prev.agreeToTerms,
              }))
            }
          />
        </div>

        <Button
          variant="primary"
          size="md"
          fullWidth
          type="submit"
          disabled={loading || !agreeToTerms}
          isLoading={loading}
          loadingText="Creating..."
        >
          <div className="flex items-center gap-2">
            Create an Account <ArrowRight className="w-5 h-5" />
          </div>
        </Button>
      </form>
    </motion.div>
  );
};

export default SignUpModal;
