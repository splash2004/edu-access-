
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "sw", name: "Kiswahili" },
  { code: "hi", name: "हिन्दी" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { toast } = useToast();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleOfflineMode = () => {
    setIsOffline(!isOffline);
    toast({
      title: isOffline ? "Online Mode" : "Offline Mode",
      description: isOffline 
        ? "You've switched to online mode. All features available." 
        : "Offline mode enabled. Content will be available without internet.",
    });
  };

  const changeLanguage = (langCode: string, langName: string) => {
    setCurrentLanguage(langCode);
    toast({
      title: "Language Changed",
      description: `Interface language changed to ${langName}`,
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-edu-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="font-bold text-xl text-edu-purple">EduAccess</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-gray-700 hover:text-edu-purple transition-colors">
              Courses
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-edu-purple transition-colors">
              About Us
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-edu-purple transition-colors">
              Community
            </Link>
            <Link to="/support" className="text-gray-700 hover:text-edu-purple transition-colors">
              Support
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    className={currentLanguage === lang.code ? "bg-muted" : ""}
                    onClick={() => changeLanguage(lang.code, lang.name)}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Offline mode toggle */}
            <Button 
              variant={isOffline ? "default" : "outline"} 
              size="icon"
              onClick={toggleOfflineMode}
              className={isOffline ? "bg-edu-orange hover:bg-edu-orange/90" : "text-gray-700"}
              title={isOffline ? "Currently in offline mode" : "Switch to offline mode"}
            >
              <WifiOff className="h-5 w-5" />
            </Button>

            {/* Login/Sign up */}
            <Link to="/login">
              <Button variant="ghost" className="text-gray-700">
                Login
              </Button>
            </Link>
            <Link to="/signup" className="hidden md:block">
              <Button className="bg-edu-purple hover:bg-edu-purple/90">
                Sign Up
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 px-2 mt-2 bg-white border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/courses" 
                className="text-gray-700 hover:text-edu-purple transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-edu-purple transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/community" 
                className="text-gray-700 hover:text-edu-purple transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                to="/support" 
                className="text-gray-700 hover:text-edu-purple transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </Link>
              <Link 
                to="/signup" 
                className="text-gray-700 hover:text-edu-purple transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
