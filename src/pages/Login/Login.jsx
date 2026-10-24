import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, LogIn, Mail, Sparkles } from "lucide-react";
import { loginAsync } from "../../store/slices/authSlice";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await dispatch(loginAsync(form)).unwrap();
            navigate("/student");
        } catch (message) {
            setError(typeof message === "string" ? message : "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto px-4 py-10">
            <div className="card bg-base-100/90 backdrop-blur border border-base-300 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="card-body p-6 sm:p-10 relative z-10">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                            <Sparkles className="w-3.5 h-3.5" /> Welcome Back
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                            <span className="gradient-text">Sign In to CourseMaster</span>
                        </h1>
                        <p className="text-sm text-base-content/70 mt-2">
                            Enter your credentials to access your courses and dashboard.
                        </p>
                    </div>

                    {error && (
                        <div className="alert alert-error shadow-md text-sm p-3 mb-4 rounded-xl">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label" htmlFor="login-email">
                                <span className="label-text font-semibold flex items-center gap-1.5">
                                    <Mail className="w-4 h-4 text-primary" /> Email Address
                                </span>
                            </label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="input input-bordered w-full focus:input-primary"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label" htmlFor="login-password">
                                <span className="label-text font-semibold flex items-center gap-1.5">
                                    <Lock className="w-4 h-4 text-primary" /> Password
                                </span>
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    id="login-password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full focus:input-primary pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute right-3 text-base-content/50 hover:text-base-content"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-primary w-full btn-lg shadow-lg hover:shadow-xl mt-6 gap-2 font-bold"
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-md"></span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" /> Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-6 pt-4 border-t border-base-300">
                        <p className="text-sm text-base-content/70">
                            Don&apos;t have an account?{" "}
                            <Link className="link link-primary font-bold ml-1" to="/register">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
