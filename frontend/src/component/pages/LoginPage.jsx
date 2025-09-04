import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { toast } from "react-toastify";   // ✅ import toast
import '../../style/register.css'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.loginUser(formData);
            if (response.status === 200) {
                toast.success("🎉 User successfully logged in!", {
                    position: "top-center"
                });
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);

                // ✅ Navigate immediately after toast trigger
                navigate("/profile");
            }
        } catch (error) {
            toast.error(
                error.response?.data.message ||
                error.message ||
                "❌ Unable to login user",
                { position: "top-center" }
            );
        }
    };

    return (
        <div className="register-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Login</button>

                <p className="register-link">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;