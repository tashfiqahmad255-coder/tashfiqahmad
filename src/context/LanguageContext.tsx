import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'EN' | 'BN';

export interface Translations {
  // Brand / Owner
  ownerName: string;
  subtitle: string;
  
  // Nav Links
  navHome: string;
  navAbout: string;
  navPortfolio: string;
  navResearch: string;
  navContact: string;
  letsTalk: string;
  
  // Status
  statusOnline: string;
  networkStatus: string;
  
  // Hero
  greeting: string;
  heroLine1: string;
  heroLine2: string;
  heroTitle: string;
  viewPortfolioBtn: string;
  getInTouchBtn: string;
  
  // Research
  researchTitle: string;
  researchSubtitle: string;
  researchTag: string;
  researchCard1Title: string;
  researchCard1Desc: string;
  researchCard2Title: string;
  researchCard2Desc: string;
  researchCard3Title: string;
  researchCard3Desc: string;
  
  // Portfolio / Dual Suite
  portfolioTitle: string;
  portfolioSubtitle: string;
  colorGraderTab: string;
  vectorMeshTab: string;
  
  // Works
  worksTitle: string;
  worksSubtitle: string;
  videoProjectsHeader: string;
  designProjectsHeader: string;
  
  // About & Contact
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  contactTitle: string;
  contactSubtitle: string;
  callBtn: string;
  whatsappBtn: string;
  emailBtn: string;
  hireBtn: string;
  
  // Calculator
  calculatorTitle: string;
  calculatorSubtitle: string;
  submitInquiryBtn: string;
  
  // Footer
  footerRights: string;
}

const translations: Record<Language, Translations> = {
  EN: {
    ownerName: 'TASHFIQ AHMAD TAMIM',
    subtitle: 'Professional Video Editor',
    
    navHome: 'Home',
    navAbout: 'About',
    navPortfolio: 'Portfolio',
    navResearch: 'Favorite YouTube Video Projects',
    navContact: 'Contact',
    letsTalk: "Let's Talk",
    
    statusOnline: 'ONLINE & READY',
    networkStatus: 'NETWORK STATUS',
    
    greeting: 'Hello, I am',
    heroLine1: 'TASHFIQ AHMAD',
    heroLine2: 'TAMIM',
    heroTitle: 'Video Editor & Creative Specialist',
    viewPortfolioBtn: 'VIEW PORTFOLIO',
    getInTouchBtn: 'GET IN TOUCH',
    
    researchTitle: 'Favorite YouTube Video Projects',
    researchSubtitle: 'Select video works showcasing cinematic editing and creative workflows.',
    researchTag: 'FAVORITE YOUTUBE VIDEO PROJECTS',
    researchCard1Title: 'Neural Video Editing & AI Automation',
    researchCard1Desc: 'Pioneering rapid storyboarding and audio-visual keyframe matching using advanced generative models.',
    researchCard2Title: 'HDR Color Matrix & CST Pipelines',
    researchCard2Desc: 'Custom DaVinci Resolve CST pipelines optimized for high contrast YouTube and Cinema distribution.',
    researchCard3Title: 'High-Tempo Vector Motion Layers',
    researchCard3Desc: 'Hybrid After Effects & GPU acceleration workflows for punchy brand kinetic typography.',
    
    portfolioTitle: 'Dual-Suite Creative Playgrounds',
    portfolioSubtitle: 'Interact with live mockups of a professional video color grading suite and a vector design blueprint engine.',
    colorGraderTab: 'NLE COLOR GRADER',
    vectorMeshTab: 'VECTOR LAYER MESH',
    
    worksTitle: 'Cinematic Reels & Branding Case Studies',
    worksSubtitle: 'Select from premium projects designed or color graded specifically for digital platforms.',
    videoProjectsHeader: '🎬 Seeding Video Projects',
    designProjectsHeader: '📐 Graphic Design Projects',
    
    aboutTitle: 'Creative Specialist & Video Architect',
    aboutDesc1: 'Specializing in high-impact video editing, DaVinci Resolve color grading, motion graphics, and vector visual identity.',
    aboutDesc2: 'Combining creative storytelling with technical AI workflows to deliver broadcast-quality video assets.',
    contactTitle: 'Let’s Build Something Legendary Together',
    contactSubtitle: 'Available for client projects, video editing commissions, and full brand creative direction.',
    callBtn: 'CALL ME',
    whatsappBtn: 'WHATSAPP',
    emailBtn: 'SEND EMAIL',
    hireBtn: 'HIRE ME',
    
    calculatorTitle: 'Interactive Commission Estimator',
    calculatorSubtitle: 'Select scope and deliverables to get a real-time proposal estimate.',
    submitInquiryBtn: 'SUBMIT INQUIRY PROPOSAL',
    
    footerRights: 'All rights reserved. Fusing authentic Bangladeshi aesthetics with high-tempo kinetic video production.'
  },
  BN: {
    ownerName: 'তাসফিক আহমদ তামিম',
    subtitle: 'প্রফেশনাল ভিডিও এডিটর',
    
    navHome: 'হোম',
    navAbout: 'আমার সম্পর্কে',
    navPortfolio: 'পোর্টফোলিও',
    navResearch: 'গবেষণা',
    navContact: 'যোগাযোগ',
    letsTalk: 'কথা বলুন',
    
    statusOnline: 'অনলাইন ও প্রস্তুত',
    networkStatus: 'নেটওয়ার্ক স্ট্যাটাস',
    
    greeting: 'হ্যালো, আমি',
    heroLine1: 'তাসফিক আহমদ',
    heroLine2: 'তামিম',
    heroTitle: 'ভিডিও এডিটর ও ক্রিয়েটিভ স্পেশালিস্ট',
    viewPortfolioBtn: 'পোর্টফোলিও দেখুন',
    getInTouchBtn: 'যোগাযোগ করুন',
    
    researchTitle: 'এআই ওয়ার্কফ্লো ও সিনেমাটিক গবেষণা',
    researchSubtitle: 'নিউরাল ভিডিও প্রসেসিং, কালার ম্যাট্রিক্স এবং হাই-ফ্রিকোয়েন্সি মোশন গ্রাফিক্স এক্সপ্লোরেশন।',
    researchTag: 'ল্যাব ও মেথডোলজি',
    researchCard1Title: 'নিউরাল ভিডিও এডিটিং ও এআই অটোমেশন',
    researchCard1Desc: 'আধুনিক এআই মডেল ব্যবহার করে দ্রুত স্টোরিবোর্ডিং ও অডিও-ভিজ্যুয়াল কি-ফ্রেম ম্যাচিং।',
    researchCard2Title: 'এইচডিআর কালার ম্যাট্রিক্স ও সিএসটি পাইপলাইন',
    researchCard2Desc: 'ইউটিউব ও সিনেমা ডিসপ্লে মিডিয়ার জন্য প্রস্তুতকৃত কাস্টম দাভিঞ্চি রিজলভ কালার স্পেস ট্রান্সফর্ম।',
    researchCard3Title: 'হাই-টেম্পো ভেক্টর মোশন লেয়ার',
    researchCard3Desc: 'আফটার ইফেক্টস ও জিপিইউ অ্যাক্সিলারেশন ওয়ার্কফ্লোর মাধ্যমে নজরকাড়া কাইনেটিক টাইপোগ্রাফি।',
    
    portfolioTitle: 'দ্বৈত ক্রিয়েটিভ প্লেগ্রাউন্ড',
    portfolioSubtitle: 'প্রফেশনাল ভিডিও কালার গ্রেডিং সুট এবং ভেক্টর ডিজাইন ব্লুপ্রিন্ট ইঞ্জিনের লাইভ মকআপ পরীক্ষা করুন।',
    colorGraderTab: 'ভিডিও কালার গ্রেডার',
    vectorMeshTab: 'ভেক্টর লেয়ার মেশ',
    
    worksTitle: 'সিনেমাটিক রিল ও ব্র্যান্ডিং কেইস স্টাডি',
    worksSubtitle: 'ডিজিটাল প্ল্যাটফর্মের জন্য বিশেষভাবে তৈরি ও রেন্ডার করা প্রিমিয়াম প্রজেক্টগুলো দেখুন।',
    videoProjectsHeader: '🎬 ফিচার্ড ভিডিও প্রজেক্টস',
    designProjectsHeader: '📐 গ্রাফিক ডিজাইন প্রজেক্টস',
    
    aboutTitle: 'ক্রিয়েটিভ স্পেশালিস্ট ও ভিডিও আর্কিটেক্ট',
    aboutDesc1: 'হাই-ইম্প্যাক্ট ভিডিও এডিটিং, দাভিঞ্চি রিজলভ কালার গ্রেডিং, মোশন গ্রাফিক্স এবং ভেক্টর ভিজ্যুয়াল আইডেন্টিটিতে পারদর্শী।',
    aboutDesc2: 'ক্রিয়েটিভ গল্পবলার সাথে এআই ওয়ার্কফ্লোর মিশ্রণে ব্রডকাস্ট কোয়ালিটির ভিডিও সম্পদ তৈরি করি।',
    contactTitle: 'আসুন একসাথে অসাধারণ কিছু তৈরি করি',
    contactSubtitle: 'ক্লায়েন্ট প্রজেক্ট, ভিডিও এডিটিং কমিশন এবং ফুল ব্র্যান্ড ডিরেকশনের জন্য উপলব্ধ।',
    callBtn: 'কল করুন',
    whatsappBtn: 'হোয়াটসঅ্যাপ',
    emailBtn: 'ইমেইল করুন',
    hireBtn: 'হায়ার করুন',
    
    calculatorTitle: 'ইন্টারেক্টিভ কমিশন এস্টিমেটর',
    calculatorSubtitle: 'আপনার প্রজেক্টের প্রয়োজন অনুযায়ী তাৎক্ষণিক বাজেট আনুমানিক ধারণা পান।',
    submitInquiryBtn: 'প্রস্তাব জমা দিন',
    
    footerRights: 'সর্বস্বত্ব সংরক্ষিত। ঐতিহ্যবাহী নান্দনিকতার সাথে কাইনেটিক ভিডিও প্রোডাকশনের অপূর্ব মেলবন্ধন।'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
