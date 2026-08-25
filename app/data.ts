export type Project = {
  slug: string;
  title: string;
  categoryId: WorkCategoryId;
  kicker: string;
  summary: string;
  image: string;
  imageAlt?: string;
  year: string;
  behance?: string;
  externalUrl?: string;
  externalPlatform?: string;
  externalAction?: string;
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
    slug: "heart-attack-youtube-thumbnail",
    title: "Heart Attack YouTube Thumbnail Design",
    categoryId: "graphic-design",
    kicker: "Thumbnail Design",
    summary: "A high-impact medical thumbnail that makes the topic immediately clear in a crowded video feed.",
    image: "/images/graphic/graphic-001.jpg",
    imageAlt: "Heart Attack YouTube thumbnail design preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226894523/Heart-Attack-YouTube-Thumbnail-Design",
  },
  {
    slug: "page-whisper-mobile-app",
    title: "Page Whisper Mobile App UI",
    categoryId: "graphic-design",
    kicker: "Mobile UI Design",
    summary: "A calm reading interface that guides users smoothly from book discovery into focused reading.",
    image: "/images/graphic/graphic-002.jpg",
    imageAlt: "Page Whisper mobile app interface preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226752305/Page-Whisper-Mobile-App-UI",
  },
  {
    slug: "digital-marketing-mastery-campaign",
    title: "Digital Marketing Mastery Webinar Campaign",
    categoryId: "graphic-design",
    kicker: "Campaign Design",
    summary: "A connected webinar and social media visual system built around a clear digital marketing message.",
    image: "/images/graphic/graphic-003.jpg",
    imageAlt: "Digital Marketing Mastery campaign design preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226541053/Digital-Marketing-Mastery-Webinar-Social-Media-Design",
  },
  {
    slug: "car-rental-brochure",
    title: "Car Rental Service Brochure",
    categoryId: "graphic-design",
    kicker: "Brochure Design",
    summary: "A polished brochure that keeps vehicle options, services, and booking details easy to scan.",
    image: "/images/graphic/graphic-004.jpg",
    imageAlt: "Car rental service brochure design preview",
    year: "2023",
    behance: "https://www.behance.net/gallery/176567239/Dynamic-Brochure-Design-for-Your-Car-Rental-Service",
  },
  {
    slug: "heart-health-book-cover",
    title: "Heart Health Book Cover",
    categoryId: "graphic-design",
    kicker: "Book Cover Design",
    summary: "A trustworthy health cover designed to remain clear across digital thumbnails and printed formats.",
    image: "/images/graphic/graphic-005.jpg",
    imageAlt: "Heart Health book cover design preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226851791/Heart-Health-Book-Cover-Template",
  },
  {
    slug: "scions-and-scavengers-book-cover",
    title: "Scions and Scavengers Book Cover",
    categoryId: "graphic-design",
    kicker: "Book Cover Design",
    summary: "A cinematic science-fiction cover that establishes the story's atmosphere at first glance.",
    image: "/images/graphic/graphic-006.jpg",
    imageAlt: "Scions and Scavengers book cover preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/233773537/Scions-and-Scavengers-Book-Cover",
  },
  {
    slug: "audiobook-mobile-app-ui",
    title: "Audiobook Mobile App UI",
    categoryId: "graphic-design",
    kicker: "Mobile UI Design",
    summary: "A streamlined audiobook interface that keeps discovery, playback, and listening progress intuitive.",
    image: "/images/graphic/graphic-007.jpg",
    imageAlt: "Audiobook mobile app interface preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226723313/Audiobook-Mobile-App-UI",
  },
  {
    slug: "tech-startup-online-course-banner",
    title: "Online Course Banner for Tech Startups",
    categoryId: "graphic-design",
    kicker: "Banner Design",
    summary: "A focused promotional banner that gives a technology course offer a clear visual hierarchy.",
    image: "/images/graphic/graphic-008.jpg",
    imageAlt: "Online course banner design for tech startups",
    year: "2024",
    behance: "https://www.behance.net/gallery/198891039/Online-Course-Banner-Design-for-Tech-Startups",
  },
  {
    slug: "beauty-pageant-tarpaulin",
    title: "Beauty Pageant Tarpaulin Design",
    categoryId: "graphic-design",
    kicker: "Event Design",
    summary: "A glamorous large-format event design that balances contestant imagery with essential pageant details.",
    image: "/images/graphic/graphic-009.jpg",
    imageAlt: "Glamorous beauty pageant tarpaulin design preview",
    year: "2023",
    behance: "https://www.behance.net/gallery/176567723/Tarpaulin-Design-for-a-Glamorous-Beauty-Pageant",
  },
  {
    slug: "printing-business-brochure",
    title: "Printing Business Brochure Design",
    categoryId: "graphic-design",
    kicker: "Brochure Design",
    summary: "A colorful service brochure that organizes printing options into a compact, persuasive format.",
    image: "/images/graphic/graphic-010.jpg",
    imageAlt: "Printing business brochure design preview",
    year: "2023",
    behance: "https://www.behance.net/gallery/176567481/Printing-Business-Captivating-Brochure-Design",
  },
  {
    slug: "custom-mug-design",
    title: "Custom Mug Design",
    categoryId: "graphic-design",
    kicker: "Product Design",
    summary: "A coordinated mug artwork collection designed for clear production and an appealing final presentation.",
    image: "/images/graphic/graphic-011.jpg",
    imageAlt: "Custom mug artwork and product mockup preview",
    year: "2024",
    behance: "https://www.behance.net/gallery/199199253/Custom-Mug-Design",
  },
  {
    slug: "mastering-your-money-webinar",
    title: "Mastering Your Money Webinar Template",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "An approachable webinar deck that turns financial decisions into a clear learning journey.",
    image: "/images/webinar/webinar-001.jpg",
    imageAlt: "Mastering Your Money webinar slide preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226745875/Mastering-Your-Money-Webinar-Template",
  },
  {
    slug: "mastering-digital-marketing-webinar",
    title: "Mastering Digital Marketing Webinar Template",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "A practical webinar template that gives a broad digital marketing topic a focused teaching flow.",
    image: "/images/webinar/webinar-002.jpg",
    imageAlt: "Mastering Digital Marketing webinar slide preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226721607/Mastering-Digital-Marketing-Webinar-Template",
  },
  {
    slug: "blue-theme-webinar-deck",
    title: "Blue Theme Webinar Google Slides Deck",
    categoryId: "webinar-presentations",
    kicker: "Google Slides Design",
    summary: "A flexible blue deck that keeps webinar content, speakers, and audience prompts easy to follow.",
    image: "/images/webinar/webinar-003.jpg",
    imageAlt: "Blue theme webinar Google Slides deck preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/238076371/Blue-Theme-Webinar-Google-Slides-Deck-Template",
  },
  {
    slug: "social-media-marketing-webinar",
    title: "Social Media Marketing Webinar Template",
    categoryId: "webinar-presentations",
    kicker: "Google Slides Design",
    summary: "An energetic webinar deck that makes social media marketing lessons clear and easy to present.",
    image: "/images/webinar/webinar-004.jpg",
    imageAlt: "Social Media Marketing webinar Google Slides preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/238031503/Social-Media-Marketing-Webinar-Google-Slides-Template",
  },
  {
    slug: "unlock-financial-freedom-webinar",
    title: "Unlock Financial Freedom Webinar Template",
    categoryId: "webinar-presentations",
    kicker: "Presentation Design",
    summary: "A structured financial webinar deck that gives lessons and audience discussions a clear order.",
    image: "/images/webinar/webinar-005.jpg",
    imageAlt: "Unlock Financial Freedom webinar slide preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226718265/Unlock-Financial-Freedom-Webinar-Template",
  },
  {
    slug: "wealth-webinar-presentation",
    title: "Wealth Google Slides Webinar Template",
    categoryId: "webinar-presentations",
    kicker: "Google Slides Design",
    summary: "A flexible slide system that guides audiences through financial lessons, examples, and activities.",
    image: "/images/webinar/webinar-006.jpg",
    imageAlt: "Wealth Google Slides webinar template preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226690009/Wealth-Google-Slides-Webinar-Template",
  },
  {
    slug: "same-day-garage-door-service",
    title: "Same Day Garage Door Service Website",
    categoryId: "web-design",
    kicker: "Service Website",
    summary: "A conversion-focused service website that makes urgent garage door help easy to understand and request.",
    image: "/images/web/web-001.jpg",
    imageAlt: "Same Day Garage Door Service website preview",
    year: "2026",
    behance: "https://www.behance.net/gallery/254569739/Same-Day-Garage-Door-Service-Website",
  },
  {
    slug: "foldcharge-responsive-landing-page",
    title: "FoldCharge Responsive Product Landing Page",
    categoryId: "web-design",
    kicker: "Product Landing Page",
    summary: "A responsive technology product page that explains FoldCharge through benefits, visuals, and clear actions.",
    image: "/images/web/web-002.jpg",
    imageAlt: "FoldCharge responsive product landing page preview",
    year: "2026",
    behance: "https://www.behance.net/gallery/254568891/FoldCharge-Responsive-Tech-Product-Landing-Page",
  },
  {
    slug: "ai-productivity-course-bundle",
    title: "AI Productivity Course Bundle Sales Page",
    categoryId: "web-design",
    kicker: "Sales Page Design",
    summary: "A structured course bundle page that turns a broad AI productivity offer into an easy buying journey.",
    image: "/images/web/web-003.jpg",
    imageAlt: "AI Productivity Course Bundle sales landing page preview",
    year: "2026",
    behance: "https://www.behance.net/gallery/254459643/AI-Productivity-Course-Bundle-Sales-Landing-Page",
  },
  {
    slug: "sidehustlex-ai-automation-sales-page",
    title: "SideHustleX AI Automation Sales Page",
    categoryId: "web-design",
    kicker: "Sales Page Design",
    summary: "A long-form sales page that presents an AI automation offer with clear benefits and decision points.",
    image: "/images/web/web-004.jpg",
    imageAlt: "SideHustleX AI Automation sales landing page preview",
    year: "2026",
    behance: "https://www.behance.net/gallery/254460105/SideHustleX-AI-Automation-Sales-Landing-Page",
  },
  {
    slug: "ai-image-mastery-sales-page",
    title: "AI Image Mastery Course Sales Page",
    categoryId: "web-design",
    kicker: "Sales Page Design",
    summary: "A creative course page that combines vivid imagery with a direct path through the offer.",
    image: "/images/web/web-005.jpg",
    imageAlt: "AI Image Mastery creative course sales page preview",
    year: "2026",
    behance: "https://www.behance.net/gallery/254460367/AI-Image-Mastery-Creative-Course-Sales-Landing-Page",
  },
  {
    slug: "ai-business-model-landing-page",
    title: "AI Business Model Landing Page",
    categoryId: "web-design",
    kicker: "Landing Page Design",
    summary: "A clear sales page that turns a detailed AI business offer into an easy path from interest to action.",
    image: "/images/web/web-006.jpg",
    imageAlt: "AI Business Model landing page shown across devices",
    year: "2025",
    behance: "https://www.behance.net/gallery/238027647/AI-Business-Model-Landing-Page-Website-Design",
  },
  {
    slug: "smart-watch-affiliate-landing-page",
    title: "Smart Watch Affiliate Landing Page",
    categoryId: "web-design",
    kicker: "Affiliate Landing Page",
    summary: "A product-focused affiliate page that presents smartwatch features through clear sections and visual proof.",
    image: "/images/web/web-007.jpg",
    imageAlt: "Smart watch affiliate product landing page preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/238318625/Affiliate-Landing-Page-Smart-Watch-Product-Website",
  },
  {
    slug: "neurorewire-protocol-sales-page",
    title: "NeuroRewire Protocol Sales Page",
    categoryId: "web-design",
    kicker: "Sales Page Design",
    summary: "A mindset training sales page that organizes the method, benefits, and offer into a focused narrative.",
    image: "/images/web/web-008.jpg",
    imageAlt: "NeuroRewire Protocol mindset training sales page preview",
    year: "2026",
    behance: "https://www.behance.net/gallery/254519361/NeuroRewire-Protocol-Mindset-Training-Sales-Page",
  },
  {
    slug: "health-wellness-web-design",
    title: "Health and Wellness Web Design",
    categoryId: "web-design",
    kicker: "Website Design",
    summary: "A welcoming wellness website that balances trustworthy information with an approachable visual tone.",
    image: "/images/web/web-009.jpg",
    imageAlt: "Health and wellness website design preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226853711/Health-and-Wellness-Web-Design",
  },
  {
    slug: "smart-income-streams-ai-sales-page",
    title: "Smart Income Streams with AI Sales Page",
    categoryId: "web-design",
    kicker: "Long-Form Sales Page",
    summary: "A responsive long-form page that keeps a detailed AI income offer easy to scan from start to action.",
    image: "/images/web/web-010.jpg",
    imageAlt: "Smart Income Streams with AI long-form sales page preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/238320549/Smart-Income-Streams-with-AI-Long-Form-Sales-Page",
  },
  {
    slug: "photography-course-landing-page",
    title: "Photography Course Landing Page",
    categoryId: "web-design",
    kicker: "Course Landing Page",
    summary: "A visual course page that pairs strong photography with a clear explanation of the learning offer.",
    image: "/images/web/web-011.jpg",
    imageAlt: "Photography course landing page website preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/238032123/Photography-Course-Landing-Page-Website-Design",
  },
  {
    slug: "room-for-rent-website-ui",
    title: "Room for Rent Website UI",
    categoryId: "web-design",
    kicker: "Website UI Design",
    summary: "A practical rental interface that helps visitors browse rooms and understand property details quickly.",
    image: "/images/web/web-012.jpg",
    imageAlt: "Room for Rent website interface preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226744299/Room-for-Rent-Website-UI",
  },
  {
    slug: "digital-marketing-mastery-landing-page",
    title: "Digital Marketing Mastery Landing Page",
    categoryId: "web-design",
    kicker: "Landing Page Design",
    summary: "A responsive marketing course page that leads with outcomes and keeps the enrollment path visible.",
    image: "/images/web/web-013.jpg",
    imageAlt: "Digital Marketing Mastery landing page preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/238029645/Digital-Marketing-Mastery-Landing-Page-Website-Design",
  },
  {
    slug: "web-design-mastery-landing-page",
    title: "Web Design Mastery Landing Page",
    categoryId: "web-design",
    kicker: "Landing Page Design",
    summary: "A course landing page template that turns a detailed web design program into clear, scannable sections.",
    image: "/images/web/web-014.jpg",
    imageAlt: "Web Design Mastery landing page template preview",
    year: "2025",
    behance: "https://www.behance.net/gallery/226893301/Web-Design-Mastery-Landing-Page-Template",
  },
  {
    slug: "capcut-export-settings",
    title: "CapCut Export Settings for Crisp Video",
    categoryId: "video-editing",
    kicker: "Video Editing",
    summary: "A concise CapCut tutorial that turns technical export settings into a practical checklist for crisp video.",
    image: "/images/video/video-001.webp",
    imageAlt: "CapCut tutorial title card about export settings that keep video crisp",
    year: "2026",
    externalUrl: "https://www.dropbox.com/scl/fi/zwuvh531mcnep968p83qf/Module-9.1.mp4?rlkey=jlmao5nu6ve4ig41rs61p0jr4&dl=0",
    externalPlatform: "Dropbox",
    externalAction: "Watch Video",
    video: true,
  },
  {
    slug: "watermark-free-capcut-exports",
    title: "Watermark-Free CapCut Exports",
    categoryId: "video-editing",
    kicker: "Video Editing",
    summary: "A step-by-step CapCut tutorial that helps creators avoid watermarks while protecting video quality.",
    image: "/images/video/video-002.webp",
    imageAlt: "CapCut tutorial title card about removing watermarks without losing video quality",
    year: "2026",
    externalUrl: "https://www.dropbox.com/scl/fi/r2zqv70yj2owfvkym04ad/Module-9.2.mp4?rlkey=lrdzkymohlmhp2gntwm6shk0i&dl=0",
    externalPlatform: "Dropbox",
    externalAction: "Watch Video",
    video: true,
  },
  {
    slug: "capcut-covers-and-thumbnails",
    title: "CapCut Covers and Thumbnails",
    categoryId: "video-editing",
    kicker: "Video Editing",
    summary: "A focused CapCut build-along for designing clear, attention-grabbing covers and thumbnails.",
    image: "/images/video/video-003.webp",
    imageAlt: "CapCut tutorial title card about creating covers and thumbnails",
    year: "2026",
    externalUrl: "https://www.dropbox.com/scl/fi/431bcw042ojmnck7pawzs/Module-9.3.mp4?rlkey=wsmfkjw55y5d88dfwzoic3g08&dl=0",
    externalPlatform: "Dropbox",
    externalAction: "Watch Video",
    video: true,
  },
];

export const workCategories: readonly WorkCategory[] = [
  { id: "graphic-design", number: "01", title: "Graphic Design", description: "See how I turn ideas into campaign graphics, covers, and print pieces that communicate clearly.", previewImage: "/images/graphic/graphic-001.jpg", previewAlt: "Heart Attack YouTube thumbnail design" },
  { id: "web-design", number: "02", title: "Web Design", description: "See how I organize content into responsive pages and interfaces with a clear next step.", previewImage: "/images/web/web-001.jpg", previewAlt: "Same Day Garage Door Service website" },
  { id: "webinar-presentations", number: "03", title: "Webinar Presentations", description: "Explore slide systems designed to help speakers teach clearly and keep audiences engaged.", previewImage: "/images/webinar/webinar-001.jpg", previewAlt: "Mastering Your Money webinar presentation slides" },
  { id: "video-editing", number: "04", title: "Video Editing", description: "Watch how I turn screen recordings and raw ideas into focused, easy-to-follow edits.", previewImage: "/images/video/video-001.webp", previewAlt: "CapCut export settings tutorial title card" },
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
