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
  User2,
  User2Icon,
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

const SignUpModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [post, setPost] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setError(""));

    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }

    if (!agreeToTerms) {
      dispatch(setError("Please accept the terms and conditions"));
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

      <div className="space-y-3">
        <Input
          label="Full Name"
          name="name"
          type="text"
          size="sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Employee Name"
          required
          leftIcon={<User className="w-4 h-4 text-slate-400" />}
        />

        <Input
          label="Email Address"
          type="email"
          size="sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="employee@metalixia.com"
          required
          leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
        />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full">
          <Input
            label="Mobile Number"
            name="mobileNo"
            type="text"
            size="sm"
            fullWidth
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            placeholder="90XXXXXX90"
            required
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
          />

          <Dropdown
            label="Department"
            value={post}
            onChange={(value) => setPost(value as string)}
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
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          />
        </div>
        <div className="my-4 mx-1">
          <CheckBox
            label="I agree to the Terms & Conditions"
            size="sm"
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)}
          />
        </div>

        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleSubmit}
          disabled={loading || !agreeToTerms || !post || !mobileNo || !name || !email || !password || !confirmPassword}
          isLoading={loading}
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
