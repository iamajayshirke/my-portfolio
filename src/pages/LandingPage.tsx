import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// @ts-ignore
import { auth, db } from "../configs/firebase.js";
import { Chrome, Github, Sparkles } from "lucide-react";
import { useAppDispatch } from "../store/hooks.js";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice.js";

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSSO = async (providerName: 'google' | 'github') => {
    const provider = providerName === 'google' 
      ? new GoogleAuthProvider() 
      : new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken(); // Get the JWT for your backend
    
      // 1. Save data in Redux (which also saves to localStorage via your slice logic)
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

      // 2. Redirect to Admin Portal
      // Since you're building a SaaS, we send them to their management dashboard
      navigate('/admin/manage');

    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-primary/30">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-primary/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-mono animate-fade-in">
          <Sparkles size={16} />
          <span>Built for the modern Engineer</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1]">
          Your Portfolio, <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">
            Deployed in Seconds.
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          The all-in-one SaaS platform for Software Engineers. Manage your tech
          stack, projects, and career milestones through a beautiful, AI-powered
          CMS.
        </p>

        {/* SSO Action Card */}
        <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
          <h2 className="text-2xl font-bold italic">Get Started</h2>

          <div className="space-y-3">
            <button
              onClick={() => handleSSO("google")}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black font-bold rounded-2xl transition hover:bg-slate-200 active:scale-95"
            >
              <Chrome size={20} />
              Continue with Google
            </button>

            <button
              onClick={() => handleSSO("github")}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800 text-white font-bold rounded-2xl transition hover:bg-slate-700 active:scale-95 border border-slate-700"
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

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
          {[
            {
              title: "Dynamic Themes",
              desc: "Switch between Emerald, Blue, and Purple instantly.",
            },
            {
              title: "MongoDB Powered",
              desc: "Your data is safe, secure, and always accessible.",
            },
            {
              title: "SEO Optimized",
              desc: "Ready to rank for your name and engineering roles.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-8 bg-slate-900/30 border border-slate-800 rounded-3xl text-left"
            >
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
