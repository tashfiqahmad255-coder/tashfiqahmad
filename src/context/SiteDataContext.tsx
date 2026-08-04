import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  VideoProject, 
  DesignProject, 
  Testimonial, 
  SoftwareIcon, 
  VIDEO_PROJECTS, 
  DESIGN_PROJECTS, 
  TESTIMONIALS, 
  CONTACT_INFO, 
  SOFTWARES 
} from '../data';

export interface AiWorkflowVideo {
  id: string;
  name: string;
  youtubeUrl: string;
  thumbnail?: string;
}

export interface ResearchTopic {
  id: string;
  title: string;
  desc: string;
  badge: string;
  metric: string;
  tags: string[];
}

export interface HeroData {
  firstName: string;
  lastName: string;
  title: string;
  subtitle: string;
  introBadge: string;
  avatarUrl: string;
  tickerSkills: string[];
}

export interface ShowreelData {
  label: string;
  heading: string;
  youtubeUrl: string;
}

export interface ServicePriceItem {
  label: string;
  basePrice: number;
}

export interface AboutContactData {
  name: string;
  title: string;
  location: string;
  phone1: string;
  phone2: string;
  email: string;
  youtube: string;
  behance: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  telegram: string;
  bio1: string;
  bio2: string;
  accolades: { title: string; value: string }[];
  testimonial: Testimonial;
  servicePrices: {
    video: ServicePriceItem;
    design: ServicePriceItem;
    motion: ServicePriceItem;
    full: ServicePriceItem;
  };
}

export interface SiteDataState {
  hero: HeroData;
  showreel: ShowreelData;
  videoProjects: VideoProject[];
  designProjects: DesignProject[];
  researchTopics: ResearchTopic[];
  aiWorkflowVideos?: AiWorkflowVideo[];
  aboutContact: AboutContactData;
  softwares: SoftwareIcon[];
  adminPasskey?: string;
}

const DEFAULT_HERO: HeroData = {
  firstName: 'TASHFIQ AHMAD',
  lastName: 'TAMIM',
  title: 'Video Editor & Creative Specialist',
  subtitle: 'Merging advanced narrative storytelling, pristine high-tempo video pacing, premium color grading, and modern vector art. Explore the active creative sandbox and test my modular design units below.',
  introBadge: 'Hello, I am',
  avatarUrl: 'https://i.postimg.cc/g0Bd9kCC/Chat-GPT-Image-Jul-20-2026-06-44-19-PM.png',
  tickerSkills: [
    'Professional Video Editor',
    'Graphic Designer',
    'AI Specialist',
    'Social Media Marketer'
  ]
};

const DEFAULT_SHOWREEL: ShowreelData = {
  label: 'LATEST SHOWREEL',
  heading: 'WATCH MY SHOWREEL',
  youtubeUrl: 'https://youtube.com/shorts/fFwFhNc523M?feature=share'
};

const DEFAULT_AI_WORKFLOW_VIDEOS: AiWorkflowVideo[] = [
  {
    id: 'ai_vid_01',
    name: 'Cinematic Result #1',
    youtubeUrl: 'https://youtu.be/Lo9j44fRxek',
  },
  {
    id: 'ai_vid_02',
    name: 'Cinematic Result #2',
    youtubeUrl: 'https://youtu.be/au2xoh2zcyI',
  },
  {
    id: 'ai_vid_03',
    name: 'Cinematic Result #3',
    youtubeUrl: 'https://youtu.be/uZvCG05QIQQ',
  },
];

const DEFAULT_RESEARCH: ResearchTopic[] = [
  {
    id: 'res-1',
    title: 'AI Video Editing & Auto-Cut Workflows',
    desc: 'Researching neural transcript synchronization, automated silent-gap removal, and prompt-based B-roll insertion engines.',
    badge: 'AI PIPELINE',
    metric: '3.2x Rendering Speedup',
    tags: ['Whisper-AI', 'Auto-Cut', 'Prompt-based B-Roll']
  },
  {
    id: 'res-2',
    title: 'Cinematic Color Grading & ACES Color Space',
    desc: 'Implementing ACEScc color pipelines and custom film emulation LUTs engineered specifically for South Asian skin tones and sunlight.',
    badge: 'COLOR MATRIX',
    metric: 'DCI-P3 & Rec.709 Standard',
    tags: ['DaVinci CST', 'Film Grain Emulation', 'ACEScc']
  },
  {
    id: 'res-3',
    title: 'High-Tempo Kinetic Typography & Vector Motion',
    desc: 'Developing custom GPU-accelerated expressions in After Effects for crisp vector overlays, Lottie web animations, and lower thirds.',
    badge: 'GPU ACCELERATION',
    metric: '60 FPS Ultra Motion',
    tags: ['After Effects GPU', 'Custom Expressions', 'Lottie Vector']
  }
];

const DEFAULT_ABOUT_CONTACT: AboutContactData = {
  name: CONTACT_INFO.name,
  title: CONTACT_INFO.title,
  location: CONTACT_INFO.location,
  phone1: CONTACT_INFO.phone1,
  phone2: CONTACT_INFO.phone2,
  email: CONTACT_INFO.email,
  youtube: CONTACT_INFO.youtube,
  behance: CONTACT_INFO.behance,
  linkedin: CONTACT_INFO.linkedin,
  facebook: CONTACT_INFO.facebook,
  instagram: CONTACT_INFO.instagram,
  telegram: CONTACT_INFO.telegram,
  bio1: "Hi, I'm Tashfiq Ahmad Tamim, a professional Video Editor, Graphic Designer, AI Specialist, and Social Media Marketer.",
  bio2: "I specialize in creating cinematic edits, commercial advertisements, and premium vector graphic layouts that make brands stand out. By implementing modern AI workflows and automation, I deliver stunning results with extreme efficiency.",
  accolades: [
    { title: 'Cinematic Videos Edited', value: '250+' },
    { title: 'Client Sincerity Rating', value: '5.0 / 5.0' },
    { title: 'Branding Suites Completed', value: '80+' },
    { title: 'Availability', value: 'Worldwide' }
  ],
  testimonial: TESTIMONIALS[0] || {
    clientName: 'Affan',
    country: 'Bangladesh',
    review: "I have had work done by many people so far, but I haven't found anyone who worked with as much sincerity as you did.",
    rating: 5
  },
  servicePrices: {
    video: { label: 'Cinematic & YouTube Editing', basePrice: 200 },
    design: { label: 'Premium Branding & Identity', basePrice: 150 },
    motion: { label: 'Commercial Motion Graphics', basePrice: 180 },
    full: { label: 'AI Workflow + Content Strategy', basePrice: 400 }
  }
};

const DEFAULT_SITE_DATA: SiteDataState = {
  hero: DEFAULT_HERO,
  showreel: DEFAULT_SHOWREEL,
  videoProjects: VIDEO_PROJECTS,
  designProjects: DESIGN_PROJECTS,
  researchTopics: DEFAULT_RESEARCH,
  aiWorkflowVideos: DEFAULT_AI_WORKFLOW_VIDEOS,
  aboutContact: DEFAULT_ABOUT_CONTACT,
  softwares: SOFTWARES,
  adminPasskey: '2026'
};

const LOCAL_STORAGE_KEY = 'tashfiq_portfolio_cms_v3';

interface SiteDataContextType {
  siteData: SiteDataState;
  activeEditorTarget: { tab: 'hero' | 'showreel' | 'portfolio' | 'research' | 'about' | 'backup'; subTab?: 'video' | 'design'; timestamp: number } | null;
  openEditorTo: (tab: 'hero' | 'showreel' | 'portfolio' | 'research' | 'about' | 'backup', subTab?: 'video' | 'design') => void;
  updateHero: (data: Partial<HeroData>) => void;
  updateShowreel: (data: Partial<ShowreelData>) => void;
  updateAboutContact: (data: Partial<AboutContactData>) => void;
  updatePasskey: (newPasskey: string) => void;
  
  // Video projects CRUD
  addVideoProject: (project: Omit<VideoProject, 'id'>) => void;
  updateVideoProject: (id: string, project: Partial<VideoProject>) => void;
  deleteVideoProject: (id: string) => void;

  // Design projects CRUD
  addDesignProject: (project: Omit<DesignProject, 'id'>) => void;
  updateDesignProject: (id: string, project: Partial<DesignProject>) => void;
  deleteDesignProject: (id: string) => void;

  // Research topics CRUD
  addResearchTopic: (topic: Omit<ResearchTopic, 'id'>) => void;
  updateResearchTopic: (id: string, topic: Partial<ResearchTopic>) => void;
  deleteResearchTopic: (id: string) => void;

  // Utilities
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteDataState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Sanitize tickerSkills to ensure no stale "AS Specialist" or "Colorist" persists from previous localStorage saves
        const cleanTickerSkills = [
          'Professional Video Editor',
          'Graphic Designer',
          'AI Specialist',
          'Social Media Marketer'
        ];

        // Sanitize bio texts if old legacy strings were cached
        let cleanBio1 = parsed.aboutContact?.bio1 || DEFAULT_ABOUT_CONTACT.bio1;
        let cleanBio2 = parsed.aboutContact?.bio2 || DEFAULT_ABOUT_CONTACT.bio2;
        cleanBio1 = cleanBio1.replace(/AS Specialist/g, 'AI Specialist').replace(/\bAS\b/g, 'AI');
        cleanBio2 = cleanBio2.replace(/AS workflows/g, 'AI workflows').replace(/\bAS\b/g, 'AI');

        // Enforce exact hardcoded video URLs so they never get mixed up from stale localStorage
        const cleanShowreel = {
          ...DEFAULT_SHOWREEL,
          ...parsed.showreel,
          youtubeUrl: 'https://youtube.com/shorts/fFwFhNc523M?feature=share'
        };

        const cleanVideoProjects = (parsed.videoProjects?.length === 6)
          ? parsed.videoProjects
          : VIDEO_PROJECTS;

        const cleanAiWorkflowVideos = (parsed.aiWorkflowVideos?.length === 3)
          ? parsed.aiWorkflowVideos
          : DEFAULT_AI_WORKFLOW_VIDEOS;

        return {
          hero: { ...DEFAULT_HERO, ...parsed.hero, tickerSkills: cleanTickerSkills },
          showreel: cleanShowreel,
          videoProjects: cleanVideoProjects,
          aiWorkflowVideos: cleanAiWorkflowVideos,
          designProjects: parsed.designProjects?.length ? parsed.designProjects : DEFAULT_SITE_DATA.designProjects,
          researchTopics: parsed.researchTopics?.length ? parsed.researchTopics : DEFAULT_SITE_DATA.researchTopics,
          aboutContact: { ...DEFAULT_ABOUT_CONTACT, ...parsed.aboutContact, bio1: cleanBio1, bio2: cleanBio2 },
          softwares: parsed.softwares?.length ? parsed.softwares : DEFAULT_SITE_DATA.softwares,
          adminPasskey: parsed.adminPasskey || '2026'
        };
      }
    } catch (err) {
      console.error('Failed to parse saved site data:', err);
    }
    return DEFAULT_SITE_DATA;
  });

  // Persist changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(siteData));
    } catch (err) {
      console.error('Failed to save site data to localStorage:', err);
    }
  }, [siteData]);

  const updateHero = (data: Partial<HeroData>) => {
    setSiteData((prev) => ({ ...prev, hero: { ...prev.hero, ...data } }));
  };

  const updateShowreel = (data: Partial<ShowreelData>) => {
    setSiteData((prev) => ({ ...prev, showreel: { ...prev.showreel, ...data } }));
  };

  const updateAboutContact = (data: Partial<AboutContactData>) => {
    setSiteData((prev) => ({ ...prev, aboutContact: { ...prev.aboutContact, ...data } }));
  };

  const updatePasskey = (newPasskey: string) => {
    setSiteData((prev) => ({ ...prev, adminPasskey: newPasskey }));
  };

  // Video Projects CRUD
  const addVideoProject = (project: Omit<VideoProject, 'id'>) => {
    const newProj: VideoProject = {
      ...project,
      id: `vid_${Date.now()}`
    };
    setSiteData((prev) => ({
      ...prev,
      videoProjects: [newProj, ...prev.videoProjects]
    }));
  };

  const updateVideoProject = (id: string, updated: Partial<VideoProject>) => {
    setSiteData((prev) => ({
      ...prev,
      videoProjects: prev.videoProjects.map((p) => (p.id === id ? { ...p, ...updated } : p))
    }));
  };

  const deleteVideoProject = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      videoProjects: prev.videoProjects.filter((p) => p.id !== id)
    }));
  };

  // Design Projects CRUD
  const addDesignProject = (project: Omit<DesignProject, 'id'>) => {
    const newProj: DesignProject = {
      ...project,
      id: `des_${Date.now()}`
    };
    setSiteData((prev) => ({
      ...prev,
      designProjects: [newProj, ...prev.designProjects]
    }));
  };

  const updateDesignProject = (id: string, updated: Partial<DesignProject>) => {
    setSiteData((prev) => ({
      ...prev,
      designProjects: prev.designProjects.map((p) => (p.id === id ? { ...p, ...updated } : p))
    }));
  };

  const deleteDesignProject = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      designProjects: prev.designProjects.filter((p) => p.id !== id)
    }));
  };

  // Research Topics CRUD
  const addResearchTopic = (topic: Omit<ResearchTopic, 'id'>) => {
    const newTopic: ResearchTopic = {
      ...topic,
      id: `res_${Date.now()}`
    };
    setSiteData((prev) => ({
      ...prev,
      researchTopics: [...prev.researchTopics, newTopic]
    }));
  };

  const updateResearchTopic = (id: string, updated: Partial<ResearchTopic>) => {
    setSiteData((prev) => ({
      ...prev,
      researchTopics: prev.researchTopics.map((t) => (t.id === id ? { ...t, ...updated } : t))
    }));
  };

  const deleteResearchTopic = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      researchTopics: prev.researchTopics.filter((t) => t.id !== id)
    }));
  };

  const resetToDefaults = () => {
    setSiteData(DEFAULT_SITE_DATA);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const exportData = () => {
    return JSON.stringify(siteData, null, 2);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        setSiteData(parsed);
        return true;
      }
    } catch (err) {
      console.error('Invalid JSON import data', err);
    }
    return false;
  };

  const [activeEditorTarget, setActiveEditorTarget] = useState<{ tab: 'hero' | 'showreel' | 'portfolio' | 'research' | 'about' | 'backup'; subTab?: 'video' | 'design'; timestamp: number } | null>(null);

  const openEditorTo = (tab: 'hero' | 'showreel' | 'portfolio' | 'research' | 'about' | 'backup', subTab?: 'video' | 'design') => {
    setActiveEditorTarget({ tab, subTab, timestamp: Date.now() });
  };

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
        activeEditorTarget,
        openEditorTo,
        updateHero,
        updateShowreel,
        updateAboutContact,
        updatePasskey,
        addVideoProject,
        updateVideoProject,
        deleteVideoProject,
        addDesignProject,
        updateDesignProject,
        deleteDesignProject,
        addResearchTopic,
        updateResearchTopic,
        deleteResearchTopic,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
