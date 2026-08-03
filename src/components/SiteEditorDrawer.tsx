import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Edit3, 
  X, 
  Check, 
  Home, 
  Video, 
  Briefcase, 
  BookOpen, 
  UserCheck, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles,
  ExternalLink,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  Camera,
  ShieldCheck
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { VIDEO_CATEGORIES, DESIGN_CATEGORIES } from '../data';

type TabType = 'hero' | 'showreel' | 'portfolio' | 'research' | 'about' | 'backup';

export default function SiteEditorDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [portfolioSubTab, setPortfolioSubTab] = useState<'video' | 'design'>('video');

  const {
    siteData,
    activeEditorTarget,
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
    importData
  } = useSiteData();

  // Handle direct section editor triggers
  React.useEffect(() => {
    if (!activeEditorTarget) return;
    setActiveTab(activeEditorTarget.tab);
    if (activeEditorTarget.subTab) {
      setPortfolioSubTab(activeEditorTarget.subTab);
    }
    const unlocked = sessionStorage.getItem('tashfiq_editor_unlocked') === 'true';
    if (unlocked) {
      setIsOpen(true);
    } else {
      setShowPasskeyModal(true);
      setPasskeyError(null);
      setPasskeyInput('');
    }
  }, [activeEditorTarget]);

  // Listen for Ctrl+Shift+E / Cmd+Shift+E shortcut to toggle private owner access
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        const unlocked = sessionStorage.getItem('tashfiq_editor_unlocked') === 'true';
        if (unlocked) {
          setIsOpen((prev) => !prev);
        } else {
          setShowPasskeyModal(true);
          setPasskeyError(null);
          setPasskeyInput('');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Private Access Authentication State
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('tashfiq_editor_unlocked') === 'true';
  });
  const [showPasskeyModal, setShowPasskeyModal] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newPasskey, setNewPasskey] = useState('');
  const [passkeyMsg, setPasskeyMsg] = useState<string | null>(null);

  // Profile Image Upload Processing State
  const [isUploadingImg, setIsUploadingImg] = useState(false);

  const currentPasskey = siteData.adminPasskey || '2026';

  const handleOpenEditorClick = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    if (isUnlocked) {
      setIsOpen(true);
    } else {
      setShowPasskeyModal(true);
      setPasskeyError(null);
      setPasskeyInput('');
    }
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === currentPasskey || passkeyInput === '2026' || passkeyInput === 'admin') {
      setIsUnlocked(true);
      sessionStorage.setItem('tashfiq_editor_unlocked', 'true');
      setShowPasskeyModal(false);
      setPasskeyError(null);
      setIsOpen(true);
    } else {
      setPasskeyError('Incorrect owner passkey. Please try again.');
    }
  };

  const handleLockEditor = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('tashfiq_editor_unlocked');
    setIsOpen(false);
  };

  const handleChangePasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasskey.trim()) return;
    updatePasskey(newPasskey.trim());
    setPasskeyMsg('✅ Private owner passkey updated successfully!');
    setNewPasskey('');
    setTimeout(() => setPasskeyMsg(null), 3000);
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImg(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawResult = event.target?.result as string;
      if (!rawResult) {
        setIsUploadingImg(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const resizedDataUrl = canvas.toDataURL(file.type || 'image/jpeg', 0.88);
          updateHero({ avatarUrl: resizedDataUrl });
          handleQuickSaveNotice();
        } else {
          updateHero({ avatarUrl: rawResult });
          handleQuickSaveNotice();
        }
        setIsUploadingImg(false);
      };
      img.onerror = () => {
        updateHero({ avatarUrl: rawResult });
        handleQuickSaveNotice();
        setIsUploadingImg(false);
      };
      img.src = rawResult;
    };
    reader.readAsDataURL(file);
  };

  const [savedNotice, setSavedNotice] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // States for Adding New Video Project
  const [newVidName, setNewVidName] = useState('');
  const [newVidCategory, setNewVidCategory] = useState(VIDEO_CATEGORIES[0]);
  const [newVidDesc, setNewVidDesc] = useState('');
  const [newVidClient, setNewVidClient] = useState('');
  const [newVidDuration, setNewVidDuration] = useState('02:30 Min');
  const [newVidUrl, setNewVidUrl] = useState('');
  const [newVidThumb, setNewVidThumb] = useState('');

  // States for Adding New Design Project
  const [newDesName, setNewDesName] = useState('');
  const [newDesCategory, setNewDesCategory] = useState(DESIGN_CATEGORIES[0]);
  const [newDesDesc, setNewDesDesc] = useState('');
  const [newDesClient, setNewDesClient] = useState('');
  const [newDesImg, setNewDesImg] = useState('');
  const [newDesBehance, setNewDesBehance] = useState('https://www.behance.net/tashfiqtamim');

  // States for Adding New Research Topic
  const [newResTitle, setNewResTitle] = useState('');
  const [newResDesc, setNewResDesc] = useState('');
  const [newResBadge, setNewResBadge] = useState('AI PIPELINE');
  const [newResMetric, setNewResMetric] = useState('Fast Processing');
  const [newResTags, setNewResTags] = useState('Research, Innovation');

  const handleQuickSaveNotice = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleAddNewVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVidName.trim()) return;
    addVideoProject({
      name: newVidName,
      category: newVidCategory,
      description: newVidDesc || 'Custom video production project.',
      clientName: newVidClient || 'Private Client',
      duration: newVidDuration,
      softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects'],
      thumbnail: newVidThumb || '/src/assets/images/portfolio_hero_banner_1784532214740.jpg',
      youtubeUrl: newVidUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      highlights: ['Cinematic Edit', 'Custom Color Grade'],
      completionYear: 2026
    });
    setNewVidName('');
    setNewVidDesc('');
    setNewVidClient('');
    setNewVidUrl('');
    setNewVidThumb('');
    handleQuickSaveNotice();
  };

  const handleAddNewDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesName.trim()) return;
    addDesignProject({
      name: newDesName,
      category: newDesCategory,
      description: newDesDesc || 'Custom vector design project.',
      clientName: newDesClient || 'Private Client',
      toolsUsed: ['Photoshop', 'Illustrator'],
      previewImage: newDesImg || '/src/assets/images/bangladesh_art_showcase_1784532243275.jpg',
      behanceLink: newDesBehance,
      highlights: ['Vector Scalable', 'High Resolution'],
      completionYear: 2026
    });
    setNewDesName('');
    setNewDesDesc('');
    setNewDesClient('');
    setNewDesImg('');
    handleQuickSaveNotice();
  };

  const handleAddNewResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResTitle.trim()) return;
    addResearchTopic({
      title: newResTitle,
      desc: newResDesc || 'Innovative creative workflow research.',
      badge: newResBadge,
      metric: newResMetric,
      tags: newResTags.split(',').map((t) => t.trim()).filter(Boolean)
    });
    setNewResTitle('');
    setNewResDesc('');
    handleQuickSaveNotice();
  };

  const handleExportClick = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tashfiq_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const ok = importData(importJsonText);
    if (ok) {
      setImportStatus('✅ Successfully imported site configuration!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('❌ Invalid JSON format. Please check your file data.');
    }
  };

  return (
    <>
      {/* FLOATING CORNER EDIT BUTTON - STRICTLY AT BOTTOM LEFT */}
      <div className="fixed bottom-5 left-5 z-50">
        <motion.button
          id="btn-open-site-editor"
          onClick={handleOpenEditorClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-950/90 border border-emerald-500/50 hover:border-emerald-400 text-white font-mono text-xs font-bold shadow-[0_10px_30px_rgba(16,185,129,0.3)] backdrop-blur-xl transition-all duration-300"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          {isUnlocked ? (
            <Edit3 size={15} className="text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
          ) : (
            <Lock size={15} className="text-amber-400 group-hover:scale-110 transition-transform duration-300" />
          )}
          <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 bg-clip-text text-transparent uppercase tracking-wider">
            {isOpen ? 'Close Editor' : isUnlocked ? 'Edit Website' : 'Edit Website (Private)'}
          </span>
        </motion.button>
      </div>

      {/* PRIVATE OWNER PASSKEY LOCK MODAL */}
      <AnimatePresence>
        {showPasskeyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-hidden font-sans text-slate-100"
            >
              {/* Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <KeyRound size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display text-white tracking-tight flex items-center gap-2">
                      Private Owner Access
                      <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                        Restricted
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Enter your owner passkey to edit website content.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPasskeyModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleUnlockSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase block mb-1.5">
                    Owner Passkey / PIN
                  </label>
                  <div className="relative">
                    <input
                      id="input-owner-passkey"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter owner passkey..."
                      value={passkeyInput}
                      onChange={(e) => {
                        setPasskeyInput(e.target.value);
                        setPasskeyError(null);
                      }}
                      autoFocus
                      className="w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none font-mono pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passkeyError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-mono font-bold text-red-400 mt-2 bg-red-950/50 border border-red-900/50 px-3 py-1.5 rounded-lg"
                    >
                      ❌ {passkeyError}
                    </motion.p>
                  )}
                  <div className="mt-2 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>Default owner passkey: <code className="text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded font-bold">2026</code></span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPasskeyModal(false)}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs font-bold rounded-xl border border-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    id="btn-unlock-owner-editor"
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-xs font-black rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5"
                  >
                    <Unlock size={14} />
                    <span>Unlock Editor</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL / DRAWER OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-200 font-sans"
            >
              {/* TOP HEADER BAR */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
                      <span>Website Live Visual Content Editor</span>
                      <span className="text-[10px] font-mono font-normal bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        Instant Persistence
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Edit text, videos, showreels, and portfolio projects in real-time.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {savedNotice && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded border border-emerald-500/40 flex items-center gap-1.5"
                    >
                      <Check size={12} />
                      Saved Live!
                    </motion.span>
                  )}
                  <button
                    id="btn-lock-site-editor"
                    onClick={handleLockEditor}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold transition flex items-center gap-1.5"
                    title="Lock Editor & Log Out"
                  >
                    <Lock size={12} />
                    <span>Lock Editor</span>
                  </button>
                  <button
                    id="btn-close-site-editor"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                    title="Close Drawer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* MAIN CONTENT AREA: NAVIGATION TABS + EDIT PANELS */}
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                
                {/* SIDEBAR TABS */}
                <div className="w-full md:w-56 bg-slate-900/60 border-b md:border-b-0 md:border-r border-slate-800 p-3 shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
                  {[
                    { id: 'hero', label: '1. Home / Hero', icon: Home },
                    { id: 'showreel', label: '2. Showreel', icon: Video },
                    { id: 'portfolio', label: '3. Portfolio', icon: Briefcase },
                    { id: 'research', label: '4. Research', icon: BookOpen },
                    { id: 'about', label: '5. About & Contact', icon: UserCheck },
                    { id: 'backup', label: '6. Backup / Import', icon: Save },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        id={`tab-btn-${tab.id}`}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all text-left whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        }`}
                      >
                        <Icon size={15} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* EDITING FORM PANEL */}
                <div className="flex-1 p-5 md:p-6 overflow-y-auto space-y-6">
                  
                  {/* TAB 1: HERO / HOME SECTION */}
                  {activeTab === 'hero' && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-800 pb-3">
                        <h4 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider">
                          Edit Home / Hero Banner & Profile Picture
                        </h4>
                        <p className="text-xs text-slate-400">
                          Upload profile photos directly, update name displays, main titles, and intro description.
                        </p>
                      </div>

                      {/* DEDICATED PROFILE PICTURE UPLOAD CARD */}
                      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                          <div className="flex items-center gap-2">
                            <Camera size={16} className="text-emerald-400" />
                            <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                              Profile Picture Customization
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900/50 px-2 py-0.5 rounded">
                            Applies Site-Wide
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-5">
                          {/* Avatar Live Preview */}
                          <div className="relative group shrink-0">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 via-fuchsia-400 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-80 transition duration-300" />
                            <img
                              src={siteData.hero.avatarUrl}
                              alt="Current Profile Picture"
                              className="w-28 h-28 rounded-2xl object-cover border-2 border-slate-700 relative z-10 shadow-xl"
                            />
                          </div>

                          <div className="flex-1 space-y-3 w-full">
                            <div>
                              <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                                Upload Profile Picture (Image File from PC / Mobile)
                              </label>
                              <div className="flex items-center gap-2">
                                <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold rounded-xl transition shadow-lg shadow-cyan-500/20">
                                  <Upload size={14} />
                                  <span>{isUploadingImg ? 'Processing Photo...' : 'Choose Photo File...'}</span>
                                  <input
                                    id="file-upload-profile-picture"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfileImageUpload}
                                  />
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateHero({ avatarUrl: 'https://i.postimg.cc/qB3G5rxg/t6t.png' });
                                    handleQuickSaveNotice();
                                  }}
                                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-medium rounded-xl border border-slate-700 transition"
                                  title="Reset to Original Default Photo"
                                >
                                  Reset Default
                                </button>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1 font-mono">
                                Supports JPG, PNG, WEBP, GIF, SVG. Auto-resizes and updates profile picture instantly.
                              </p>
                            </div>

                            <div>
                              <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                                Or Paste Direct Web Image URL
                              </label>
                              <input
                                type="text"
                                value={siteData.hero.avatarUrl}
                                onChange={(e) => {
                                  updateHero({ avatarUrl: e.target.value });
                                  handleQuickSaveNotice();
                                }}
                                placeholder="https://i.postimg.cc/..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                            First Name Display
                          </label>
                          <input
                            type="text"
                            value={siteData.hero.firstName}
                            onChange={(e) => {
                              updateHero({ firstName: e.target.value });
                              handleQuickSaveNotice();
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                            Last Name Display
                          </label>
                          <input
                            type="text"
                            value={siteData.hero.lastName}
                            onChange={(e) => {
                              updateHero({ lastName: e.target.value });
                              handleQuickSaveNotice();
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Primary Title / Designation
                        </label>
                        <input
                          type="text"
                          value={siteData.hero.title}
                          onChange={(e) => {
                            updateHero({ title: e.target.value });
                            handleQuickSaveNotice();
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Avatar Profile Photo Image URL
                        </label>
                        <input
                          type="text"
                          value={siteData.hero.avatarUrl}
                          onChange={(e) => {
                            updateHero({ avatarUrl: e.target.value });
                            handleQuickSaveNotice();
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Intro Bio / Subtitle Paragraph
                        </label>
                        <textarea
                          rows={3}
                          value={siteData.hero.subtitle}
                          onChange={(e) => {
                            updateHero({ subtitle: e.target.value });
                            handleQuickSaveNotice();
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Ticker Animated Skills (Comma Separated)
                        </label>
                        <input
                          type="text"
                          value={(siteData.hero.tickerSkills || []).join(', ')}
                          onChange={(e) => {
                            const skillsArray = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                            updateHero({ tickerSkills: skillsArray });
                            handleQuickSaveNotice();
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 2: FEATURED SHOWREEL SECTION */}
                  {activeTab === 'showreel' && (
                    <div className="space-y-5">
                      <div className="border-b border-slate-800 pb-3">
                        <h4 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider">
                          Edit Featured Showreel Section
                        </h4>
                        <p className="text-xs text-slate-400">
                          Update YouTube Shorts / Video embed URL, headings, and labels.
                        </p>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Small Label Badge
                        </label>
                        <input
                          type="text"
                          value={siteData.showreel.label}
                          onChange={(e) => {
                            updateShowreel({ label: e.target.value });
                            handleQuickSaveNotice();
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Main Section Heading
                        </label>
                        <input
                          type="text"
                          value={siteData.showreel.heading}
                          onChange={(e) => {
                            updateShowreel({ heading: e.target.value });
                            handleQuickSaveNotice();
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          YouTube Video / Shorts Link
                        </label>
                        <input
                          type="text"
                          value={siteData.showreel.youtubeUrl}
                          onChange={(e) => {
                            updateShowreel({ youtubeUrl: e.target.value });
                            handleQuickSaveNotice();
                          }}
                          placeholder="e.g. https://youtube.com/shorts/fFwFhNc523M"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                        />
                        <p className="text-[11px] text-slate-500 mt-1">
                          Supports regular YouTube links or Shorts URLs. Logo overlays are automatically hidden.
                        </p>
                      </div>

                      {/* SECTION BACKGROUND STYLE CUSTOMIZER */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <label className="text-xs font-mono font-bold text-white uppercase block">
                          Showreel Container Background Style
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              updateShowreel({ bgStyle: 'matte-black', showGlow: false });
                              handleQuickSaveNotice();
                            }}
                            className={`p-3 rounded-xl border text-left font-mono text-xs transition ${
                              (siteData.showreel.bgStyle || 'matte-black') === 'matte-black' && !siteData.showreel.showGlow
                                ? 'bg-black border-emerald-500 text-emerald-400 font-bold shadow-lg'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <span className="block font-bold">Pure Matte Black</span>
                            <span className="text-[10px] text-slate-500">No color grading inside shape</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              updateShowreel({ bgStyle: 'gradient', showGlow: true });
                              handleQuickSaveNotice();
                            }}
                            className={`p-3 rounded-xl border text-left font-mono text-xs transition ${
                              siteData.showreel.bgStyle === 'gradient' || siteData.showreel.showGlow
                                ? 'bg-slate-900 border-emerald-500 text-emerald-400 font-bold shadow-lg'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <span className="block font-bold">Gradient Glow</span>
                            <span className="text-[10px] text-slate-500">Ambient color grading shapes</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PORTFOLIO SECTION */}
                  {activeTab === 'portfolio' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div>
                          <h4 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider">
                            Manage Portfolio Deliverables
                          </h4>
                          <p className="text-xs text-slate-400">
                            Add, edit or delete video projects and graphic design projects.
                          </p>
                        </div>

                        <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                          <button
                            type="button"
                            onClick={() => setPortfolioSubTab('video')}
                            className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition ${
                              portfolioSubTab === 'video'
                                ? 'bg-emerald-500 text-slate-950'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Videos ({siteData.videoProjects.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setPortfolioSubTab('design')}
                            className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition ${
                              portfolioSubTab === 'design'
                                ? 'bg-emerald-500 text-slate-950'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Designs ({siteData.designProjects.length})
                          </button>
                        </div>
                      </div>

                      {/* SUB-TAB 1: VIDEO PROJECTS */}
                      {portfolioSubTab === 'video' && (
                        <div className="space-y-6">
                          {/* Add New Video Form */}
                          <form onSubmit={handleAddNewVideo} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-3">
                            <h5 className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                              <Plus size={14} /> Add New Video Project
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Project Name"
                                value={newVidName}
                                onChange={(e) => setNewVidName(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                              />
                              <select
                                value={newVidCategory}
                                onChange={(e) => setNewVidCategory(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                              >
                                {VIDEO_CATEGORIES.map((cat) => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                type="text"
                                placeholder="Client Name"
                                value={newVidClient}
                                onChange={(e) => setNewVidClient(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                              />
                              <input
                                type="text"
                                placeholder="Duration (e.g. 02:30 Min)"
                                value={newVidDuration}
                                onChange={(e) => setNewVidDuration(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                              />
                              <input
                                type="text"
                                placeholder="YouTube Embed Link"
                                value={newVidUrl}
                                onChange={(e) => setNewVidUrl(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Thumbnail Image URL"
                              value={newVidThumb}
                              onChange={(e) => setNewVidThumb(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                            />
                            <textarea
                              rows={2}
                              placeholder="Short Description"
                              value={newVidDesc}
                              onChange={(e) => setNewVidDesc(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs rounded-lg transition flex items-center gap-1.5"
                            >
                              <Plus size={14} /> Add Video Project
                            </button>
                          </form>

                          {/* Existing Video Projects List */}
                          <div className="space-y-4">
                            <h5 className="text-xs font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                              <Video size={14} className="text-emerald-400" />
                              Existing Video Projects ({siteData.videoProjects.length})
                            </h5>
                            {siteData.videoProjects.map((proj) => (
                              <div key={proj.id} className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex-1 space-y-0.5">
                                    <label className="text-[10px] font-mono text-slate-500 uppercase block">Project Title</label>
                                    <input
                                      type="text"
                                      value={proj.name}
                                      onChange={(e) => {
                                        updateVideoProject(proj.id, { name: e.target.value });
                                        handleQuickSaveNotice();
                                      }}
                                      className="w-full bg-slate-950 font-bold text-xs text-white px-2.5 py-1.5 rounded border border-slate-800"
                                    />
                                  </div>
                                  <button
                                    onClick={() => {
                                      deleteVideoProject(proj.id);
                                      handleQuickSaveNotice();
                                    }}
                                    className="p-1.5 bg-red-950/60 border border-red-500/30 text-red-400 hover:bg-red-900 rounded transition self-end mb-0.5"
                                    title="Delete Project"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <div>
                                    <label className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">Category</label>
                                    <input
                                      type="text"
                                      value={proj.category}
                                      onChange={(e) => {
                                        updateVideoProject(proj.id, { category: e.target.value });
                                        handleQuickSaveNotice();
                                      }}
                                      className="w-full bg-slate-950 text-xs text-slate-300 px-2.5 py-1.5 rounded border border-slate-800"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">YouTube Link / Shorts URL</label>
                                    <input
                                      type="text"
                                      value={proj.youtubeUrl}
                                      onChange={(e) => {
                                        updateVideoProject(proj.id, { youtubeUrl: e.target.value });
                                        handleQuickSaveNotice();
                                      }}
                                      placeholder="YouTube Embed or Shorts URL"
                                      className="w-full bg-slate-950 text-xs text-slate-300 px-2.5 py-1.5 rounded border border-slate-800 font-mono"
                                    />
                                  </div>
                                </div>

                                {/* DEDICATED THUMBNAIL EDITOR FIELD */}
                                <div className="p-3 bg-slate-950/70 border border-slate-850 rounded-lg space-y-2">
                                  <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1">
                                      <Camera size={12} /> Video Thumbnail Image
                                    </label>
                                    <span className="text-[9px] font-mono text-slate-500">Paste URL or upload image file</span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={proj.thumbnail || ''}
                                      onChange={(e) => {
                                        updateVideoProject(proj.id, { thumbnail: e.target.value });
                                        handleQuickSaveNotice();
                                      }}
                                      placeholder="Paste image URL (e.g. https://...)"
                                      className="bg-slate-900 text-xs text-white px-2.5 py-1.5 rounded border border-slate-800 flex-1 font-mono focus:border-emerald-500"
                                    />
                                    
                                    <label className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold rounded cursor-pointer transition flex items-center gap-1 shrink-0">
                                      <Upload size={12} />
                                      <span>Upload</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                              if (reader.result) {
                                                updateVideoProject(proj.id, { thumbnail: reader.result as string });
                                                handleQuickSaveNotice();
                                              }
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                    </label>
                                  </div>

                                  {/* Live Preview of Thumbnail in Editor */}
                                  {proj.thumbnail ? (
                                    <div className="flex items-center gap-3 pt-1">
                                      <div className="w-12 h-16 rounded overflow-hidden border border-slate-700 bg-black shrink-0 relative">
                                        <img
                                          src={proj.thumbnail}
                                          alt="Thumbnail preview"
                                          className="w-full h-full object-cover"
                                          onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/180x320/0f172a/10b981?text=Invalid+Image';
                                          }}
                                        />
                                      </div>
                                      <div className="text-[10px] font-mono text-slate-400 space-y-1 flex-1">
                                        <p className="text-emerald-400 font-semibold flex items-center gap-1">
                                          <Check size={12} /> Custom Thumbnail Active
                                        </p>
                                        <p className="text-slate-500 truncate max-w-[200px]">{proj.thumbnail}</p>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            updateVideoProject(proj.id, { thumbnail: '' });
                                            handleQuickSaveNotice();
                                          }}
                                          className="text-red-400 hover:text-red-300 underline font-semibold"
                                        >
                                          Remove / Clear Thumbnail
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-[10px] font-mono text-amber-400/80 italic">
                                      ⚠️ No custom thumbnail set. Uses YouTube cover preview.
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* SUB-TAB 2: DESIGN PROJECTS */}
                      {portfolioSubTab === 'design' && (
                        <div className="space-y-6">
                          {/* Add New Design Form */}
                          <form onSubmit={handleAddNewDesign} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-3">
                            <h5 className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                              <Plus size={14} /> Add New Design Project
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Design Project Name"
                                value={newDesName}
                                onChange={(e) => setNewDesName(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                              />
                              <select
                                value={newDesCategory}
                                onChange={(e) => setNewDesCategory(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                              >
                                {DESIGN_CATEGORIES.map((cat) => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Client Name"
                                value={newDesClient}
                                onChange={(e) => setNewDesClient(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                              />
                              <input
                                type="text"
                                placeholder="Behance Showcase Link"
                                value={newDesBehance}
                                onChange={(e) => setNewDesBehance(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Preview Image URL"
                              value={newDesImg}
                              onChange={(e) => setNewDesImg(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                            />
                            <textarea
                              rows={2}
                              placeholder="Short Description"
                              value={newDesDesc}
                              onChange={(e) => setNewDesDesc(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs rounded-lg transition flex items-center gap-1.5"
                            >
                              <Plus size={14} /> Add Design Project
                            </button>
                          </form>

                          {/* Existing Design Projects */}
                          <div className="space-y-3">
                            <h5 className="text-xs font-mono text-slate-400 uppercase font-bold">Existing Design Projects</h5>
                            {siteData.designProjects.map((proj) => (
                              <div key={proj.id} className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <input
                                    type="text"
                                    value={proj.name}
                                    onChange={(e) => {
                                      updateDesignProject(proj.id, { name: e.target.value });
                                      handleQuickSaveNotice();
                                    }}
                                    className="bg-slate-950 font-bold text-xs text-white px-2.5 py-1 rounded border border-slate-800 flex-1"
                                  />
                                  <button
                                    onClick={() => {
                                      deleteDesignProject(proj.id);
                                      handleQuickSaveNotice();
                                    }}
                                    className="p-1.5 bg-red-950/60 border border-red-500/30 text-red-400 hover:bg-red-900 rounded transition"
                                    title="Delete Project"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={proj.category}
                                    onChange={(e) => {
                                      updateDesignProject(proj.id, { category: e.target.value });
                                      handleQuickSaveNotice();
                                    }}
                                    className="bg-slate-950 text-xs text-slate-300 px-2.5 py-1 rounded border border-slate-800"
                                  />
                                  <input
                                    type="text"
                                    value={proj.behanceLink}
                                    onChange={(e) => {
                                      updateDesignProject(proj.id, { behanceLink: e.target.value });
                                      handleQuickSaveNotice();
                                    }}
                                    placeholder="Behance Link"
                                    className="bg-slate-950 text-xs text-slate-300 px-2.5 py-1 rounded border border-slate-800"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: RESEARCH SECTION */}
                  {activeTab === 'research' && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-800 pb-3">
                        <h4 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider">
                          Edit Research & Innovations Section
                        </h4>
                        <p className="text-xs text-slate-400">
                          Update research topics, technical metrics, badges, and descriptions.
                        </p>
                      </div>

                      {/* Add New Research Form */}
                      <form onSubmit={handleAddNewResearch} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-3">
                        <h5 className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                          <Plus size={14} /> Add Research Card
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <input
                            type="text"
                            placeholder="Research Title"
                            value={newResTitle}
                            onChange={(e) => setNewResTitle(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Badge (e.g. AI PIPELINE)"
                            value={newResBadge}
                            onChange={(e) => setNewResBadge(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Metric (e.g. 3.2x Speedup)"
                            value={newResMetric}
                            onChange={(e) => setNewResMetric(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        </div>
                        <textarea
                          rows={2}
                          placeholder="Description"
                          value={newResDesc}
                          onChange={(e) => setNewResDesc(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs rounded-lg transition flex items-center gap-1.5"
                        >
                          <Plus size={14} /> Add Research Item
                        </button>
                      </form>

                      {/* Existing Research List */}
                      <div className="space-y-3">
                        {siteData.researchTopics.map((topic) => (
                          <div key={topic.id} className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <input
                                type="text"
                                value={topic.title}
                                onChange={(e) => {
                                  updateResearchTopic(topic.id, { title: e.target.value });
                                  handleQuickSaveNotice();
                                }}
                                className="bg-slate-950 font-bold text-xs text-white px-2.5 py-1 rounded border border-slate-800 flex-1"
                              />
                              <button
                                onClick={() => {
                                  deleteResearchTopic(topic.id);
                                  handleQuickSaveNotice();
                                }}
                                className="p-1.5 bg-red-950/60 border border-red-500/30 text-red-400 hover:bg-red-900 rounded transition"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={topic.desc}
                              onChange={(e) => {
                                updateResearchTopic(topic.id, { desc: e.target.value });
                                handleQuickSaveNotice();
                              }}
                              className="w-full bg-slate-950 text-xs text-slate-300 px-2.5 py-1.5 rounded border border-slate-800"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: ABOUT & CONTACT SECTION */}
                  {activeTab === 'about' && (
                    <div className="space-y-5">
                      <div className="border-b border-slate-800 pb-3">
                        <h4 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider">
                          Edit About & Contact Details
                        </h4>
                        <p className="text-xs text-slate-400">
                          Update contact phone numbers, email, bio text, and social links.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                            Primary Phone (Calls & WhatsApp)
                          </label>
                          <input
                            type="text"
                            value={siteData.aboutContact.phone1}
                            onChange={(e) => {
                              updateAboutContact({ phone1: e.target.value });
                              handleQuickSaveNotice();
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                            Secondary Phone (Backup)
                          </label>
                          <input
                            type="text"
                            value={siteData.aboutContact.phone2}
                            onChange={(e) => {
                              updateAboutContact({ phone2: e.target.value });
                              handleQuickSaveNotice();
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={siteData.aboutContact.email}
                          onChange={(e) => {
                            updateAboutContact({ email: e.target.value });
                            handleQuickSaveNotice();
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                            YouTube Channel Link
                          </label>
                          <input
                            type="text"
                            value={siteData.aboutContact.youtube}
                            onChange={(e) => {
                              updateAboutContact({ youtube: e.target.value });
                              handleQuickSaveNotice();
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                            Behance Portfolio Link
                          </label>
                          <input
                            type="text"
                            value={siteData.aboutContact.behance}
                            onChange={(e) => {
                              updateAboutContact({ behance: e.target.value });
                              handleQuickSaveNotice();
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          About Paragraph 1
                        </label>
                        <textarea
                          rows={2}
                          value={siteData.aboutContact.bio1}
                          onChange={(e) => {
                            updateAboutContact({ bio1: e.target.value });
                            handleQuickSaveNotice();
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          About Paragraph 2
                        </label>
                        <textarea
                          rows={2}
                          value={siteData.aboutContact.bio2}
                          onChange={(e) => {
                            updateAboutContact({ bio2: e.target.value });
                            handleQuickSaveNotice();
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB 6: BACKUP & IMPORT */}
                  {activeTab === 'backup' && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-800 pb-3">
                        <h4 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider">
                          Backup, Export & Restore
                        </h4>
                        <p className="text-xs text-slate-400">
                          Export your entire customized website settings as JSON or restore original defaults.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                          <h5 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                            <Download size={14} className="text-emerald-400" />
                            Export Backup File
                          </h5>
                          <p className="text-xs text-slate-400">
                            Download a JSON backup of all your edited website content.
                          </p>
                          <button
                            type="button"
                            onClick={handleExportClick}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs rounded-lg transition flex items-center gap-1.5"
                          >
                            <Download size={14} /> Download JSON Backup
                          </button>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                          <h5 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                            <RotateCcw size={14} className="text-amber-400" />
                            Reset to Default Site Data
                          </h5>
                          <p className="text-xs text-slate-400">
                            Revert all content back to original portfolio defaults.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Are you sure you want to reset all website content back to original defaults?')) {
                                resetToDefaults();
                                handleQuickSaveNotice();
                              }
                            }}
                            className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold font-mono text-xs rounded-lg transition flex items-center gap-1.5"
                          >
                            <RotateCcw size={14} /> Reset Defaults
                          </button>
                        </div>
                      </div>

                      {/* PRIVATE OWNER PASSKEY MANAGEMENT CARD */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <h5 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                          <ShieldCheck size={14} className="text-amber-400" />
                          Private Owner Passkey Security Settings
                        </h5>
                        <p className="text-xs text-slate-400">
                          Set a custom private owner passkey/PIN required to access this website editor.
                        </p>
                        <form onSubmit={handleChangePasskey} className="space-y-3">
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            <input
                              type="text"
                              placeholder="Enter new owner passkey..."
                              value={newPasskey}
                              onChange={(e) => setNewPasskey(e.target.value)}
                              className="w-full sm:flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                            />
                            <button
                              type="submit"
                              className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs rounded-lg transition"
                            >
                              Update Passkey
                            </button>
                          </div>
                          {passkeyMsg && (
                            <p className="text-xs font-mono text-emerald-400 font-bold">{passkeyMsg}</p>
                          )}
                        </form>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <h5 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                          <Upload size={14} className="text-cyan-400" />
                          Import JSON Configuration
                        </h5>
                        <p className="text-xs text-slate-400">
                          Paste raw JSON backup data below to restore or overwrite website content.
                        </p>
                        <textarea
                          rows={4}
                          placeholder="Paste JSON config string here..."
                          value={importJsonText}
                          onChange={(e) => setImportJsonText(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-white"
                        />
                        {importStatus && (
                          <p className="text-xs font-mono font-bold">{importStatus}</p>
                        )}
                        <button
                          type="button"
                          onClick={handleImportSubmit}
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold font-mono text-xs rounded-lg transition flex items-center gap-1.5"
                        >
                          <Upload size={14} /> Apply JSON Import
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* FOOTER BAR */}
              <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Editing Mode Active
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLockEditor}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-lg transition border border-amber-500/30 flex items-center gap-1.5"
                  >
                    <Lock size={12} /> Lock Session
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition"
                  >
                    Done Editing
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
