import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ApiService from "../../service/ApiService";
import "react-toastify/dist/ReactToastify.css";
import "../../style/otppage.css"; 

const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const response = await ApiService.verifyOtp({ email, otp });

      if (response.status === 200) {
        toast.success(`${response.message} Woohoo 🎉`, { autoClose: 2000 });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    }
  };

  // If no email was passed (user landed directly), redirect
  if (!email) {
    navigate("/register");
    return null;
  }

  return (
    <div className="otp-page">
      <div className="otp-card">
        <h2>Enter OTP</h2>
        <p className="otp-subtext">
          OTP sent to: <strong>{email}</strong>
        </p>

        <form className="otp-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="otp-input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter OTP"
          />
          <button type="submit" className="otp-button">
            Verify OTP
          </button>
        </form>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default OtpPage;