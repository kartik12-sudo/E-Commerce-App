import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../../service/ApiService";
import 'react-toastify/dist/ReactToastify.css';
import '../../style/register.css'; // reuse your existing styles

const OtpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email; // get email from registration page

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
                toast.success("Registered Successfully!");
                setTimeout(() => {
                    navigate("/login"); // redirect after toast
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP");
        }
    };

    return (
        <div className="register-page">
            <h2>Enter OTP</h2>
            <p>OTP sent to: <strong>{email}</strong></p>
            <form onSubmit={handleSubmit}>
                <label>OTP:</label>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type="submit">Verify OTP</button>
            </form>
        </div>
    );
};

export default OtpPage;