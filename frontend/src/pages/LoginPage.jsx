import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Loader2, MessageSquare, Phone, KeyRound } from "lucide-react";

const LoginPage = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });
  const { sendOtp, verifyOtp, isSendingOtp, isVerifyingOtp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!showOtpInput) {
      // Step 1: Send OTP
      const success = await sendOtp({ phone: formData.phone });
      if (success) setShowOtpInput(true);
    } else {
      // Step 2: Verify OTP
      await verifyOtp(formData);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                {showOtpInput ? "Enter the code sent to your phone" : "Sign in with your phone number"}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!showOtpInput ? (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Phone Number</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="tel"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">One-Time Password (OTP)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="Enter 6-digit code"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSendingOtp || isVerifyingOtp}
            >
              {isSendingOtp || isVerifyingOtp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : showOtpInput ? (
                "Verify & Login"
              ) : (
                "Send OTP"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <span className="text-base-content/40">It will be created automatically!</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Secure & Instant"}
        subtitle={"Login seamlessly using your mobile number. No passwords to remember!"}
      />
    </div>
  );
};
export default LoginPage;


