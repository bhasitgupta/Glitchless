"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string) || "Developer";
    const email = formData.get("email") as string;

    setTimeout(() => {
      login({
        id: "user_" + Date.now(),
        name,
        email,
        avatar: "",
      });
      router.push("/dashboard");
    }, 500);
  };

  return (
    <>
      <AnimatedBackground />
      <Link
        href="/"
        className="fixed top-8 left-8 text-2xl font-bold text-[#c9d1d9] no-underline z-[100] transition-all hover:text-[#58a6ff] hover:scale-105"
      >
        <Image src="/logo.png" width={32} height={32} alt="Glitchless Logo" className="drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] inline-block align-middle" />
        <span className="font-bold bg-gradient-to-r from-white via-sky-200 to-cyan-400 bg-clip-text text-transparent">Glitchless</span>
      </Link>
      <Link
        href="/"
        className="fixed top-8 right-8 text-[#58a6ff] no-underline font-medium transition-all hover:bg-[rgba(88,166,255,0.1)] px-4 py-2 rounded-md z-[100] hover:-translate-x-1"
      >
        Back to home
      </Link>
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-12 items-center">
          {/* Animated Side */}
          <div className="hidden md:flex flex-col items-center justify-center w-[300px]">
            <div className="flex items-center justify-center">
              <Image src="/logo.png" width={120} height={120} alt="Glitchless Logo" className="animate-[logoFloat_3s_ease-in-out_infinite] drop-shadow-[0_0_60px_rgba(0,242,255,0.6)]" />
            </div>
            <div className="relative w-[200px] h-[200px]">
              <div className="absolute w-full h-full border-2 border-[rgba(0,242,255,0.3)] rounded-full animate-[rotate_8s_linear_infinite] shadow-[0_0_15px_rgba(0,242,255,0.3)]"></div>
              <div className="absolute w-[70%] h-[70%] top-[15%] left-[15%] border-2 border-[rgba(16,185,129,0.4)] rounded-full animate-[rotate_6s_linear_infinite_reverse] shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
              <div className="absolute w-[40%] h-[40%] top-[30%] left-[30%] border-2 border-[rgba(242,0,255,0.4)] rounded-full animate-[rotate_4s_linear_infinite] shadow-[0_0_15px_rgba(242,0,255,0.3)]"></div>
            </div>
          </div>

          <div className="flex-1 flex gap-8 items-stretch">
            {/* Sign In Card */}
            <div className="flex-1 bg-transparent border border-[rgba(48,54,61,0.3)] rounded-md p-12 transition-all duration-300 animate-[slideInUp_0.5s_ease-out] hover:border-[#58a6ff] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(88,166,255,0.15)] flex flex-col justify-center min-h-[500px]">
              <svg className="block mx-auto mb-8 w-16 h-16 transition-transform hover:scale-110 hover:rotate-[5deg]" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <h1 className="text-3xl font-semibold text-center mb-2 text-[#c9d1d9]">Sign in</h1>
              <p className="text-center text-[#8b949e] mb-8">Enter your credentials to access your account</p>

              <form onSubmit={handleSubmit}>
                <input type="hidden" name="mode" value="login" />
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-3 text-base text-[#c9d1d9] font-medium">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3 bg-black border border-[#30363d] rounded-md text-white text-base transition-all focus:outline-none focus:border-[#58a6ff] focus:shadow-[0_0_0_3px_rgba(88,166,255,0.15)] focus:-translate-y-0.5 hover:border-[#8b949e] placeholder:text-gray-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-3 text-base text-[#c9d1d9] font-medium">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 bg-black border border-[#30363d] rounded-md text-white text-base transition-all focus:outline-none focus:border-[#58a6ff] focus:shadow-[0_0_0_3px_rgba(88,166,255,0.15)] focus:-translate-y-0.5 hover:border-[#8b949e] placeholder:text-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#2ea44f] text-white border border-[rgba(27,31,35,0.15)] rounded-md text-base font-semibold cursor-pointer transition-all hover:bg-[#2c974b] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(46,164,79,0.4)] active:bg-[#298e46] mt-4 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Sign in"}
                </button>
              </form>
            </div>

            {/* Connector */}
            <div className="hidden md:flex flex-col items-center justify-center px-4">
              <div className="w-0.5 h-[100px] bg-gradient-to-b from-transparent via-[#58a6ff] to-transparent animate-[pulseLine_2s_ease-in-out_infinite]"></div>
              <div className="w-3 h-3 bg-[#58a6ff] rounded-full my-2 animate-[bounceDot_1s_ease-in-out_infinite] shadow-[0_0_15px_rgba(88,166,255,0.6)]"></div>
              <div className="w-0.5 h-[100px] bg-gradient-to-b from-transparent via-[#58a6ff] to-transparent animate-[pulseLine_2s_ease-in-out_infinite]"></div>
            </div>

            {/* Sign Up Card */}
            <div className="flex-1 bg-transparent border border-[rgba(48,54,61,0.3)] rounded-md p-12 transition-all duration-300 animate-[slideInUp_0.5s_ease-out_0.2s_backwards] hover:border-[#58a6ff] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(88,166,255,0.15)] flex flex-col justify-center min-h-[500px]">
              <svg className="block mx-auto mb-8 w-16 h-16 transition-transform hover:scale-110 hover:rotate-[5deg]" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <h1 className="text-3xl font-semibold text-center mb-2 text-[#c9d1d9]">Sign up</h1>
              <p className="text-center text-[#8b949e] mb-8">Create your account to get started</p>

              <form onSubmit={handleSubmit}>
                <input type="hidden" name="mode" value="signup" />
                <div className="mb-4">
                  <label htmlFor="signup-name" className="block mb-3 text-base text-[#c9d1d9] font-medium">Username</label>
                  <input
                    type="text"
                    id="signup-name"
                    name="name"
                    placeholder="Username"
                    required
                    className="w-full px-4 py-3 bg-black border border-[#30363d] rounded-md text-white text-base transition-all focus:outline-none focus:border-[#58a6ff] focus:shadow-[0_0_0_3px_rgba(88,166,255,0.15)] focus:-translate-y-0.5 hover:border-[#8b949e] placeholder:text-gray-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="signup-email" className="block mb-3 text-base text-[#c9d1d9] font-medium">Email address</label>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3 bg-black border border-[#30363d] rounded-md text-white text-base transition-all focus:outline-none focus:border-[#58a6ff] focus:shadow-[0_0_0_3px_rgba(88,166,255,0.15)] focus:-translate-y-0.5 hover:border-[#8b949e] placeholder:text-gray-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="signup-password" className="block mb-3 text-base text-[#c9d1d9] font-medium">Password</label>
                  <input
                    type="password"
                    id="signup-password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 bg-black border border-[#30363d] rounded-md text-white text-base transition-all focus:outline-none focus:border-[#58a6ff] focus:shadow-[0_0_0_3px_rgba(88,166,255,0.15)] focus:-translate-y-0.5 hover:border-[#8b949e] placeholder:text-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-[#2ea44f] text-white border border-[rgba(27,31,35,0.15)] rounded-md text-base font-semibold cursor-pointer transition-all hover:bg-[#2c974b] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(46,164,79,0.4)] active:bg-[#298e46] mt-4 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Create account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}