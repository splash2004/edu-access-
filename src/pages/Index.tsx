
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Book, Users, PenTool, LucideIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Course, courses, categories } from "@/data/courses";

const featureItems = [
  {
    icon: Book,
    title: "Free Courses",
    description: "Access quality education at no cost across various subjects",
  },
  {
    icon: Users,
    title: "Multiple Languages",
    description: "Learn in your preferred language with localized content",
  },
  {
    icon: PenTool,
    title: "Offline Access",
    description: "Download courses to learn without internet connection",
  },
];

const FeatureItem = ({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) => (
  <div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-sm">
    <div className="p-3 bg-edu-purple bg-opacity-10 rounded-full mb-4">
      <Icon className="h-6 w-6 text-edu-purple" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [viewMode, setViewMode] = useState("all");
  
  const filteredCourses = courses.filter(course => {
    // Filter by search term
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    
    // Filter by offline availability
    const matchesMode = viewMode === "all" ? true : viewMode === "offline" ? course.isOfflineAvailable : !course.isOfflineAvailable;
    
    return matchesSearch && matchesCategory && matchesMode;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-section py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
                Education for Everyone, <span className="text-edu-purple">Everywhere</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Free courses in local languages with offline access. Breaking barriers to education.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
                <Link to="/courses">
                  <Button className="bg-edu-purple hover:bg-edu-purple/90 w-full md:w-auto">
                    Browse Courses
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button variant="outline" className="w-full md:w-auto">
                    How It Works
                  </Button>
                </Link>
              </div>
              <div className="relative max-w-xl mx-auto">
                <Input 
                  type="search" 
                  placeholder="Search for courses..."
                  className="pl-10 pr-4 py-6"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How We Make Education Accessible</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featureItems.map((item, index) => (
                <FeatureItem key={index} {...item} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Course Catalog */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Courses</h2>
                <p className="text-gray-600">Start learning with our popular courses</p>
              </div>
              <Link to="/courses">
                <Button variant="link" className="text-edu-purple p-0 mt-2 md:mt-0">
                  View All Courses
                </Button>
              </Link>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-grow relative">
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={undefined}>All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Tabs defaultValue="all" value={viewMode} onValueChange={setViewMode} className="w-full md:w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All Courses</TabsTrigger>
                    <TabsTrigger value="offline">Offline Available</TabsTrigger>
                    <TabsTrigger value="online">Online Only</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No courses found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(undefined);
                    setViewMode("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Community Section */}
        <section className="py-16 bg-edu-purple bg-opacity-5">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Learning Community</h2>
                <p className="text-gray-600 mb-6">
                  Connect with fellow learners, share experiences, and support each other on your educational journey. Our community helps bridge knowledge gaps and creates opportunities for collaboration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/community">
                    <Button className="bg-edu-purple hover:bg-edu-purple/90 w-full sm:w-auto">
                      Join Community
                    </Button>
                  </Link>
                  <Link to="/volunteer">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Become a Volunteer
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" 
                  alt="Learning Community" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Download App CTA */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="bg-gray-100 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Take Your Learning Offline</h2>
                  <p className="text-gray-600 mb-6">
                    Download our mobile app to access courses even without internet connection. Learn at your own pace, anywhere, anytime.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-black hover:bg-black/90 text-white">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 12L12 22M22 12H2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      App Store
                    </Button>
                    <Button className="bg-black hover:bg-black/90 text-white">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 3L19 12L5 21V3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Google Play
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-gray-300 h-60 md:h-80 rounded-xl flex items-center justify-center">
                    <span className="text-gray-600">App Screenshot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
