import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Video, Palette, Bot, Megaphone, ExternalLink } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface AboutContactProps {
  avatarImage: string;
}

// Custom crisp SVG icons for the 8 Social Media / Contact Links
function YouTubeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function BehanceIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-4.813 3-3.035 0-5.274-2.115-5.274-5.281 0-3.078 2.164-5.385 5.176-5.385 3.253 0 4.887 2.185 4.887 5.06 0 .385-.052.883-.09 1.155h-7.668c.092 1.405 1.139 2.455 2.656 2.455 1.341 0 2.125-.623 2.518-1.504h2.608zm-4.885-6.195c-1.312 0-2.227.801-2.43 2.05h4.723c-.086-1.15-.904-2.05-2.293-2.05zM8.228 14.348c.84 0 1.572-.375 1.572-1.332 0-1.021-.832-1.312-1.688-1.312H4.729v2.644h3.499zm.227-5.592c.738 0 1.393-.342 1.393-1.152 0-.853-.715-1.139-1.504-1.139H4.729v2.291h3.726zM2 4h6.812c2.404 0 4.102.824 4.102 2.709 0 1.092-.553 1.943-1.467 2.404 1.295.424 2.037 1.455 2.037 2.871 0 2.223-1.895 3.016-4.225 3.016H2V4z"/>
    </svg>
  );
}

function LinkedInIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function TelegramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.03 9.56c-.15.68-.56.84-1.13.52l-3.1-2.28-1.5 1.44c-.17.17-.31.31-.63.31l.22-3.17 5.77-5.21c.25-.22-.05-.34-.39-.12l-7.14 4.49-3.07-.96c-.67-.21-.68-.67.14-.99l12.01-4.63c.56-.21 1.05.13.85.92z"/>
    </svg>
  );
}

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function GmailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}

export default function AboutContact({ avatarImage }: AboutContactProps) {
  const { siteData } = useSiteData();
  const contact = siteData?.aboutContact;

  // 8 Social Online Links in exact requested order: WhatsApp, Gmail, Telegram, Facebook, Instagram, Behance, LinkedIn, YouTube
  const socialLinks = [
    {
      name: 'WhatsApp',
      url: contact?.phone1 ? `https://wa.me/880${contact.phone1.replace(/^0+/, '')}` : 'https://wa.me/8801823980528',
      icon: WhatsAppIcon,
      hoverColor: 'hover:text-cyan-400 hover:border-cyan-400/60 hover:shadow-cyan-400/30',
      glow: 'from-cyan-500/25 via-teal-500/15 to-transparent',
    },
    {
      name: 'Gmail',
      url: contact?.email ? (contact.email.startsWith('mailto:') ? contact.email : `mailto:${contact.email}`) : 'mailto:tashfiqahmad.yaqoot@gmail.com',
      icon: GmailIcon,
      hoverColor: 'hover:text-purple-300 hover:border-purple-400/60 hover:shadow-purple-400/30',
      glow: 'from-purple-500/25 via-fuchsia-500/15 to-transparent',
    },
    {
      name: 'Telegram',
      url: contact?.telegram || 'https://web.telegram.org/k/#777000',
      icon: TelegramIcon,
      hoverColor: 'hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-cyan-400/30',
      glow: 'from-teal-500/25 via-cyan-400/15 to-transparent',
    },
    {
      name: 'Facebook',
      url: contact?.facebook || 'https://www.facebook.com/tashfiqahmad.tamim.3',
      icon: FacebookIcon,
      hoverColor: 'hover:text-purple-400 hover:border-purple-400/60 hover:shadow-purple-400/30',
      glow: 'from-fuchsia-400/25 via-purple-500/15 to-transparent',
    },
    {
      name: 'Instagram',
      url: contact?.instagram || 'https://www.instagram.com/tashfiq_tamim?igsh=ankwYXFmNTRteW83',
      icon: InstagramIcon,
      hoverColor: 'hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-cyan-400/30',
      glow: 'from-cyan-500/25 via-purple-400/15 to-transparent',
    },
    {
      name: 'Behance',
      url: contact?.behance || 'https://www.behance.net/tashfiqahmad',
      icon: BehanceIcon,
      hoverColor: 'hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-cyan-400/30',
      glow: 'from-teal-500/25 via-cyan-500/15 to-transparent',
    },
    {
      name: 'LinkedIn',
      url: contact?.linkedin || 'https://www.linkedin.com/feed/',
      icon: LinkedInIcon,
      hoverColor: 'hover:text-cyan-300 hover:border-cyan-300/60 hover:shadow-cyan-300/30',
      glow: 'from-cyan-400/25 via-fuchsia-500/15 to-transparent',
    },
    {
      name: 'YouTube',
      url: contact?.youtube || 'https://www.youtube.com/channel/UCdVuiWsKiGCJMY8B-K35WUw',
      icon: YouTubeIcon,
      hoverColor: 'hover:text-cyan-400 hover:border-cyan-400/60 hover:shadow-cyan-400/30',
      glow: 'from-cyan-500/25 via-teal-500/15 to-transparent',
    },
  ];

  const badges = [
    { label: 'Professional Video Editor', icon: Video },
    { label: 'Graphic Designer', icon: Palette },
    { label: 'AI Specialist', icon: Bot },
    { label: 'Social Media Marketer', icon: Megaphone },
  ];

  return (
    <div id="about-and-contact-section" className="space-y-16 py-8 relative">
      {/* LUXURIOUS AMBIENT DUAL GLOW BACKGROUNDS */}
      <div 
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 opacity-20"
        style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-10 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0 opacity-25"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />

      {/* ==================== ABOUT ME SECTION ==================== */}
      <section id="about" className="scroll-mt-24 bg-black/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-4 sm:p-8 md:p-12 shadow-[0_0_50px_rgba(34,211,238,0.08)] relative overflow-hidden z-10 w-full max-w-full">
        {/* Corner Dual Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/60 via-fuchsia-400/50 to-purple-500/60" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-full">
          
          {/* LEFT COLUMN: Profile Photo with subtle Dual Glow & Floating Animation */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <motion.div 
              className="relative group"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Subtle Dual Glow behind image */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-cyan-500/35 via-fuchsia-400/25 to-purple-600/35 rounded-3xl blur-2xl group-hover:opacity-100 opacity-70 transition-all duration-700" />

              {/* Profile Image Frame */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl p-1 bg-gradient-to-b from-cyan-400/60 via-fuchsia-400/30 to-purple-900/50 shadow-2xl overflow-hidden">
                <img
                  id="artist-avatar"
                  src={avatarImage}
                  alt="Tashfiq Ahmad Tamim"
                  className="w-full h-full object-cover rounded-xl border border-cyan-500/20"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Verified Sparkle Badge */}
              <div className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full bg-black/90 border border-cyan-400/60 shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="text-cyan-400 animate-pulse" size={14} />
                <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-300 uppercase">
                  Specialist
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: About Me Content */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6 text-left w-full max-w-full overflow-hidden">
            
            {/* Section Eyebrow Title */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md max-w-full"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                ABOUT ME
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight leading-tight break-words [overflow-wrap:anywhere]"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-purple-400">Tashfiq Ahmad Tamim</span>.
            </motion.h2>

            {/* Description Paragraphs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-3.5 sm:space-y-4 text-xs sm:text-base text-slate-300 font-sans leading-relaxed font-normal break-words [overflow-wrap:anywhere]"
            >
              <p className="text-cyan-200/90 font-medium">
                Professional Video Editor, Graphic Designer, AI Specialist &amp; Social Media Marketer based in Bangladesh.
              </p>

              <p>
                I specialize in creating cinematic video edits, commercial advertisements, social media content, and premium graphic designs that help brands, businesses, and creators stand out.
              </p>

              <p>
                I also work with modern AI tools to improve creativity, speed, and workflow, allowing me to deliver high-quality results efficiently.
              </p>

              <p>
                My goal is to combine creativity, storytelling, and technology to create visually stunning content that leaves a lasting impression.
              </p>

              <p>
                Whether you need a promotional video, YouTube editing, social media design, or complete visual branding, I'm always ready to transform your ideas into reality.
              </p>
            </motion.div>

            {/* Stylish Professional Roles Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-2 sm:pt-3 flex flex-wrap gap-2 sm:gap-3 max-w-full"
            >
              {badges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs md:text-sm font-medium shadow-md backdrop-blur-md hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 max-w-full break-words"
                  >
                    <Icon size={15} className="text-cyan-400 shrink-0" />
                    <span className="break-words">{badge.label}</span>
                  </div>
                );
              })}
            </motion.div>

          </div>

        </div>
      </section>


      {/* ==================== FIND ME ONLINE SECTION ==================== */}
      <section id="contact" className="scroll-mt-24 bg-black/80 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_0_50px_rgba(34,211,238,0.08)] text-center relative overflow-hidden z-10">
        
        {/* Subtle Dual Glow Header Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-4 mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md">
            <Sparkles className="text-cyan-400" size={14} />
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              CONNECT &amp; COLLABORATE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            FIND ME ONLINE
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            Click any icon below to view my official profiles, portfolio showcases, or get in direct contact with me instantly.
          </p>
        </div>

        {/* 8 Circular Social Media Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto relative z-10">
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={idx}
                id={`social-link-${social.name.toLowerCase()}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/50 shadow-xl backdrop-blur-xl transition-all duration-300 ${social.hoverColor}`}
              >
                {/* Background ambient radial glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${social.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                {/* Circular Icon Container */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900/90 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:text-white group-hover:border-cyan-400 group-hover:scale-110 shadow-lg transition-all duration-300">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Platform Name */}
                <div className="mt-3 flex items-center gap-1">
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-300 group-hover:text-cyan-300 transition-colors">
                    {social.name}
                  </span>
                  <ExternalLink size={10} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
              </motion.a>
            );
          })}
        </div>

      </section>
    </div>
  );
}
