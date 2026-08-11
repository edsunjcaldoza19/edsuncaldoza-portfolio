export type Project = {
  slug: string;
  title: string;
  category: "Graphic Design" | "Video Editing" | "Web / Digital";
  kicker: string;
  summary: string;
  image: string;
  accent: string;
  client: string;
  year: string;
  role: string;
  tools: string;
  deliverables: string;
  challenge: string;
  approach: string;
  result: string;
  behance?: string;
  featured?: boolean;
  video?: boolean;
};

export const projects: Project[] = [
  {
    slug: "motion-video-reel",
    title: "Motion & Video Reel",
    category: "Video Editing",
    kicker: "Selected moving-image work",
    summary: "A quick-cut reel built around rhythm, clear visual hierarchy, and platform-ready storytelling.",
    image: "/images/project-2.jpg",
    accent: "orange",
    client: "Selected work",
    year: "2026",
    role: "Video editor & designer",
    tools: "Editing, pacing, titles, sound design",
    deliverables: "Showreel, social cutdowns, motion titles",
    challenge: "Bring varied creative work into one energetic sequence without losing clarity or visual consistency.",
    approach: "The edit uses short visual chapters, confident typography, and restrained transitions so every idea lands before the next beat arrives.",
    result: "A flexible reel framework ready to expand with final client-approved footage and platform-specific cuts.",
    featured: true,
    video: true,
  },
  {
    slug: "digital-marketing-campaign",
    title: "Digital Marketing Mastery",
    category: "Graphic Design",
    kicker: "Campaign design system",
    summary: "A punchy visual system that turns a technical marketing topic into a clear, cohesive webinar campaign.",
    image: "/images/project-2.jpg",
    accent: "orange",
    client: "Webinar campaign",
    year: "2025",
    role: "Graphic designer",
    tools: "Adobe Photoshop",
    deliverables: "Key visual, webinar graphics, social assets",
    challenge: "Make a dense digital-marketing topic feel immediately useful and energetic across multiple screen sizes.",
    approach: "A saturated orange field, sharp typographic scale, and device-based mockups create a single recognizable campaign language.",
    result: "A reusable set of campaign assets with consistent hierarchy from desktop presentation to mobile promotion.",
    behance: "https://www.behance.net/gallery/226541053/Digital-Marketing-Mastery-Webinar-Social-Media-Design",
    featured: true,
  },
  {
    slug: "short-form-social-edits",
    title: "Short-form Social Edits",
    category: "Video Editing",
    kicker: "Social-first editing system",
    summary: "A modular editing approach for hooks, captions, branded frames, and fast promotional cutdowns.",
    image: "/images/project-3.jpg",
    accent: "blue",
    client: "Capability showcase",
    year: "2026",
    role: "Video editor & motion designer",
    tools: "Editing, captions, motion graphics",
    deliverables: "Vertical edits, promo cutdowns, title cards",
    challenge: "Keep short-form content legible and engaging while adapting one message to several durations and placements.",
    approach: "Content is structured around a direct opening hook, caption-safe layouts, purposeful pattern changes, and reusable branded end cards.",
    result: "A repeatable editing system designed for efficient iteration across Reels, Shorts, and campaign placements.",
    featured: true,
    video: true,
  },
  {
    slug: "ai-business-model-landing-page",
    title: "AI Business Model Landing Page",
    category: "Web / Digital",
    kicker: "Conversion-focused web design",
    summary: "A responsive long-form landing page that organizes a complex offer into a focused conversion journey.",
    image: "/images/project-1.jpg",
    accent: "navy",
    client: "Essential Startup Toolkit",
    year: "2025",
    role: "Web & graphic designer",
    tools: "WordPress, Adobe Photoshop",
    deliverables: "Landing page, responsive layouts, visual assets",
    challenge: "Present a detailed AI business offer without overwhelming visitors or weakening the primary call to action.",
    approach: "The page uses a disciplined section rhythm, benefit-led hierarchy, product mockups, and repeated conversion moments.",
    result: "A cohesive desktop-to-mobile experience that keeps the offer legible and the action path visible.",
    behance: "https://www.behance.net/gallery/238027647/AI-Business-Model-Landing-Page-Website-Design",
    featured: true,
  },
  {
    slug: "wealth-webinar-presentation",
    title: "Wealth Webinar Presentation",
    category: "Graphic Design",
    kicker: "Presentation design",
    summary: "A friendly, modular slide system for financial education, live teaching, and audience participation.",
    image: "/images/project-3.jpg",
    accent: "blue",
    client: "Financial education webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Slide system, visual assets, presentation template",
    challenge: "Turn a long educational program into a presentation that feels approachable, varied, and easy to deliver live.",
    approach: "Reusable layouts balance bold teaching moments with prompts, examples, speaker profiles, and visual breathing room.",
    result: "A flexible deck system that supports consistent storytelling throughout a full webinar.",
    behance: "https://www.behance.net/gallery/226690009/Wealth-Google-Slides-Webinar-Template",
    featured: true,
  },
  {
    slug: "page-whisper-mobile-app",
    title: "Page Whisper Mobile App",
    category: "Web / Digital",
    kicker: "Mobile product design",
    summary: "A clean reading experience that helps users discover, save, and move through digital books with ease.",
    image: "/images/project-4.jpg",
    accent: "cyan",
    client: "Page Whisper",
    year: "2025",
    role: "UI/UX designer",
    tools: "Figma, Adobe Photoshop",
    deliverables: "Mobile UI, reading flow, visual system",
    challenge: "Create a simple discovery-to-reading flow while keeping book covers and editorial content visually central.",
    approach: "A calm blue system, clear tab navigation, familiar content cards, and focused reading screens reduce friction.",
    result: "A coherent mobile concept that carries users from library discovery into an immersive reading view.",
    behance: "https://www.behance.net/gallery/226752305/Page-Whisper-Mobile-App-UI",
  },
  {
    slug: "heart-health-book-cover",
    title: "Heart Health Made Simple",
    category: "Graphic Design",
    kicker: "Publishing design",
    summary: "An accessible health cover that balances warmth, authority, and clear shelf-level recognition.",
    image: "/images/project-5.jpg",
    accent: "coral",
    client: "Health publishing template",
    year: "2025",
    role: "Cover designer",
    tools: "Canva, Adobe Photoshop",
    deliverables: "Kindle cover, paperback cover, mockup",
    challenge: "Make a sensitive health topic feel trustworthy and human without relying on a clinical visual tone.",
    approach: "Direct typography, a warm illustrated focal point, and a restrained red palette create clarity and empathy.",
    result: "A versatile cover concept designed to remain recognizable across digital thumbnails and print formats.",
    behance: "https://www.behance.net/gallery/226851791/Heart-Health-Book-Cover-Template",
    featured: true,
  },
  {
    slug: "moonlight-car-rental-brochure",
    title: "Moonlight Car Rental",
    category: "Graphic Design",
    kicker: "Print collateral",
    summary: "A compact brochure system that presents rental options and booking information with confident visual flow.",
    image: "/images/project-6.jpg",
    accent: "gold",
    client: "Moonlight Car Rental",
    year: "2023",
    role: "Graphic designer",
    tools: "Canva, Adobe Photoshop",
    deliverables: "Tri-fold brochure, rack card, logo application",
    challenge: "Organize practical rental information into a compact printed format that still feels distinctive and inviting.",
    approach: "Curved image fields, bold booking prompts, and a charcoal-and-gold palette guide readers through the offer.",
    result: "A coordinated print set that makes the service details easy to scan and the booking action hard to miss.",
    behance: "https://www.behance.net/gallery/176567239/Dynamic-Brochure-Design-for-Your-Car-Rental-Service",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function projectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
