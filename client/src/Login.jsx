import React from 'react';
import { SignInButton } from "@clerk/clerk-react"; // Asli login ke liye ye chahiye
import { Shield, Lock, ArrowRight, Zap } from 'lucide-react';

function Login() {
    // Humne manual handleLogin hata diya kyunki Clerk ab automatically detect kar lega

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

            <div className="relative z-10 w-full max-w-md">

                {/* Branding Section */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-3xl mb-4 shadow-2xl shadow-blue-500/10">
                        <Shield className="text-blue-500" size={48} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter italic uppercase text-white">
                        Nexus<span className="text-blue-500">.IAM</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Zap size={12} className="text-blue-400 fill-blue-400" />
                        <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em]">
                            Secure Identity Gateway
                        </p>
                    </div>
                </div>

                {/* The Login Card */}
                <div className="bg-slate-900/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-3 text-slate-300 mb-8 justify-center">
                        <Lock size={16} className="text-blue-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            Authentication Required
                        </span>
                    </div>

                    <p className="text-slate-400 text-sm mb-10 text-center leading-relaxed font-medium">
                        To access the Nexus governance systems, please verify your identity using your registered account.
                    </p>

                    {/* Clerk ka Asli Button yahan hai */}
                    <SignInButton mode="modal">
                        <button className="group w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-600/30 active:scale-[0.98] border border-blue-400/20">
                            Login with Corporate ID
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </SignInButton>

                    <p className="mt-8 text-[10px] text-slate-500 text-center uppercase tracking-tight">
                        Protected by Clerk Identity Cloud
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;