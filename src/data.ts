// src/data.ts
// src/data.ts
import type { PortfolioData } from './types';

export const initialData: PortfolioData = {
  name: "Ajay Sunil Shirke",
  role: "Software Engineer | Data Engineer",
  experience: "3.8 Years",
  techStack: ["React", "TypeScript", "Node.js", "Python", "SQL", "Tailwind"],
  jobs: [
    {
      id: 1,
      title: "Data Engineer",
      company: "Current Company",
      duration: "2022 - Present",
      description: "Building scalable data pipelines and modern web applications."
    }
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      school: "State University",
      year: "2020"
    }
  ],
  projects: [
    {
      id: 1,
      title: "The TEAM COMPANIES, Inc.",
      des: "Leading payroll and technology provider for the entertainment community.",
      img: "/Teams.png",
      iconLists: ["/re.svg", "/ts.svg", "/awss.svg", "/bitb.svg", "/cypress.svg"],
      link: "https://dev-app.ttcclear.com/",
      mockup: false,
    },
    {
      id: 2,
      title: "AnzilSoftClient (Anubandh)",
      des: "Free matrimonial website for Community at large.",
      img: "/Anubandh1.png",
      iconLists: ["/re.svg", "/mui.svg", "/ts.svg", "/redux.svg", "/adobe.svg"],
      link: "https://anzilteamanudev.netlify.app/",
      mockup: true,
    },
    {
    id: 3,
    title: "Welance",
    des: "Welance enables creators and independent professionals to quickly go online, list their services, monetize their skills through offering one to one session or workshops, manage, and engage with their audiences at scale.",
    img: "/Welance.png",
    iconLists: ["/re.svg", "/mui.svg", "/javascript.svg", "/firebase.svg"],
    link: "https://play.google.com/store/apps/details?id=com.obonato.welance&hl=en_IN",
    mockup: false,
  },
  {
    id: 4,
    title: "LeaveTracker",
    des: "Leave Tracker is a robust and user-friendly application specifically designed to streamline the leave application process and efficiently track the leave records within companies of all sizes.",
    img: "/LeaveTracker.png",
    iconLists: ["/re.svg", "/NativeBase.png", "/ts.svg", "/redux.svg", "/strapi.svg"],
    link: "https://play.google.com/store/apps/details?id=com.leavetrackerelm",
    mockup: false,
  },
  {
    id: 5,
    title: "CurrentPulse",
    des: "Current Pulse is not just another news app, it's a revolutionary platform designed to transform your news consumption experience.",
    img: "/CP.png",
    iconLists: ["/re.svg", "/NativeBase.png", "/ts.svg", "/redux.svg", "/mongodb.svg","/aws.svg"],
    link: "https://play.google.com/store/apps/datasafety?id=com.currentPulse",
    mockup: false,
  },
  {
    id: 6,
    title: "WhatsApp Business, Powered by AnzilSoft",
    des: "Transform your business operations with Anzil, the powerful WhatsApp Bot that brings together essential tools for success. Effortlessly handle appointment scheduling, securely process payments, and foster meaningful customer engagement, all directly within WhatsApp.",
    img: "/botAd.png",
    iconLists: ["/re.svg", "/ts.svg", "/redux.svg","/sql.svg", "/mongodb.svg","/aws.svg"],
    link: "https://bot.anzilsoft.com/",
    mockup: false,
  }
  ]
};