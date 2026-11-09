export interface VideoProject {
  id: string;
  name: string;
  category: string;
  description: string;
  clientName: string;
  duration: string;
  softwareUsed: string[];
  thumbnail?: string;
  youtubeUrl: string; // Embed/link
  highlights: string[];
  completionYear: number;
}

export interface DesignProject {
  id: string;
  name: string;
  category: string;
  description: string;
  clientName: string;
  toolsUsed: string[];
  previewImage: string;
  behanceLink: string;
  highlights: string[];
  completionYear: number;
}

export interface Testimonial {
  clientName: string;
  country: string;
  review: string;
  rating: number;
}

export interface SoftwareIcon {
  name: string;
  abbreviation: string;
  color: string;
  imageUrl?: string;
}

export const SOFTWARES: SoftwareIcon[] = [
  { name: 'Canva', abbreviation: 'Cv', color: 'from-cyan-500 to-teal-600', imageUrl: 'https://i.postimg.cc/4491SGQd/121.png' },
  { name: 'AI Generative Tools', abbreviation: 'AI', color: 'from-cyan-500 to-purple-800', imageUrl: 'https://i.postimg.cc/qB3G5rxg/t6t.png' },
  { name: 'Adobe Illustrator', abbreviation: 'Ai', color: 'from-amber-500 to-orange-700', imageUrl: 'https://i.postimg.cc/KcM5HbDT/q.png' },
  { name: 'Adobe Photoshop', abbreviation: 'Ps', color: 'from-blue-600 to-indigo-900', imageUrl: 'https://i.postimg.cc/1RqKjSrX/qqqwe.png' },
  { name: 'Adobe After Effects', abbreviation: 'Ae', color: 'from-purple-600 to-violet-900', imageUrl: 'https://i.postimg.cc/zDgkcNFH/qq.png' },
  { name: 'Adobe Premiere Pro', abbreviation: 'Pr', color: 'from-violet-600 to-indigo-950', imageUrl: 'https://i.postimg.cc/9X7Bn2Y4/qqq.png' },
  { name: 'CapCut', abbreviation: 'Cc', color: 'from-slate-700 to-slate-900', imageUrl: 'https://i.postimg.cc/BZKCV3Bj/sew.png' }
];

export const VIDEO_CATEGORIES = [
  'Commercial Advertisement',
  'Promotional Video',
  'Corporate Video',
  'Documentary',
  'YouTube Video',
  'Podcast',
  'Educational Video',
  'Social Media Reel',
  'Short Film',
  'Product Advertisement',
  'Event Highlight',
  'Interview',
  'Motion Graphics',
  'Islamic Content',
  'Travel Video',
  'Wedding Highlight'
];

export const DESIGN_CATEGORIES = [
  'Poster Design',
  'Banner Design',
  'Social Media Design',
  'Facebook Cover',
  'YouTube Thumbnail',
  'Logo Design',
  'Brand Identity',
  'Business Card',
  'Flyer Design',
  'Brochure Design',
  'Packaging Design',
  'Roll-up Banner',
  'Billboard Design',
  'Certificate Design',
  'Book Cover Design'
];

export const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: 'vid_01_talkinghead',
    name: 'Before After Talking Head',
    category: 'YouTube Short / Reel',
    description: 'Professional before & after talking head edit with dynamic framing, clean audio mastering, and color grading.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects'],
    youtubeUrl: 'https://youtube.com/shorts/GjE7dtwXYmI',
    thumbnail: 'https://i.ytimg.com/vi/GjE7dtwXYmI/oar2.jpg',
    highlights: ['Before & After', 'Talking Head', 'Color Grading'],
    completionYear: 2026
  },
  {
    id: 'vid_02_viralshorts',
    name: 'Viral Shorts',
    category: 'YouTube Short / Reel',
    description: 'High-energy viral short edit featuring fast cuts, motion graphics, and engaging audio pacing.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects'],
    youtubeUrl: 'https://youtube.com/shorts/7Qik9AO8ICg',
    thumbnail: 'https://i.postimg.cc/RZMpXg0C/Screenshot-2026-09-13-183541.png',
    highlights: ['Viral Reel', 'Motion Pacing', 'Sound Design'],
    completionYear: 2026
  },
  {
    id: 'vid_03_motiongraphics',
    name: 'Motion Graphics & Kinetic Reel',
    category: 'YouTube Short / Reel',
    description: 'Engaging vertical motion graphics edit with sleek kinetic typography and seamless transitions.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe After Effects', 'Adobe Premiere Pro'],
    youtubeUrl: 'https://youtube.com/shorts/W9oWg03TyVs',
    thumbnail: 'https://i.postimg.cc/7ZxtmKLH/Screenshot-2026-09-13-183628.png',
    highlights: ['Motion Graphics', 'Kinetic Typography', 'Transitions'],
    completionYear: 2026
  },
  {
    id: 'vid_04_dynamiccomp',
    name: 'Dynamic Vertical Reel Edit',
    category: 'YouTube Short / Reel',
    description: 'High-tempo vertical reel edit featuring fast cuts, motion graphics, and audio sync.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut'],
    youtubeUrl: 'https://youtube.com/shorts/yv6bvPoPEzw',
    thumbnail: 'https://i.ytimg.com/vi/yv6bvPoPEzw/oar2.jpg',
    highlights: ['Vertical Reel', 'Motion Graphics', 'Sound Design'],
    completionYear: 2026
  },
  {
    id: 'vid_05_assunnah',
    name: 'Assunnah Ad Final',
    category: 'Commercial Ad / Vertical Short',
    description: 'High-impact commercial advertisement edit for Assunnah Foundation featuring cinematic pacing, sound design, and color grading.',
    clientName: 'Assunnah Foundation',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects'],
    youtubeUrl: 'https://youtube.com/shorts/jtk6glAzAdA',
    thumbnail: 'https://i.ytimg.com/vi/jtk6glAzAdA/oar2.jpg',
    highlights: ['Commercial Ad', 'Sound Design', 'Motion Pacing'],
    completionYear: 2026
  },
  {
    id: 'vid_06_featured',
    name: 'Featured Vertical Short #2',
    category: 'YouTube Short / Reel',
    description: 'High-energy vertical reel edit featuring fast cuts, motion graphics, and audio sync.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects'],
    youtubeUrl: 'https://youtube.com/shorts/NDb6XfrtvuQ?feature=share',
    thumbnail: 'https://i.ytimg.com/vi/NDb6XfrtvuQ/oar2.jpg',
    highlights: ['Vertical Reel', 'High-speed Cuts', 'Sound Design'],
    completionYear: 2026
  },
  {
    id: 'vid_07_featured',
    name: 'Featured Vertical Short #3',
    category: 'YouTube Short / Reel',
    description: 'Engaging vertical content edit with sleek visual typography and smooth cuts.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'CapCut'],
    youtubeUrl: 'https://youtube.com/shorts/KsCEsAUmtKA?feature=share',
    thumbnail: 'https://i.ytimg.com/vi/KsCEsAUmtKA/oar2.jpg',
    highlights: ['Vertical Reel', 'Kinetic Typography', 'Transitions'],
    completionYear: 2026
  },
  {
    id: 'vid_08_featured',
    name: 'Featured Vertical Short #4',
    category: 'YouTube Short / Reel',
    description: 'Creative short format video with custom color matrix and visual rhythm.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    youtubeUrl: 'https://youtube.com/shorts/FlD4ETG3t6Y?feature=share',
    thumbnail: 'https://i.ytimg.com/vi/FlD4ETG3t6Y/oar2.jpg',
    highlights: ['Vertical Reel', 'Color Matrix', 'Visual Rhythm'],
    completionYear: 2026
  },
  {
    id: 'vid_09_featured',
    name: 'Featured Vertical Short #5',
    category: 'YouTube Short / Reel',
    description: 'Sleek commercial short edit crafted for high audience engagement.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects'],
    youtubeUrl: 'https://youtube.com/shorts/tkIf1SibtKc?feature=share',
    thumbnail: 'https://i.ytimg.com/vi/tkIf1SibtKc/oar2.jpg',
    highlights: ['Vertical Reel', 'Commercial Edit', 'Audience Engagement'],
    completionYear: 2026
  }
];

export const DESIGN_PROJECTS: DesignProject[] = [
  {
    id: 'des_01',
    name: 'Sovereign Bengal Rickshaw-Fusion Identity',
    category: 'Brand Identity',
    description: 'Premium visual brand identity pack combining floral Rickshaw painting patterns from old Dhaka with modern bold layouts.',
    clientName: 'Sonar Tea Bangladesh',
    toolsUsed: ['Photoshop', 'Illustrator'],
    previewImage: '/src/assets/images/bangladesh_art_showcase_1784532243275.jpg',
    behanceLink: 'https://www.behance.net/tashfiqahmad',
    highlights: ['Premium Design', 'Modern Layout', 'Print Ready', 'High Resolution'],
    completionYear: 2025
  },
  {
    id: 'des_02',
    name: 'Cyberpunk Dhaka Cyber-Tiger Poster',
    category: 'Poster Design',
    description: 'A striking digital showcase poster fusing traditional Royal Bengal Tiger symbols with a glowing neon grid and cyber-aesthetic lines.',
    clientName: 'Dhaka Retro Concerts',
    toolsUsed: ['Photoshop', 'Illustrator'],
    previewImage: '/src/assets/images/portfolio_hero_banner_1784532214740.jpg',
    behanceLink: 'https://www.behance.net/tashfiqahmad',
    highlights: ['Vibrant Neon Palettes', 'High Resolution', 'Modern Layout', 'Geometric Composition'],
    completionYear: 2025
  },
  {
    id: 'des_03',
    name: 'Meta Automation Brand Deck',
    category: 'Brand Identity',
    description: 'Complete branding and social kit highlighting streamlined automation workflows, customized templates, and cover designs.',
    clientName: 'Optima BD Automation',
    toolsUsed: ['Illustrator', 'Canva'],
    previewImage: '/src/assets/images/profile_avatar_1784532229274.jpg',
    behanceLink: 'https://www.behance.net/tashfiqahmad',
    highlights: ['Social Media Design', 'Consistent Kit styling', 'Print Ready', 'Vector Scalable'],
    completionYear: 2026
  }
];

export interface AiVideoProject {
  id: string;
  name: string;
  category: string;
  description: string;
  clientName?: string;
  duration?: string;
  softwareUsed?: string[];
  thumbnail?: string;
  youtubeUrl: string;
  highlights?: string[];
  completionYear?: number;
}

export const AI_VIDEO_PROJECTS: AiVideoProject[] = [
  {
    id: 'ai_vid_01',
    name: 'AI Video Project #1',
    category: 'AI Generated / Short',
    description: 'Cutting-edge AI video synthesis, dynamic character animation, and high-impact visual aesthetics.',
    clientName: 'Featured AI Project',
    duration: '00:60 Min',
    softwareUsed: ['AI Generative Tools', 'Adobe Premiere Pro', 'Adobe After Effects'],
    youtubeUrl: 'https://youtube.com/shorts/ICWzjGkHSxs?feature=share',
    thumbnail: 'https://i.ytimg.com/vi/ICWzjGkHSxs/oar2.jpg',
    highlights: ['AI Video Generation', 'Prompt Engineering', 'Cinematic Color'],
    completionYear: 2026
  },
  {
    id: 'ai_vid_02',
    name: 'AI Video Project #2',
    category: 'AI Generated / Short',
    description: 'High-tempo neural video motion, realistic motion synthesis, and engaging audio pacing.',
    clientName: 'Featured AI Project',
    duration: '00:60 Min',
    softwareUsed: ['AI Generative Tools', 'Adobe After Effects'],
    youtubeUrl: 'https://youtube.com/shorts/IS_xUdZRPm0?feature=share',
    thumbnail: 'https://i.ytimg.com/vi/IS_xUdZRPm0/oar2.jpg',
    highlights: ['Neural Motion', 'Sound Design', 'Visual Rhythm'],
    completionYear: 2026
  },
  {
    id: 'ai_vid_03',
    name: 'AI Video Project #3',
    category: 'AI Generated / Short',
    description: 'Innovative AI creative storytelling edit featuring fluid camera transitions and artistic mood.',
    clientName: 'Featured AI Project',
    duration: '00:60 Min',
    softwareUsed: ['AI Generative Tools', 'Adobe Premiere Pro', 'CapCut'],
    youtubeUrl: 'https://youtube.com/shorts/lkBMqZS4d2w?feature=share',
    thumbnail: 'https://i.ytimg.com/vi/lkBMqZS4d2w/oar2.jpg',
    highlights: ['AI Storytelling', 'Cinematic Flow', 'Audio Sync'],
    completionYear: 2026
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    clientName: 'Affan',
    country: 'Bangladesh',
    review: "I have had work done by many people so far, but I haven't found anyone who worked with as much sincerity as you did.",
    rating: 5
  }
];

export const CONTACT_INFO = {
  name: 'Tashfiq Ahmad Tamim',
  title: 'Video Editor & Creative Specialist',
  location: '',
  phone1: '01823980528',
  phone2: '01404783319',
  email: 'tashfiqahmad.yaqoot@gmail.com',
  youtube: 'https://www.youtube.com/channel/UCdVuiWsKiGCJMY8B-K35WUw',
  behance: 'https://www.behance.net/tashfiqahmad',
  linkedin: 'https://www.linkedin.com/feed/',
  facebook: 'https://www.facebook.com/tashfiqahmad.tamim.3',
  instagram: 'https://www.instagram.com/tashfiq_tamim?igsh=ankwYXFmNTRteW83',
  telegram: 'https://web.telegram.org/k/#777000'
};

