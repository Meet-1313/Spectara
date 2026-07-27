import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { login } from "../services/authService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import {toast} from 'sonner';
import { useEffect } from "react";


function Login() {
  const navigate = useNavigate();
  const {user,loading} = useAuth();
  useEffect(()=>{
    if(!loading && user){
      navigate("/home",{replace:true});
    }
  },[user,loading,navigate]);
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password, rememberMe });
      if(rememberMe){
        localStorage.setItem('token', data.token);
      }else{
        sessionStorage.setItem('token', data.token);
      }
      // localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Login successful");
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout title="Login" subtitle="Welcome back. Please sign in to continue.">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-200">
            Email Address
          </label>

          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 transition focus-within:border-red-500/70 focus-within:bg-white/10">
            <Mail size={18} className="ml-4 text-zinc-500" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-transparent px-4 py-3.5 text-white placeholder-zinc-500 outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-200">
            Password
          </label>

          <div className="flex items-center  border border-white/10 bg-white/5 transition focus-within:border-red-500/70 focus-within:bg-white/10">
            <Lock size={18} className="ml-4 text-zinc-500" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-transparent px-4 py-3.5 text-white placeholder-zinc-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mr-4 text-zinc-500 transition hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-zinc-400">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4  border-zinc-600 bg-zinc-900 accent-red-500"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-zinc-300 transition hover:text-red-300"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-linear-to-r from-red-500 to-blue-500 py-3.5 font-semibold tracking-wide text-white transition duration-300 hover:-translate-y-px hover:opacity-95"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-white transition hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;