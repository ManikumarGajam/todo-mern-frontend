import React, { useState } from 'react';
import API from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/auth/reset-password', { email, newPassword });
            toast.success('Password updated successfully!');
            // Auto redirect to login after success
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-bg d-flex align-items-center justify-content-center vh-100">
            <form onSubmit={handleReset} className="frosted-card px-4 py-5">
                <span
                    className="cancel-icon"
                    onClick={() => navigate('/login')}
                    title="Cancel and go back to login"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/login'); }}
                >
                    &times;
                </span>

                <h2 className="login-title mb-4">Change Password</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        className="input-underline"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="input-underline"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>
                <button
                    type="submit"
                    className="fancy-btn w-100 mt-2 mb-3"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
}
