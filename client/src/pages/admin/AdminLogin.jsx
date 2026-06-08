import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.message || 'Invalid Credentials');
            }
        } catch (err) {
            setError('Failed to connect to server');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

            <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md text-center relative z-10">
                {/* Logo */}
                <div className="mb-6">
                    <img src="/logo.png" alt="AMRA Geogreen" className="h-16 w-auto mx-auto bg-white p-2 rounded-sm" />
                </div>

                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-primary/30">
                    <Lock size={32} />
                </div>

                <h2 className="text-3xl font-heading font-extrabold text-secondary mb-2 uppercase tracking-tight">Admin Portal</h2>
                <p className="text-slate-500 mb-8 font-body">Secure access for authorized personnel only.</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && <div className="bg-red-100 text-red-600 p-3 rounded-sm mb-4 text-sm font-bold">{error}</div>}
                    <div className="text-left">
                        <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase tracking-wider">Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body mb-4"
                        />
                    </div>
                    <div className="text-left">
                        <label className="block text-sm font-heading font-semibold text-slate-700 mb-2 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body"
                        />
                    </div>
                    <button type="submit" className="w-full btn bg-primary hover:bg-primary-dark text-white font-heading font-bold uppercase tracking-wider px-6 py-4 rounded-sm transition-all flex items-center justify-center gap-2">
                        Login to Dashboard <ArrowRight size={18} />
                    </button>
                </form>

                <p className="mt-6 text-xs text-slate-400">© 2024 AMRA Geogreen Works Pvt Ltd</p>
            </div>
        </div>
    );
};

export default AdminLogin;
