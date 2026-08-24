export type Project = {
  slug: string;
  title: string;
  categoryId: WorkCategoryId;
  kicker: string;
  summary: string;
  image: string;
  imageAlt?: string;
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
  externalUrl?: string;
  externalPlatform?: string;
  externalAction?: string;
  featured?: boolean;
  video?: boolean;
};

export type WorkCategoryId = "graphic-design" | "webinar-presentations" | "web-design" | "video-editing";

export type WorkCategory = {
  id: WorkCategoryId;
  number: string;
  title: string;
  description: string;
  previewImage?: string;
  previewAlt?: string;
};

export type ProjectSlot =
  | { kind: "project"; project: Project }
  | { kind: "placeholder"; id: string; title: string; summary: string };

export const projects: Project[] = [
  {
    slug: "ai-business-model-landing-page",
    title: "AI Business Model Landing Page",
    categoryId: "web-design",
    kicker: "Web Design",
    summary: "A clear sales page that turns a detailed AI business offer into an easy path from interest to action.",
    image: "/images/project-1.jpg",
    accent: "navy",
    client: "Essential Startup Toolkit",
    year: "2025",
    role: "Web & graphic designer",
    tools: "WordPress, Adobe Photoshop",
    deliverables: "Landing page, responsive layouts, visual assets",
    challenge: "The offer had a lot to explain, but visitors still needed to find the main benefit and next step quickly.",
    approach: "I broke the page into short, benefit-led sections, paired the message with product mockups, and repeated the main action when visitors were ready to decide.",
    outcomeHeading: "A sales page that keeps the next step clear.",
    result: "The desktop and mobile layouts help visitors scan the offer, understand the value, and move toward the call to action without getting lost.",
    behance: "https://www.behance.net/gallery/238027647/AI-Business-Model-Landing-Page-Website-Design",
    featured: true,
  },
  {
    slug: "smart-income-streams-ai-sales-page",
    title: "Smart Income Streams with AI Sales Page",
    categoryId: "web-design",
    kicker: "Web Design",
    summary: "A responsive long-form page that keeps a detailed AI income offer easy to scan from the first benefit to the final call to action.",
    image: "/images/web-001.jpg",
    imageAlt: "Smart Income Streams with AI sales page shown on desktop, laptop, tablet, and mobile screens",
    accent: "gold",
    client: "ProfitWithAI.com",
    year: "2025",
    role: "Web & graphic designer",
    tools: "WordPress, Adobe Photoshop",
    deliverables: "Long-form sales page, responsive layouts, visual assets",
    challenge: "The page needed to explain a detailed offer without asking visitors to work through a wall of information.",
    approach: "I grouped the offer into focused benefit sections, used responsive product visuals to explain it, and repeated calls to action at natural decision points.",
    outcomeHeading: "A long offer visitors can follow.",
    result: "The responsive page gives visitors a clear route through the offer on desktop, tablet, and mobile.",
    behance: "https://www.behance.net/gallery/238320549/Smart-Income-Streams-with-AI-Long-Form-Sales-Page",
    featured: true,
  },
  {
    slug: "digital-marketing-campaign",
    title: "Digital Marketing Mastery Campaign",
    categoryId: "graphic-design",
    kicker: "Graphic Design",
    summary: "One connected campaign system that carries a clear digital marketing message across webinar and social content.",
    image: "/images/project-2.jpg",
    accent: "orange",
    client: "Webinar campaign",
    year: "2025",
    role: "Graphic designer",
    tools: "Adobe Photoshop",
    deliverables: "Key visual, webinar graphics, social assets",
    challenge: "The topic needed graphics that could be understood quickly on a presentation screen and in a crowded social feed.",
    approach: "I used bold type, a focused orange palette, and device mockups to connect each promotional asset to the webinar.",
    outcomeHeading: "One campaign system, from webinar to feed.",
    result: "The assets keep the same visual hierarchy across the webinar presentation and mobile campaign graphics.",
    behance: "https://www.behance.net/gallery/226541053/Digital-Marketing-Mastery-Webinar-Social-Media-Design",
    featured: true,
  },
  {
    slug: "wealth-webinar-presentation",
    title: "Wealth Webinar Slide System",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "A flexible slide system that helps presenters guide audiences through financial lessons, examples, and activities.",
    image: "/images/project-3.jpg",
    accent: "blue",
    client: "Financial education webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Slide system, visual assets, presentation template",
    challenge: "A long program needed structure that kept the presenter moving and the audience engaged.",
    approach: "I created reusable layouts for lessons, prompts, examples, speaker profiles, and audience activities, then varied the pacing between them.",
    outcomeHeading: "A deck that keeps live lessons moving.",
    result: "The template keeps the webinar consistent while giving every section its own clear visual rhythm.",
    behance: "https://www.behance.net/gallery/226690009/Wealth-Google-Slides-Webinar-Template",
    featured: true,
  },
  {
    slug: "mastering-your-money-webinar",
    title: "Mastering Your Money Webinar",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "An approachable webinar deck that turns financial decisions into a clear learning journey.",
    image: "/images/webinar-001.jpg",
    accent: "orange",
    client: "Financial education webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Webinar deck, slide template, visual assets",
    challenge: "The presentation needed to feel welcoming without losing the structure that live teaching requires.",
    approach: "I combined bold orange and red accents with clear lesson layouts, speaker sections, prompts, and visual examples to guide the audience through each topic.",
    outcomeHeading: "A friendlier way to teach financial decisions.",
    result: "The reusable deck keeps educational content organized and gives every section a clear visual purpose.",
    behance: "https://www.behance.net/gallery/226745875/Mastering-Your-Money-Webinar-Template",
    featured: true,
  },
  {
    slug: "mastering-digital-marketing-webinar",
    title: "Mastering Digital Marketing Webinar",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "A practical webinar template that gives a broad digital marketing topic a focused teaching flow.",
    image: "/images/webinar-002.jpg",
    accent: "green",
    client: "Digital marketing webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Webinar deck, slide template, promotional layouts",
    challenge: "The deck covered a broad topic, but a live session still needed a clear, steady flow.",
    approach: "I used a focused green palette, repeatable content blocks, step-by-step diagrams, proof slides, and offer layouts to keep the information easy to scan.",
    outcomeHeading: "A clearer way to teach a broad topic.",
    result: "The flexible template supports lessons, examples, statistics, and promotional content within one consistent system.",
    behance: "https://www.behance.net/gallery/226721607/Mastering-Digital-Marketing-Webinar-Template",
    featured: true,
  },
  {
    slug: "blue-theme-webinar-deck",
    title: "Blue Theme Webinar Deck",
    categoryId: "webinar-presentations",
    kicker: "Google Slides Design",
    summary: "A flexible blue deck that keeps webinar content, speakers, and audience prompts easy to follow.",
    image: "/images/webinar-003.jpg",
    accent: "cyan",
    client: "Webinar presentation template",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Google Slides deck, reusable layouts, visual assets",
    challenge: "The deck needed to support different webinar topics without losing a recognizable visual structure.",
    approach: "I paired a calm blue palette with bold title areas, framed photography, modular content layouts, and consistent speaker and discussion slides.",
    outcomeHeading: "One reliable structure for different webinar topics.",
    result: "The reusable Google Slides system keeps presentations structured, readable, and visually consistent from start to finish.",
    behance: "https://www.behance.net/gallery/238076371/Blue-Theme-Webinar-Google-Slides-Deck-Template",
    featured: true,
  },
  {
    slug: "social-media-marketing-webinar",
    title: "Social Media Marketing Webinar",
    categoryId: "webinar-presentations",
    kicker: "Google Slides Design",
    summary: "An energetic webinar deck that makes social media marketing lessons clear, engaging, and easy to present.",
    image: "/images/webinar-004.jpg",
    accent: "coral",
    client: "Social media marketing webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Webinar deck, slide template, illustration layouts",
    challenge: "The topic moved quickly, but the presenter still needed a clear structure for live delivery.",
    approach: "I used strong red accents, friendly 3D illustrations, clear section markers, and repeatable lesson layouts to maintain pace and hierarchy.",
    outcomeHeading: "Visual energy with a clear teaching flow.",
    result: "The presentation balances visual energy with practical layouts for lessons, discussions, warnings, and action steps.",
    behance: "https://www.behance.net/gallery/238031503/Social-Media-Marketing-Webinar-Google-Slides-Template",
    featured: true,
  },
  {
    slug: "unlock-financial-freedom-webinar",
    title: "Unlock Financial Freedom Webinar",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "A structured financial webinar deck that gives lessons, speaker content, and audience discussions a clear order.",
    image: "/images/webinar-005.jpg",
    accent: "navy",
    client: "Financial education webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Webinar deck, slide template, visual assets",
    challenge: "The financial topic was detailed, so the audience needed a presentation that felt credible, direct, and manageable.",
    approach: "I used charcoal surfaces, teal accents, direct headlines, structured speaker layouts, and clear caution slides to organize the material.",
    outcomeHeading: "A clear order for complex financial lessons.",
    result: "The reusable webinar deck gives complex financial content a clear order and a professional visual tone.",
    behance: "https://www.behance.net/gallery/226718265/Unlock-Financial-Freedom-Webinar-Template",
    featured: true,
  },
  {
    slug: "page-whisper-mobile-app",
    title: "Page Whisper Reading App",
    categoryId: "web-design",
    kicker: "UI/UX Design",
    summary: "A focused reading app that moves people smoothly from discovery to a calm reading experience.",
    image: "/images/project-4.jpg",
    accent: "cyan",
    client: "Page Whisper",
    year: "2025",
    role: "UI/UX designer",
    tools: "Figma, Adobe Photoshop",
    deliverables: "Mobile UI, reading flow, visual system",
    challenge: "The app needed a simple path from browsing to reading while keeping books and editorial content at the center.",
    approach: "I used clear tabs, familiar content cards, and a quiet blue interface to reduce distractions and keep navigation predictable.",
    outcomeHeading: "A simpler route from discovery to reading.",
    result: "The connected screens take readers from discovery to a clean, focused reading experience.",
    behance: "https://www.behance.net/gallery/226752305/Page-Whisper-Mobile-App-UI",
    featured: true,
  },
  {
    slug: "heart-health-book-cover",
    title: "Heart Health Made Simple",
    categoryId: "graphic-design",
    kicker: "Book Cover Design",
    summary: "A trustworthy health book cover designed to stay clear at thumbnail and print size.",
    image: "/images/project-5.jpg",
    accent: "coral",
    client: "Health publishing template",
    year: "2025",
    role: "Cover designer",
    tools: "Canva, Adobe Photoshop",
    deliverables: "Kindle cover, paperback cover, mockup",
    challenge: "The cover needed to present a sensitive health topic with warmth and authority without feeling clinical.",
    approach: "I paired direct typography with a human illustration and a restrained red palette to make the subject clear and approachable.",
    outcomeHeading: "A cover that stays clear wherever readers see it.",
    result: "The cover stays recognizable across Kindle thumbnails, paperback formats, and promotional mockups.",
    behance: "https://www.behance.net/gallery/226851791/Heart-Health-Book-Cover-Template",
    featured: true,
  },
  {
    slug: "moonlight-car-rental-brochure",
    title: "Moonlight Car Rental Brochure",
    categoryId: "graphic-design",
    kicker: "Print Design",
    summary: "A compact brochure that makes rental options, service details, and booking information easy to find.",
    image: "/images/project-6.jpg",
    accent: "gold",
    client: "Moonlight Car Rental",
    year: "2023",
    role: "Graphic designer",
    tools: "Canva, Adobe Photoshop",
    deliverables: "Tri-fold brochure, rack card, logo application",
    challenge: "The brochure needed to fit practical rental information into a compact format without feeling crowded.",
    approach: "I used curved image areas, a charcoal and gold palette, and clear booking prompts to guide the reader through each panel.",
    outcomeHeading: "Important booking details, easy to scan.",
    result: "The brochure and rack card present the service clearly and keep booking information easy to find.",
    behance: "https://www.behance.net/gallery/176567239/Dynamic-Brochure-Design-for-Your-Car-Rental-Service",
    featured: true,
  },
  {
    slug: "capcut-export-settings",
    title: "CapCut Export Settings for Crisp Video",
    categoryId: "video-editing",
    kicker: "Video Editing",
    summary: "A concise CapCut tutorial that turns technical export settings into a practical checklist for crisp video.",
    image: "/images/video-001.webp",
    imageAlt: "CapCut tutorial title card about export settings that keep video crisp",
    accent: "gold",
    client: "Creator education",
    year: "2026",
    role: "Video Editor",
    tools: "CapCut",
    deliverables: "Tutorial video, screen-recording edit, motion typography",
    challenge: "Viewers needed a quick way to understand several technical export choices without getting buried in settings.",
    approach: "I combined screen recordings, bold text-led sections, and practical comparisons for aspect ratio, resolution, bit rate, codec, format, and frame rate.",
    outcomeHeading: "A practical checklist for better exports.",
    result: "The tutorial moves from setup checks to a practical export checklist in under three minutes.",
    externalUrl: "https://www.dropbox.com/scl/fi/zwuvh531mcnep968p83qf/Module-9.1.mp4?rlkey=jlmao5nu6ve4ig41rs61p0jr4&dl=0",
    externalPlatform: "Dropbox",
    externalAction: "Watch Video",
    featured: true,
    video: true,
  },
  {
    slug: "watermark-free-capcut-exports",
    title: "Watermark-Free CapCut Exports",
    categoryId: "video-editing",
    kicker: "Video Editing",
    summary: "A step-by-step CapCut tutorial that helps creators avoid watermarks while protecting video quality.",
    image: "/images/video-002.webp",
    imageAlt: "CapCut tutorial title card about removing watermarks without losing video quality",
    accent: "gold",
    client: "Creator education",
    year: "2026",
    role: "Video Editor",
    tools: "CapCut",
    deliverables: "Tutorial video, screen-recording edit, motion typography",
    challenge: "Viewers needed to understand why watermarks appear without mixing up Pro assets and export-quality settings.",
    approach: "I separated the lesson into asset checks, free-versus-Pro options, and a final quality checklist supported by screen recordings and concise motion graphics.",
    outcomeHeading: "A simpler path to clean exports.",
    result: "The tutorial helps viewers avoid watermark triggers while keeping their final video quality intact.",
    externalUrl: "https://www.dropbox.com/scl/fi/r2zqv70yj2owfvkym04ad/Module-9.2.mp4?rlkey=lrdzkymohlmhp2gntwm6shk0i&dl=0",
    externalPlatform: "Dropbox",
    externalAction: "Watch Video",
    featured: true,
    video: true,
  },
  {
    slug: "capcut-covers-and-thumbnails",
    title: "CapCut Covers and Thumbnails",
    categoryId: "video-editing",
    kicker: "Video Editing",
    summary: "A focused CapCut build-along that shows creators how to design clear, attention-grabbing covers and thumbnails.",
    image: "/images/video-003.webp",
    imageAlt: "CapCut tutorial title card about creating covers and thumbnails that stop the scroll",
    accent: "gold",
    client: "Creator education",
    year: "2026",
    role: "Video Editor",
    tools: "CapCut",
    deliverables: "Tutorial video, screen-recording edit, motion typography",
    challenge: "The tutorial needed to show a complete thumbnail workflow without becoming a long software walkthrough.",
    approach: "I used a staged screen-recording edit to demonstrate canvas setup, image placement, headline styling, branding, and final composition.",
    outcomeHeading: "A repeatable thumbnail workflow.",
    result: "The concise build-along makes every design decision visible and easy to repeat.",
    externalUrl: "https://www.dropbox.com/scl/fi/431bcw042ojmnck7pawzs/Module-9.3.mp4?rlkey=wsmfkjw55y5d88dfwzoic3g08&dl=0",
    externalPlatform: "Dropbox",
    externalAction: "Watch Video",
    featured: true,
    video: true,
  },
];

export const workCategories: readonly WorkCategory[] = [
  {
    id: "graphic-design",
    number: "01",
    title: "Graphic Design",
    description: "See how I turn ideas into campaign graphics, covers, and print pieces that communicate clearly.",
    previewImage: "/images/project-2.jpg",
    previewAlt: "Digital Marketing Mastery campaign graphics",
  },
  {
    id: "webinar-presentations",
    number: "02",
    title: "Webinar Presentations",
    description: "Explore slide systems designed to help speakers teach clearly and keep audiences engaged.",
    previewImage: "/images/project-3.jpg",
    previewAlt: "Wealth webinar presentation slides",
  },
  {
    id: "web-design",
    number: "03",
    title: "Web Design",
    description: "See how I organize content into responsive pages and interfaces with a clear next step.",
    previewImage: "/images/project-1.jpg",
    previewAlt: "AI Business Model landing page on several devices",
  },
  {
    id: "video-editing",
    number: "04",
    title: "Video Editing",
    description: "Watch how I turn screen recordings and raw ideas into focused, easy-to-follow edits.",
    previewImage: "/images/video-001.webp",
    previewAlt: "CapCut export settings tutorial title card",
  },
] as const;

const placeholderSlots: Record<WorkCategoryId, readonly ProjectSlot[]> = {
  "graphic-design": [],
  "webinar-presentations": [],
  "web-design": [],
  "video-editing": [],
};

export function projectExternalUrl(project: Project) {
  return project.externalUrl ?? project.behance;
}

export function projectExternalPlatform(project: Project) {
  return project.externalPlatform ?? (project.behance ? "Behance" : undefined);
}

export function projectActionLabel(project: Project) {
  return project.externalAction ?? "View Project";
}

export function workCategoryById(id: WorkCategoryId) {
  return workCategories.find((category) => category.id === id)!;
}

export function projectSlotsForCategory(id: WorkCategoryId): ProjectSlot[] {
  const projectSlots: ProjectSlot[] = projects
    .filter((project) => project.categoryId === id)
    .map((project) => ({ kind: "project", project }));
  return [...projectSlots, ...placeholderSlots[id]];
}

export function realProjectCount(id: WorkCategoryId) {
  return projects.filter((project) => project.categoryId === id).length;
}

export function projectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
