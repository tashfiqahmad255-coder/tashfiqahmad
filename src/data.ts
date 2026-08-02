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
    id: 'vid_01',
    name: 'Featured Short #1',
    category: 'YouTube Short / Reel',
    description: 'Cinematic vertical short video with dynamic motion pacing and color grading.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects'],
    youtubeUrl: 'https://youtu.be/au2xoh2zcyI',
    highlights: ['Vertical Reel', 'Color Grading', 'Motion Editing'],
    completionYear: 2026
  },
  {
    id: 'vid_02',
    name: 'Featured Short #2',
    category: 'YouTube Short / Reel',
    description: 'High-energy vertical reel edit featuring fast cuts, motion graphics, and audio sync.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects'],
    youtubeUrl: 'https://youtu.be/Lo9j44fRxek',
    highlights: ['Vertical Reel', 'High-speed Cuts', 'Sound Design'],
    completionYear: 2026
  },
  {
    id: 'vid_03',
    name: 'Featured Short #3',
    category: 'YouTube Short / Reel',
    description: 'Engaging vertical content edit with sleek visual typography and transitions.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'CapCut'],
    youtubeUrl: 'https://youtube.com/shorts/KsCEsAUmtKA?feature=share',
    highlights: ['Vertical Reel', 'Kinetic Typography', 'Transitions'],
    completionYear: 2026
  },
  {
    id: 'vid_04',
    name: 'Featured Short #4',
    category: 'YouTube Short / Reel',
    description: 'Creative short format video with custom color matrix and smooth visual pacing.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'DaVinci Resolve'],
    youtubeUrl: 'https://youtube.com/shorts/FlD4ETG3t6Y?feature=share',
    highlights: ['Vertical Reel', 'Color Grading', 'Visual Pacing'],
    completionYear: 2026
  },
  {
    id: 'vid_05',
    name: 'Featured Short #5',
    category: 'YouTube Short / Reel',
    description: 'Sleek commercial short edit crafted for viral audience retention.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects'],
    youtubeUrl: 'https://youtube.com/shorts/tkIf1SibtKc?feature=share',
    highlights: ['Vertical Reel', 'Commercial Edit', 'Audience Retention'],
    completionYear: 2026
  },
  {
    id: 'vid_06',
    name: 'Featured Short #6',
    category: 'YouTube Short / Reel',
    description: 'Dynamic motion short with precise beat-synced cuts and aesthetic overlays.',
    clientName: 'Featured Project',
    duration: '00:60 Min',
    softwareUsed: ['Adobe Premiere Pro', 'Adobe After Effects'],
    youtubeUrl: 'https://youtube.com/shorts/EVjEsKVi51w?feature=share',
    highlights: ['Vertical Reel', 'Beat Syncing', 'Aesthetic Overlays'],
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
    behanceLink: 'https://www.behance.net/tashfiqtamim',
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
    behanceLink: 'https://www.behance.net/tashfiqtamim',
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
    behanceLink: 'https://www.behance.net/tashfiqtamim',
    highlights: ['Social Media Design', 'Consistent Kit styling', 'Print Ready', 'Vector Scalable'],
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
  behance: 'https://www.behance.net/tashfiqtamim',
  linkedin: 'https://www.linkedin.com/feed/',
  facebook: 'https://www.facebook.com/tashfiqahmad.tamim.3',
  instagram: 'https://www.instagram.com/tashfiq_tamim?igsh=ankwYXFmNTRteW83',
  telegram: 'https://web.telegram.org/k/#777000'
};
