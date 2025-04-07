
import { Link } from "react-router-dom";
import { Download, Globe, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  languages: string[];
  duration: string;
  isOfflineAvailable: boolean;
}

const CourseCard = ({
  id,
  title,
  description,
  imageUrl,
  category,
  languages,
  duration,
  isOfflineAvailable,
}: CourseCardProps) => {
  return (
    <Card className="course-card overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-edu-blue hover:bg-edu-blue/90">
            {category}
          </Badge>
        </div>
        {isOfflineAvailable && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-edu-orange hover:bg-edu-orange/90">
              <Download className="h-3 w-3 mr-1" /> Offline
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow pt-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            <span>{languages.join(", ")}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link 
          to={`/courses/${id}`} 
          className="w-full text-center py-2 px-4 bg-edu-purple hover:bg-edu-purple/90 text-white rounded-md transition-colors"
        >
          View Course
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
