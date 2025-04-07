
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, Globe, Users, Download, Play, CheckCircle, Circle, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const course = courses.find(course => course.id === Number(id));
  
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<number | null>(null);
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the course you're looking for.</p>
          <Link to="/courses">
            <Button>Courses dekh le ?</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    setIsEnrolled(true);
    toast({
      title: "Successfully Enrolled!",
      description: "You've enrolled in this course.toh padhna chalu karo!",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Downloading Course",
      description: "The course is being downloaded for offline use.dekh lena par yaad se ",
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from Favorites ( but why &#128529 " : "Added to Favorites",
      description: isFavorite 
        ? "This course has been removed from your favorites." 
        : "This course has been added to your favorites.",
    });
  };

  const startModule = (moduleId: number) => {
    setCurrentModuleId(moduleId);
    toast({
      title: "Starting Module",
      description: "Loading module content...",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Course Header */}
        <div className="bg-gradient-to-b from-edu-purple/10 to-white py-8">
          <div className="container px-4 mx-auto">
            <div className="flex items-center mb-4">
              <Link to="/courses" className="text-gray-600 hover:text-edu-purple flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Courses
              </Link>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-7/12">
                <span className="inline-block bg-edu-blue/10 text-edu-blue px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {course.category}
                </span>
                <h1 className="text-2xl md:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-gray-600 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">{course.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">{course.enrolledCount} students</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-2">Instructor: <span className="font-medium text-gray-900">{course.instructor}</span></p>
                
                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <Button 
                    className={isEnrolled ? "bg-green-600 hover:bg-green-700" : "bg-edu-purple hover:bg-edu-purple/90"} 
                    onClick={handleEnroll}
                  >
                    {isEnrolled ? "Continue Learning" : "Enroll for Free"}
                  </Button>
                  
                  {course.isOfflineAvailable && (
                    <Button variant="outline" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download for Offline
                    </Button>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="w-10 h-10 rounded-full"
                    onClick={toggleFavorite}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                  </Button>
                </div>
              </div>
              
              <div className="md:w-5/12">
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Button className="rounded-full w-16 h-16 flex items-center justify-center">
                      <Play className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="container px-4 mx-auto py-12">
          <Tabs defaultValue="curriculum">
            <TabsList className="mb-8">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curriculum">
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Course Modules</h2>
                  {isEnrolled && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Progress:</span>
                      <Progress value={33} className="w-40" />
                      <span className="text-sm text-gray-500 ml-2">33%</span>
                    </div>
                  )}
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((module, index) => (
                    <AccordionItem key={module.id} value={`module-${module.id}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          {isEnrolled && (
                            <div className="mr-3">
                              {module.isCompleted ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <Circle className="h-5 w-5 text-gray-300" />
                              )}
                            </div>
                          )}
                          <div className="text-left">
                            <span className="font-medium">{`Module ${index + 1}: ${module.title}`}</span>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{module.duration}</span>
                              <span className="mx-2">•</span>
                              <span className="capitalize">{module.type}</span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="p-4 bg-gray-50 rounded-md">
                          <p className="text-gray-600 mb-4">
                            This module will cover essential concepts related to {module.title.toLowerCase()}.
                          </p>
                          <Button 
                            onClick={() => startModule(module.id)}
                            size="sm" 
                            className="bg-edu-purple hover:bg-edu-purple/90"
                            disabled={!isEnrolled}
                          >
                            {isEnrolled ? (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Start Module
                              </>
                            ) : (
                              "Enroll to Access"
                            )}
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            
            <TabsContent value="overview">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
                <p className="text-gray-600 mb-6">
                  {course.description}
                </p>
                <h3 className="text-lg font-semibold mb-3">What You'll Learn</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Fundamental concepts and skills related to {course.title.toLowerCase()}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Practical applications that you can implement immediately</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>Problem-solving techniques specific to this subject area</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>How to apply your learning in real-world situations</span>
                  </li>
                </ul>
                
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Circle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>No prior knowledge required - this course is suitable for beginners</span>
                  </li>
                  <li className="flex items-start">
                    <Circle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>Basic reading skills in one of the supported languages</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="resources">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Additional Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium mb-2">Supplementary Reading Materials</h3>
                    <p className="text-sm text-gray-600 mb-3">PDF documents to support your learning</p>
                    <Button variant="outline" size="sm" disabled={!isEnrolled}>
                      {isEnrolled ? "Download" : "Enroll to Access"}
                    </Button>
                  </div>
                  <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium mb-2">Practice Worksheets</h3>
                    <p className="text-sm text-gray-600 mb-3">Exercises to test your knowledge</p>
                    <Button variant="outline" size="sm" disabled={!isEnrolled}>
                      {isEnrolled ? "Download" : "Enroll to Access"}
                    </Button>
                  </div>
                  <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium mb-2">Community Resources</h3>
                    <p className="text-sm text-gray-600 mb-3">Connect with local learning groups</p>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                  <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium mb-2">Mobile Learning App</h3>
                    <p className="text-sm text-gray-600 mb-3">Take your learning offline</p>
                    <Button variant="outline" size="sm">
                      Download App
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="discussion">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Community Discussion</h2>
                {isEnrolled ? (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-gray-600 mb-3">
                        Join the conversation with fellow learners and instructors. Share your questions, insights, and experiences related to this course.
                      </p>
                      <Button className="bg-edu-purple hover:bg-edu-purple/90">
                        View Discussion Forum
                      </Button>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-4">Recent Discussions</h3>
                      <div className="space-y-4">
                        <div className="border-b pb-4">
                          <p className="font-medium">How do I apply these concepts in rural settings?</p>
                          <p className="text-sm text-gray-500">Started by Maria • 2 days ago • 4 replies</p>
                        </div>
                        <div className="border-b pb-4">
                          <p className="font-medium">Resources for additional practice</p>
                          <p className="text-sm text-gray-500">Started by Ahmed • 5 days ago • 2 replies</p>
                        </div>
                        <div>
                          <p className="font-medium">Confused about module 3 concept</p>
                          <p className="text-sm text-gray-500">Started by Li • 1 week ago • 8 replies</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Enroll in this course to join the discussion</p>
                    <Button onClick={handleEnroll}>Enroll Now</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Courses */}
        <div className="bg-gray-50 py-12">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl font-bold mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses
                .filter(relatedCourse => 
                  relatedCourse.category === course.category && relatedCourse.id !== course.id
                )
                .slice(0, 4)
                .map(relatedCourse => (
                  <Link to={`/courses/${relatedCourse.id}`} key={relatedCourse.id} className="group">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all group-hover:shadow-md group-hover:-translate-y-1">
                      <div className="relative h-36">
                        <img 
                          src={relatedCourse.imageUrl} 
                          alt={relatedCourse.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-edu-purple transition-colors">
                          {relatedCourse.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{relatedCourse.duration}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;
