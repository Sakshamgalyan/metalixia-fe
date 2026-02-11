"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, RefreshCcw } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import { verifyOtpApi, sendOtpApi } from "@/ApiClient/Auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const VerificationForm = ({ onVerified }: { onVerified?: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.every((char) => !isNaN(Number(char)))) {
      const newOtp = [...otp];
      pastedData.forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!user?.email) {
      toast.error("User email not found. Please login again.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtpApi({
        email: user.email,
        otp: otpString,
      });

      if ((response as any).status === "success") {
        if (onVerified) {
          sessionStorage.setItem("reset_otp", otpString);
          onVerified();
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      // Error is handled by the API client toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!user?.email) return;

    setIsResending(true);
    try {
      await sendOtpApi({ email: user.email });
      setTimer(30);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Resend error:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 text-center">
        <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-6 h-6 text-blue-600" />
        </div>
        <Typography variant="h4" weight="medium">
          Verify Your Email
        </Typography>
        <Typography
          variant="p"
          weight="normal"
          textColor="#5a67ba"
          className="text-xs mt-2 flex gap-1"
        >
          We've sent a 6-digit code to
          <span className="font-semibold text-slate-700">
            {user?.email || "your email"}
          </span>
        </Typography>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder-slate-300"
            />
          ))}
        </div>

        <div className="flex items-center justify-center">
          {timer > 0 ? (
            <p className="text-sm text-slate-500">
              Resend code in{" "}
              <span className="font-medium text-slate-700">{timer}s</span>
            </p>
          ) : (
            <Button
              variant="link"
              size="md"
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-sm"
              leftIcon={
                <RefreshCcw
                  className={`w-3 h-3 ${isResending ? "animate-spin" : ""}`}
                />
              }
            >
              Resend Verification Code
            </Button>
          )}
        </div>

        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleVerify}
          disabled={isLoading || otp.join("").length !== 6}
          isLoading={isLoading}
          loadingText="Verifying..."
        >
          <div className="flex items-center gap-2">
            Verify Email <ArrowRight className="w-5 h-5" />
          </div>
        </Button>
      </div>
    </motion.div>
  );
};

export default VerificationForm;
