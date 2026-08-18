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
    summary: "A responsive sales page that turns a detailed AI business offer into a clear path from interest to action.",
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
    slug: "smart-income-streams-ai-sales-page",
    title: "Smart Income Streams with AI Sales Page",
    categoryId: "web-design",
    kicker: "Web Design",
    summary: "A responsive long-form sales page that organizes a detailed AI income offer into a clear path from benefits to action.",
    image: "/images/web-001.jpg",
    imageAlt: "Smart Income Streams with AI sales page shown on desktop, laptop, tablet, and mobile screens",
    accent: "gold",
    client: "ProfitWithAI.com",
    year: "2025",
    role: "Web & graphic designer",
    tools: "WordPress, Adobe Photoshop",
    deliverables: "Long-form sales page, responsive layouts, visual assets",
    challenge: "Organize a long-form AI income offer without overwhelming visitors or losing the main call to action.",
    approach: "I divided the page into focused benefit sections, used responsive product visuals to explain the offer, and repeated calls to action at natural decision points.",
    outcomeHeading: "A detailed offer that stays easy to follow.",
    result: "A responsive sales page that keeps a detailed offer easy to scan across desktop, tablet, and mobile screens.",
    behance: "https://www.behance.net/gallery/238320549/Smart-Income-Streams-with-AI-Long-Form-Sales-Page",
    featured: true,
  },
  {
    slug: "digital-marketing-campaign",
    title: "Digital Marketing Mastery Campaign",
    categoryId: "graphic-design",
    kicker: "Graphic Design",
    summary: "A bold webinar campaign system that keeps digital marketing topics clear across presentation and social media assets.",
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
    slug: "wealth-webinar-presentation",
    title: "Wealth Webinar Slide System",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "A flexible Google Slides system that organizes financial lessons, speaker content, and audience activities for live delivery.",
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
    slug: "mastering-your-money-webinar",
    title: "Mastering Your Money Webinar",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "A bright webinar slide system that turns financial decision-making into clear, approachable lessons and activities.",
    image: "/images/webinar-001.jpg",
    accent: "orange",
    client: "Financial education webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Webinar deck, slide template, visual assets",
    challenge: "Make personal finance lessons feel practical and welcoming without losing the structure needed for live teaching.",
    approach: "I combined bold orange and red accents with clear lesson layouts, speaker sections, prompts, and visual examples to guide the audience through each topic.",
    outcomeHeading: "Financial lessons made easier to follow.",
    result: "A reusable webinar template that keeps educational content organized while giving each section a clear visual purpose.",
    behance: "https://www.behance.net/gallery/226745875/Mastering-Your-Money-Webinar-Template",
    featured: true,
  },
  {
    slug: "mastering-digital-marketing-webinar",
    title: "Mastering Digital Marketing Webinar",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "A practical webinar template that organizes digital marketing strategies, examples, and offers into a consistent teaching flow.",
    image: "/images/webinar-002.jpg",
    accent: "green",
    client: "Digital marketing webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Webinar deck, slide template, promotional layouts",
    challenge: "Present a broad marketing topic without making the deck feel crowded or repetitive during a live session.",
    approach: "I used a focused green palette, repeatable content blocks, step-by-step diagrams, proof slides, and offer layouts to keep the information easy to scan.",
    outcomeHeading: "A clear system for teaching digital marketing.",
    result: "A flexible slide template that supports lessons, examples, statistics, and promotional content within one consistent system.",
    behance: "https://www.behance.net/gallery/226721607/Mastering-Digital-Marketing-Webinar-Template",
    featured: true,
  },
  {
    slug: "blue-theme-webinar-deck",
    title: "Blue Theme Webinar Deck",
    categoryId: "webinar-presentations",
    kicker: "Google Slides Design",
    summary: "A clean blue presentation system built to keep webinar content, speakers, and audience prompts easy to follow.",
    image: "/images/webinar-003.jpg",
    accent: "cyan",
    client: "Webinar presentation template",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Google Slides deck, reusable layouts, visual assets",
    challenge: "Create a versatile deck that can support different webinar topics while maintaining a recognizable visual structure.",
    approach: "I paired a calm blue palette with bold title areas, framed photography, modular content layouts, and consistent speaker and discussion slides.",
    outcomeHeading: "A versatile deck for different webinar topics.",
    result: "A reusable Google Slides system that keeps presentations structured, readable, and visually consistent from start to finish.",
    behance: "https://www.behance.net/gallery/238076371/Blue-Theme-Webinar-Google-Slides-Deck-Template",
    featured: true,
  },
  {
    slug: "social-media-marketing-webinar",
    title: "Social Media Marketing Webinar",
    categoryId: "webinar-presentations",
    kicker: "Google Slides Design",
    summary: "An energetic webinar deck that makes social media marketing lessons, prompts, and examples quick to understand.",
    image: "/images/webinar-004.jpg",
    accent: "coral",
    client: "Social media marketing webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Webinar deck, slide template, illustration layouts",
    challenge: "Keep a fast-moving marketing topic engaging while giving the presenter enough structure for clear live delivery.",
    approach: "I used strong red accents, friendly 3D illustrations, clear section markers, and repeatable lesson layouts to maintain pace and hierarchy.",
    outcomeHeading: "A lively deck with a clear teaching rhythm.",
    result: "A presentation system that balances visual energy with practical layouts for lessons, discussions, warnings, and action steps.",
    behance: "https://www.behance.net/gallery/238031503/Social-Media-Marketing-Webinar-Google-Slides-Template",
    featured: true,
  },
  {
    slug: "unlock-financial-freedom-webinar",
    title: "Unlock Financial Freedom Webinar",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "A focused financial webinar template that organizes income-building lessons, speaker content, and audience discussions.",
    image: "/images/webinar-005.jpg",
    accent: "navy",
    client: "Financial education webinar",
    year: "2025",
    role: "Presentation designer",
    tools: "Google Slides, Adobe Photoshop",
    deliverables: "Webinar deck, slide template, visual assets",
    challenge: "Turn a detailed financial topic into a presentation that feels credible, direct, and manageable for a live audience.",
    approach: "I used charcoal surfaces, teal accents, direct headlines, structured speaker layouts, and clear caution slides to organize the material.",
    outcomeHeading: "A focused structure for financial education.",
    result: "A reusable webinar deck that gives complex financial content a clear order and a professional visual tone.",
    behance: "https://www.behance.net/gallery/226718265/Unlock-Financial-Freedom-Webinar-Template",
    featured: true,
  },
  {
    slug: "page-whisper-mobile-app",
    title: "Page Whisper Reading App",
    categoryId: "web-design",
    kicker: "UI/UX Design",
    summary: "A focused mobile reading experience that makes discovering, saving, and reading books simple.",
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
    featured: true,
  },
  {
    slug: "heart-health-book-cover",
    title: "Heart Health Made Simple",
    categoryId: "graphic-design",
    kicker: "Book Cover Design",
    summary: "An approachable health book cover designed to stay clear and trustworthy at thumbnail and print size.",
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
    title: "Moonlight Car Rental Brochure",
    categoryId: "graphic-design",
    kicker: "Print Design",
    summary: "A practical brochure system that makes rental options, service details, and booking information easy to scan.",
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
    featured: true,
  },
  {
    slug: "capcut-export-settings",
    title: "CapCut Export Settings for Crisp Video",
    categoryId: "video-editing",
    kicker: "Video Editing",
    summary: "A clear tutorial edit that explains aspect ratio, resolution, bit rate, frame rate, and high-quality export settings in CapCut.",
    image: "/images/video-001.webp",
    imageAlt: "CapCut tutorial title card about export settings that keep video crisp",
    accent: "gold",
    client: "Creator education",
    year: "2026",
    role: "Video Editor",
    tools: "CapCut",
    deliverables: "Tutorial video, screen-recording edit, motion typography",
    challenge: "Turn several technical export choices into a short lesson that is easy to follow.",
    approach: "I combined screen recordings, bold text-led sections, and practical comparisons for aspect ratio, resolution, bit rate, codec, format, and frame rate.",
    outcomeHeading: "Export settings made easier to understand.",
    result: "A focused tutorial that moves from setup checks to a practical export checklist in under three minutes.",
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
    summary: "A step-by-step tutorial on avoiding Pro-asset watermarks, protecting video quality, and choosing clean export settings in CapCut.",
    image: "/images/video-002.webp",
    imageAlt: "CapCut tutorial title card about removing watermarks without losing video quality",
    accent: "gold",
    client: "Creator education",
    year: "2026",
    role: "Video Editor",
    tools: "CapCut",
    deliverables: "Tutorial video, screen-recording edit, motion typography",
    challenge: "Explain why watermarks appear without confusing Pro assets with export-quality settings.",
    approach: "I separated the lesson into asset checks, free-versus-Pro options, and a final quality checklist supported by screen recordings and concise motion graphics.",
    outcomeHeading: "A clearer route to watermark-free exports.",
    result: "A short tutorial that helps viewers avoid watermark triggers while keeping their final video quality intact.",
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
    summary: "A practical tutorial edit that shows how to build clear, scroll-stopping covers and thumbnails inside CapCut.",
    image: "/images/video-003.webp",
    imageAlt: "CapCut tutorial title card about creating covers and thumbnails that stop the scroll",
    accent: "gold",
    client: "Creator education",
    year: "2026",
    role: "Video Editor",
    tools: "CapCut",
    deliverables: "Tutorial video, screen-recording edit, motion typography",
    challenge: "Show a complete thumbnail workflow without turning the lesson into a long software walkthrough.",
    approach: "I used a staged screen-recording edit to demonstrate canvas setup, image placement, headline styling, branding, and final composition.",
    outcomeHeading: "A thumbnail workflow from blank canvas to final cover.",
    result: "A concise build-along tutorial that makes each design decision visible and easy to repeat.",
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
    description: "Campaigns, covers, and print pieces built to communicate clearly.",
    previewImage: "/images/project-2.jpg",
    previewAlt: "Digital Marketing Mastery campaign graphics",
  },
  {
    id: "webinar-presentations",
    number: "02",
    title: "Webinar Presentations",
    description: "Slide systems designed for structured, confident live delivery.",
    previewImage: "/images/project-3.jpg",
    previewAlt: "Wealth webinar presentation slides",
  },
  {
    id: "web-design",
    number: "03",
    title: "Web Design",
    description: "Responsive pages and interfaces that keep the next step clear.",
    previewImage: "/images/project-1.jpg",
    previewAlt: "AI Business Model landing page on several devices",
  },
  {
    id: "video-editing",
    number: "04",
    title: "Video Editing",
    description: "Tutorial edits and digital video content built around clear pacing and visual instruction.",
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
