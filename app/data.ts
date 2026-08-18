export type Project = {
  slug: string;
  title: string;
  categoryId: WorkCategoryId;
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
    description: "Editing work for short-form, promotional, and digital content.",
  },
] as const;

const placeholderSlots: Record<WorkCategoryId, readonly ProjectSlot[]> = {
  "graphic-design": [],
  "webinar-presentations": [
    { kind: "placeholder", id: "webinar-presentation-02", title: "Webinar Presentation", summary: "Project coming soon." },
    { kind: "placeholder", id: "webinar-presentation-03", title: "Webinar Presentation", summary: "Project coming soon." },
  ],
  "web-design": [
    { kind: "placeholder", id: "web-design-03", title: "Web Design Project", summary: "Project coming soon." },
  ],
  "video-editing": [
    { kind: "placeholder", id: "video-editing-01", title: "Video Editing Project", summary: "Project coming soon." },
    { kind: "placeholder", id: "video-editing-02", title: "Video Editing Project", summary: "Project coming soon." },
    { kind: "placeholder", id: "video-editing-03", title: "Video Editing Project", summary: "Project coming soon." },
  ],
};

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
