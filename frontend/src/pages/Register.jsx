import {useState,useEffect}   from "react";
import { Link,useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import AuthLayout from "../components/AuthLayout";
import {useAuth} from "../context/AuthContext";
function Register() {
    const navigate = useNavigate();
    const {user,loading} = useAuth();
      useEffect(()=>{
        if(!loading && user){
          navigate("/home",{replace:true});
        }
      },[user,loading,navigate]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const data = await register({username,email,password});
            toast.success(data.message || 'Registration successful');
            navigate('/');
        }catch(error){
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    }

  return (
    <AuthLayout
    title="Create Account"
    subtitle="Create your account to start discovering and reviewing movies."
  >
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-zinc-200"
        >
          Username
        </label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-400/60 focus:bg-white/10"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-zinc-200"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-400/60 focus:bg-white/10"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-zinc-200"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-400/60 focus:bg-white/10"
        />
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-red-500 to-blue-500 py-3.5 font-semibold text-white transition hover:opacity-90"
      >
        Create Account
      </button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>

        <div className="relative flex justify-center">
          <span className="bg-zinc-950 px-3 text-xs text-zinc-500">
            OR
          </span>
        </div>
      </div>

      <p className="text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-white hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  </AuthLayout>
  );
}

export default Register;