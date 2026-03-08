import React, { useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";
// @ts-ignore
import { auth, db } from "../configs/firebase.js";
import { Chrome, Github, Sparkles, Mail, Smartphone, ArrowRight, ArrowLeft } from "lucide-react";
import { useAppDispatch } from "../store/hooks.js";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice.js";

type AuthStep = 'SSO' | 'METHOD_SELECTION' | 'OTP_VERIFICATION';

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Multi-step Auth States
  const [authStep, setAuthStep] = useState<AuthStep>('SSO');
  const [tempUser, setTempUser] = useState<{ user: User, token: string } | null>(null);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone' | null>(null);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // STEP 1: Handle Initial SSO
  const handleSSO = async (providerName: 'google' | 'github') => {
    const provider = providerName === 'google' 
      ? new GoogleAuthProvider() 
      : new GithubAuthProvider();

    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken(); 
      
      // Hold user data temporarily, don't dispatch to Redux yet!
      setTempUser({ user, token });
      setAuthStep('METHOD_SELECTION');
      
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Request OTP
  const requestOTP = async (method: 'email' | 'phone') => {
    setVerificationMethod(method);
    setIsLoading(true);
    
    try {
      // TODO: Call your backend or Firebase Identity Platform to trigger the OTP
      // Example: await axios.post('/api/auth/send-otp', { uid: tempUser.user.uid, method });
      
      console.log(`Sending OTP via ${method}...`);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAuthStep('OTP_VERIFICATION');
    } catch (error) {
      console.error("Failed to send OTP", error);
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 3: Verify OTP & Complete Login
  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Call your backend to verify the OTP entered by the user
      // Example: const isValid = await axios.post('/api/auth/verify-otp', { uid: tempUser.user.uid, otp });
      
      console.log(`Verifying OTP: ${otp}...`);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));

      // If successful, finalize login
      if (tempUser) {
        const { user, token } = tempUser;
        dispatch(setCredentials({
          user: {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            username: user.email?.split('@')[0] || ''
          },
          token: token
        }));

        // Redirect to Admin Portal
        navigate('/admin/manage');
      }
    } catch (error) {
      console.error("OTP Verification failed", error);
      // Handle invalid OTP UI state here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-primary/30 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[32rem] bg-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-mono animate-fade-in">
          <Sparkles size={16} />
          <span>Built for the modern Engineer</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1]">
          Your Portfolio, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Deployed in Seconds.
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          The all-in-one SaaS platform for Software Engineers. Manage your tech
          stack, projects, and career milestones through a beautiful, AI-powered CMS.
        </p>

        {/* Interactive Auth Card */}
        <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden min-h-[320px] flex flex-col justify-center transition-all duration-300">
          
          {/* STEP 1: SSO */}
          {authStep === 'SSO' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-bold italic">Get Started</h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleSSO("google")}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-bold rounded-2xl transition hover:bg-slate-200 active:scale-95 disabled:opacity-50"
                >
                  <Chrome size={20} />
                  Continue with Google
                </button>

                <button
                  onClick={() => handleSSO("github")}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800 text-white font-bold rounded-2xl transition hover:bg-slate-700 active:scale-95 border border-slate-700 disabled:opacity-50"
                >
                  <Github size={20} />
                  Continue with GitHub
                </button>
              </div>
              <p className="text-xs text-slate-500">
                By signing in, you agree to our Terms of Service. <br />
                No credit card required.
              </p>
            </div>
          )}

          {/* STEP 2: METHOD SELECTION */}
          {authStep === 'METHOD_SELECTION' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Secure your account</h2>
                <p className="text-sm text-slate-400">Where should we send your verification code?</p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => requestOTP('email')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between px-6 py-4 bg-slate-800 text-white font-bold rounded-2xl transition hover:bg-slate-700 active:scale-95 border border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-blue-400"/>
                    Send to Email
                  </div>
                  <ArrowRight size={18} className="text-slate-500" />
                </button>

                <button
                  onClick={() => requestOTP('phone')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between px-6 py-4 bg-slate-800 text-white font-bold rounded-2xl transition hover:bg-slate-700 active:scale-95 border border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-blue-400" />
                    Send via SMS
                  </div>
                  <ArrowRight size={18} className="text-slate-500" />
                </button>
              </div>
              
              <button 
                onClick={() => setAuthStep('SSO')}
                className="text-sm text-slate-500 hover:text-white transition flex items-center gap-1 mx-auto"
              >
                <ArrowLeft size={14} /> Back to login
              </button>
            </div>
          )}

          {/* STEP 3: OTP VERIFICATION */}
          {authStep === 'OTP_VERIFICATION' && (
            <form onSubmit={verifyOTP} className="space-y-6 animate-in fade-in slide-in-from-right-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Enter Code</h2>
                <p className="text-sm text-slate-400">
                  We sent a code to your {verificationMethod}.
                </p>
              </div>

              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Numbers only
                placeholder="000000"
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-6 py-4 text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:border-blue-500 transition placeholder:text-slate-700"
                required
              />

              <button
                type="submit"
                disabled={otp.length < 6 || isLoading}
                className="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-2xl transition hover:bg-blue-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </button>

              <button 
                type="button"
                onClick={() => setAuthStep('METHOD_SELECTION')}
                className="text-sm text-slate-500 hover:text-white transition flex items-center gap-1 mx-auto"
              >
                <ArrowLeft size={14} /> Choose a different method
              </button>
            </form>
          )}

        </div>

        {/* Features Preview (Unchanged) */}
        {/* ... (Kept exactly the same as your original code) ... */}
      </div>
    </div>
  );
};

export default LandingPage;