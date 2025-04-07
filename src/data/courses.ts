
export interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  languages: string[];
  duration: string;
  isOfflineAvailable: boolean;
  modules: CourseModule[];
  instructor: string;
  enrolledCount: number;
}

export interface CourseModule {
  id: number;
  title: string;
  duration: string;
  type: "video" | "text" | "quiz" | "interactive";
  isCompleted?: boolean;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Basic Literacy and Numeracy",
    description: "Learn foundational reading, writing, and math skills at your own pace with practical, everyday examples.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1409&q=80",
    category: "Basic Education",
    languages: ["English", "Spanish", "Hindi"],
    duration: "10 weeks",
    isOfflineAvailable: true,
    instructor: "Sarah Johnson",
    enrolledCount: 1240,
    modules: [
      { id: 1, title: "Introduction to Reading", duration: "45 min", type: "video" },
      { id: 2, title: "Basic Vocabulary", duration: "1 hr", type: "interactive" },
      { id: 3, title: "Simple Sentences", duration: "1.5 hrs", type: "text" },
      { id: 4, title: "Reading Comprehension", duration: "1 hr", type: "quiz" },
      { id: 5, title: "Introduction to Numbers", duration: "45 min", type: "video" },
    ]
  },
  {
    id: 2,
    title: "Introduction to Digital Skills",
    description: "Learn the basics of using computers, smartphones, and the internet safely and effectively.",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80",
    category: "Digital Skills",
    languages: ["English", "French", "Swahili"],
    duration: "4 weeks",
    isOfflineAvailable: true,
    instructor: "Michael Chen",
    enrolledCount: 890,
    modules: [
      { id: 1, title: "Understanding Devices", duration: "30 min", type: "video" },
      { id: 2, title: "Navigating Operating Systems", duration: "1 hr", type: "interactive" },
      { id: 3, title: "Internet Basics", duration: "45 min", type: "video" },
      { id: 4, title: "Email Essentials", duration: "1 hr", type: "interactive" },
      { id: 5, title: "Online Safety", duration: "1 hr", type: "quiz" },
    ]
  },
  {
    id: 3,
    title: "Sustainable Agriculture Practices",
    description: "Learn environmentally friendly farming techniques that increase yield while preserving resources.",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Agriculture",
    languages: ["English", "Swahili", "Hindi"],
    duration: "8 weeks",
    isOfflineAvailable: true,
    instructor: "Amara Okafor",
    enrolledCount: 756,
    modules: [
      { id: 1, title: "Introduction to Sustainability", duration: "45 min", type: "video" },
      { id: 2, title: "Soil Health Management", duration: "1.5 hrs", type: "text" },
      { id: 3, title: "Water Conservation", duration: "1 hr", type: "interactive" },
      { id: 4, title: "Natural Pest Control", duration: "1 hr", type: "video" },
      { id: 5, title: "Crop Rotation Techniques", duration: "1 hr", type: "quiz" },
    ]
  },
  {
    id: 4,
    title: "Community Health Worker Training",
    description: "Essential skills for community health workers to provide basic healthcare education and services.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Health",
    languages: ["English", "Spanish", "French"],
    duration: "12 weeks",
    isOfflineAvailable: true,
    instructor: "Dr. Elena Rodriguez",
    enrolledCount: 1120,
    modules: [
      { id: 1, title: "Role of a Community Health Worker", duration: "1 hr", type: "video" },
      { id: 2, title: "Basic First Aid", duration: "2 hrs", type: "interactive" },
      { id: 3, title: "Maternal and Child Health", duration: "1.5 hrs", type: "video" },
      { id: 4, title: "Common Illnesses Prevention", duration: "1 hr", type: "text" },
      { id: 5, title: "Health Education Techniques", duration: "1 hr", type: "quiz" },
    ]
  },
  {
    id: 5,
    title: "Small Business Fundamentals",
    description: "Start and grow a small business with limited resources through practical entrepreneurship skills.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    category: "Entrepreneurship",
    languages: ["English", "Spanish", "Hindi"],
    duration: "6 weeks",
    isOfflineAvailable: false,
    instructor: "Carlos Mendoza",
    enrolledCount: 945,
    modules: [
      { id: 1, title: "Identifying Business Opportunities", duration: "45 min", type: "video" },
      { id: 2, title: "Business Planning Basics", duration: "1 hr", type: "interactive" },
      { id: 3, title: "Simple Bookkeeping", duration: "1.5 hrs", type: "interactive" },
      { id: 4, title: "Marketing On a Budget", duration: "1 hr", type: "video" },
      { id: 5, title: "Growing Your Business", duration: "1 hr", type: "quiz" },
    ]
  },
  {
    id: 6,
    title: "Water Sanitation and Hygiene",
    description: "Learn practical skills for clean water management and basic hygiene practices for healthier communities.",
    imageUrl: "https://images.unsplash.com/photo-1543393379-62a52fd2d078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "Health",
    languages: ["English", "Swahili", "French"],
    duration: "4 weeks",
    isOfflineAvailable: true,
    instructor: "Jane Mutua",
    enrolledCount: 802,
    modules: [
      { id: 1, title: "Clean Water Basics", duration: "45 min", type: "video" },
      { id: 2, title: "Water Treatment Methods", duration: "1 hr", type: "interactive" },
      { id: 3, title: "Sanitation Infrastructure", duration: "1 hr", type: "text" },
      { id: 4, title: "Hand Hygiene", duration: "30 min", type: "video" },
      { id: 5, title: "Community Practice Implementation", duration: "1 hr", type: "quiz" },
    ]
  },
];

export const categories = [
  "Basic Education",
  "Digital Skills",
  "Health",
  "Agriculture", 
  "Entrepreneurship",
];

export const languages = [
  "English",
  "Spanish",
  "French",
  "Swahili",
  "Hindi",
];
