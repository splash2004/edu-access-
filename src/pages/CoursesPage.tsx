
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, BookOpen, ArrowUpDown, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Course, courses, categories, languages } from "@/data/courses";

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [showOfflineOnly, setShowOfflineOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"popular" | "newest">("popular");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  
  useEffect(() => {
    let result = courses.filter((course) => {
      // Search term filter
      const matchesSearchTerm =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);

      // Language filter
      const matchesLanguage =
        selectedLanguages.length === 0 ||
        course.languages.some(lang => selectedLanguages.includes(lang));

      // Offline availability filter
      const matchesOffline = showOfflineOnly ? course.isOfflineAvailable : true;

      return matchesSearchTerm && matchesCategory && matchesLanguage && matchesOffline;
    });

    // Sort courses
    if (sortBy === "popular") {
      result = result.sort((a, b) => b.enrolledCount - a.enrolledCount);
    } else {
      result = result.sort((a, b) => b.id - a.id); // Assuming newer courses have higher IDs
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedCategories, selectedLanguages, showOfflineOnly, sortBy]);

  const toggleCategoryFilter = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleLanguageFilter = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLanguages([]);
    setShowOfflineOnly(false);
    setSearchTerm("");
  };

  const hasActiveFilters = selectedCategories.length > 0 || 
    selectedLanguages.length > 0 || 
    showOfflineOnly || 
    searchTerm.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-gradient-to-b from-edu-purple/10 to-white py-8">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Courses</h1>
              <p className="text-gray-600">
                Discover free, high-quality courses designed for accessibility and offline learning.
              </p>
            </div>
          </div>
        </div>
        
        {/* Course Catalog Section */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar on larger screens */}
              <div className="hidden lg:block w-64 shrink-0">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-xl">Filters</CardTitle>
                  </CardHeader>
                  <div className="px-6 pb-6">
                    {/* Categories */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`justify-start px-2 w-full ${
                                selectedCategories.includes(category) ? "bg-edu-purple/10 text-edu-purple" : ""
                              }`}
                              onClick={() => toggleCategoryFilter(category)}
                            >
                              {selectedCategories.includes(category) ? (
                                <Check className="h-4 w-4 mr-2" />
                              ) : (
                                <div className="w-4 mr-2" />
                              )}
                              {category}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Languages */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Languages</h3>
                      <div className="space-y-2">
                        {languages.map((language) => (
                          <div key={language} className="flex items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`justify-start px-2 w-full ${
                                selectedLanguages.includes(language) ? "bg-edu-purple/10 text-edu-purple" : ""
                              }`}
                              onClick={() => toggleLanguageFilter(language)}
                            >
                              {selectedLanguages.includes(language) ? (
                                <Check className="h-4 w-4 mr-2" />
                              ) : (
                                <div className="w-4 mr-2" />
                              )}
                              {language}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Offline Availability */}
                    <div className="mb-6">
                      <Button
                        variant={showOfflineOnly ? "default" : "outline"}
                        size="sm"
                        className={`w-full justify-start ${
                          showOfflineOnly ? "bg-edu-orange hover:bg-edu-orange/90" : ""
                        }`}
                        onClick={() => setShowOfflineOnly(!showOfflineOnly)}
                      >
                        {showOfflineOnly ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <div className="w-4 mr-2" />
                        )}
                        Offline Available Only
                      </Button>
                    </div>
                    
                    {/* Clear Filters */}
                    {hasActiveFilters && (
                      <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="flex-grow">
                {/* Search and Filter Bar */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                      <Input
                        type="search"
                        placeholder="Search courses..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {/* Mobile filter button */}
                      <Button 
                        variant="outline"
                        className="lg:hidden"
                        onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                        {hasActiveFilters && (
                          <Badge variant="secondary" className="ml-2">
                            {selectedCategories.length + selectedLanguages.length + (showOfflineOnly ? 1 : 0)}
                          </Badge>
                        )}
                      </Button>
                      
                      {/* Sort dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <ArrowUpDown className="h-4 w-4 mr-2" />
                            Sort by: {sortBy === "popular" ? "Popular" : "Newest"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem
                            checked={sortBy === "popular"}
                            onCheckedChange={() => setSortBy("popular")}
                          >
                            Most Popular
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={sortBy === "newest"}
                            onCheckedChange={() => setSortBy("newest")}
                          >
                            Newest First
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {/* Active filters display */}
                  {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedCategories.map((category) => (
                        <Badge key={category} variant="secondary" className="flex items-center gap-1">
                          {category}
                          <button onClick={() => toggleCategoryFilter(category)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {selectedLanguages.map((language) => (
                        <Badge key={language} variant="secondary" className="flex items-center gap-1">
                          {language}
                          <button onClick={() => toggleLanguageFilter(language)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {showOfflineOnly && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Offline Available
                          <button onClick={() => setShowOfflineOnly(false)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {searchTerm && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Search: {searchTerm}
                          <button onClick={() => setSearchTerm("")}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Clear all
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Mobile filters (only visible when isFilterMenuOpen is true) */}
                {isFilterMenuOpen && (
                  <div className="lg:hidden mb-8 bg-white rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Filters</h3>
                      <Button variant="ghost" size="sm" onClick={() => setIsFilterMenuOpen(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Categories */}
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategories.includes(category) ? "default" : "outline"}
                            size="sm"
                            className={selectedCategories.includes(category) ? "bg-edu-purple hover:bg-edu-purple/90" : ""}
                            onClick={() => toggleCategoryFilter(category)}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Languages */}
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {languages.map((language) => (
                          <Button
                            key={language}
                            variant={selectedLanguages.includes(language) ? "default" : "outline"}
                            size="sm"
                            className={selectedLanguages.includes(language) ? "bg-edu-purple hover:bg-edu-purple/90" : ""}
                            onClick={() => toggleLanguageFilter(language)}
                          >
                            {language}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Offline Availability */}
                    <div className="mb-4">
                      <Button
                        variant={showOfflineOnly ? "default" : "outline"}
                        size="sm"
                        className={`w-full justify-start ${
                          showOfflineOnly ? "bg-edu-orange hover:bg-edu-orange/90" : ""
                        }`}
                        onClick={() => setShowOfflineOnly(!showOfflineOnly)}
                      >
                        {showOfflineOnly ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <div className="w-4 mr-2" />
                        )}
                        Offline Available Only
                      </Button>
                    </div>
                    
                    {/* Apply / Clear Filters */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={clearFilters}>
                        Clear All
                      </Button>
                      <Button 
                        className="flex-1 bg-edu-purple hover:bg-edu-purple/90" 
                        size="sm"
                        onClick={() => setIsFilterMenuOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Results count */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                  </p>
                </div>
                
                {/* Course Grid */}
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard key={course.id} {...course} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg border">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <BookOpen className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No courses found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
                    <Button onClick={clearFilters}>Clear All Filters</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-edu-purple/10 py-16">
          <div className="container px-4 mx-auto text-center max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-8">
              Our platform is constantly growing. If you'd like to see specific courses or subjects added, let us know!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/suggest-course">
                <Button className="w-full sm:w-auto bg-edu-purple hover:bg-edu-purple/90">
                  Suggest a Course
                </Button>
              </Link>
              <Link to="/become-teacher">
                <Button variant="outline" className="w-full sm:w-auto">
                  Become a Teacher
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
