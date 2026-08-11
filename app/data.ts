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
  outcomeHeading: string;
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
    summary: "A fast-paced reel that brings selected design and video work into one focused sequence.",
    image: "/images/project-2.jpg",
    accent: "orange",
    client: "Selected work",
    year: "2026",
    role: "Video editor & designer",
    tools: "Editing, pacing, titles, sound design",
    deliverables: "Showreel, social cutdowns, motion titles",
    challenge: "Connect different types of work in one reel without making the edit feel rushed or disconnected.",
    approach: "I grouped the footage into short sections, used simple type treatments, and kept transitions controlled so each piece had enough time to register.",
    outcomeHeading: "A reel that is easy to update.",
    result: "A reusable reel structure that can grow with new work and adapt to shorter social cuts.",
    featured: true,
    video: true,
  },
  {
    slug: "digital-marketing-campaign",
    title: "Digital Marketing Mastery",
    category: "Graphic Design",
    kicker: "Campaign design system",
    summary: "A webinar campaign system that makes a technical topic easier to understand and promote.",
    image: "/images/project-2.jpg",
    accent: "orange",
    client: "Webinar campaign",
    year: "2025",
    role: "Graphic designer",
    tools: "Adobe Photoshop",
    deliverables: "Key visual, webinar graphics, social assets",
    challenge: "Turn a detailed digital marketing topic into graphics that are easy to scan on presentation screens and social feeds.",
    approach: "I used bold type, a focused orange palette, and device mockups to connect the webinar presentation with its promotional assets.",
    outcomeHeading: "One system across every campaign asset.",
    result: "A consistent set of assets that carries the same hierarchy from the webinar presentation to mobile campaign graphics.",
    behance: "https://www.behance.net/gallery/226541053/Digital-Marketing-Mastery-Webinar-Social-Media-Design",
    featured: true,
  },
  {
    slug: "short-form-social-edits",
    title: "Short-form Social Edits",
    category: "Video Editing",
    kicker: "Social-first editing system",
    summary: "A repeatable editing format for hooks, captions, branded frames, and short promotional videos.",
    image: "/images/project-3.jpg",
    accent: "blue",
    client: "Capability showcase",
    year: "2026",
    role: "Video editor & motion designer",
    tools: "Editing, captions, motion graphics",
    deliverables: "Vertical edits, promo cutdowns, title cards",
    challenge: "Keep short-form videos easy to follow while adapting the same message for different lengths and placements.",
    approach: "Each edit starts with a clear hook, keeps captions inside safe areas, and uses pattern changes and reusable end cards to hold attention.",
    outcomeHeading: "A repeatable format for short-form content.",
    result: "A practical editing system for producing Reels, Shorts, and campaign cutdowns more efficiently.",
    featured: true,
    video: true,
  },
  {
    slug: "ai-business-model-landing-page",
    title: "AI Business Model Landing Page",
    category: "Web / Digital",
    kicker: "Conversion-focused web design",
    summary: "A responsive landing page that turns a detailed AI business offer into a clear path from interest to action.",
    image: "/images/project-1.jpg",
    accent: "navy",
    client: "Essential Startup Toolkit",
    year: "2025",
    role: "Web & graphic designer",
    tools: "WordPress, Adobe Photoshop",
    deliverables: "Landing page, responsive layouts, visual assets",
    challenge: "Explain a complex business offer without burying the main benefit or call to action.",
    approach: "I organized the page into short sections, paired benefit-led content with product mockups, and repeated the main action at natural decision points.",
    outcomeHeading: "A clearer route from offer to action.",
    result: "A desktop and mobile layout that keeps the offer easy to follow and the next step visible.",
    behance: "https://www.behance.net/gallery/238027647/AI-Business-Model-Landing-Page-Website-Design",
    featured: true,
  },
  {
    slug: "wealth-webinar-presentation",
    title: "Wealth Webinar Presentation",
    category: "Graphic Design",
    kicker: "Presentation design",
    summary: "A flexible slide system for financial education, live teaching, and audience participation.",
    image: "/images/project-3.jpg",
    accent: "blue",
    client: "Financial education webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Slide system, visual assets, presentation template",
    challenge: "Organize a long educational program without making the presentation feel repetitive or hard to deliver live.",
    approach: "I created reusable layouts for lessons, prompts, examples, speaker profiles, and audience activities, then varied the pacing between them.",
    outcomeHeading: "A deck built for live delivery.",
    result: "A presentation template that keeps the webinar consistent while giving each section its own visual rhythm.",
    behance: "https://www.behance.net/gallery/226690009/Wealth-Google-Slides-Webinar-Template",
    featured: true,
  },
  {
    slug: "page-whisper-mobile-app",
    title: "Page Whisper Mobile App",
    category: "Web / Digital",
    kicker: "Mobile product design",
    summary: "A mobile reading concept that makes it easy to discover books, save titles, and move into a focused reading view.",
    image: "/images/project-4.jpg",
    accent: "cyan",
    client: "Page Whisper",
    year: "2025",
    role: "UI/UX designer",
    tools: "Figma, Adobe Photoshop",
    deliverables: "Mobile UI, reading flow, visual system",
    challenge: "Create a simple path from browsing to reading while keeping the books and editorial content at the center.",
    approach: "I used clear tabs, familiar content cards, and a quiet blue interface to reduce distractions and keep navigation predictable.",
    outcomeHeading: "A smoother path from discovery to reading.",
    result: "A connected set of screens that takes readers from discovery to a clean, focused reading experience.",
    behance: "https://www.behance.net/gallery/226752305/Page-Whisper-Mobile-App-UI",
  },
  {
    slug: "heart-health-book-cover",
    title: "Heart Health Made Simple",
    category: "Graphic Design",
    kicker: "Publishing design",
    summary: "A health book cover designed to feel trustworthy, approachable, and easy to recognize at thumbnail size.",
    image: "/images/project-5.jpg",
    accent: "coral",
    client: "Health publishing template",
    year: "2025",
    role: "Cover designer",
    tools: "Canva, Adobe Photoshop",
    deliverables: "Kindle cover, paperback cover, mockup",
    challenge: "Present a sensitive health topic with warmth and authority without making the cover feel clinical.",
    approach: "I paired direct typography with a human illustration and a restrained red palette to make the subject clear and approachable.",
    outcomeHeading: "Clear at thumbnail and print size.",
    result: "A cover concept that stays recognizable across Kindle thumbnails, paperback formats, and promotional mockups.",
    behance: "https://www.behance.net/gallery/226851791/Heart-Health-Book-Cover-Template",
    featured: true,
  },
  {
    slug: "moonlight-car-rental-brochure",
    title: "Moonlight Car Rental",
    category: "Graphic Design",
    kicker: "Print collateral",
    summary: "A brochure system that makes rental options, service details, and booking information easy to scan.",
    image: "/images/project-6.jpg",
    accent: "gold",
    client: "Moonlight Car Rental",
    year: "2023",
    role: "Graphic designer",
    tools: "Canva, Adobe Photoshop",
    deliverables: "Tri-fold brochure, rack card, logo application",
    challenge: "Fit practical rental information into a compact print format without making the layout feel crowded.",
    approach: "I used curved image areas, a charcoal and gold palette, and clear booking prompts to guide the reader through each panel.",
    outcomeHeading: "Service details that are easy to scan.",
    result: "A coordinated brochure and rack card that present the service clearly and keep the booking information easy to find.",
    behance: "https://www.behance.net/gallery/176567239/Dynamic-Brochure-Design-for-Your-Car-Rental-Service",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function projectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
