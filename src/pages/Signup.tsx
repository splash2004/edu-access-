
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { languages } from "@/data/courses";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const passwordStrength = (): { score: number; feedback: string } => {
    if (!password) return { score: 0, feedback: "Enter a password" };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    let feedback = "";
    switch (score) {
      case 0:
      case 1:
        feedback = "Very weak";
        break;
      case 2:
        feedback = "Weak";
        break;
      case 3:
        feedback = "Fair";
        break;
      case 4:
        feedback = "Good";
        break;
      case 5:
        feedback = "Strong";
        break;
      default:
        feedback = "";
    }
    
    return { score, feedback };
  };
  
  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.length >= 8 &&
      password === confirmPassword &&
      preferredLanguage !== "" &&
      acceptTerms
    );
  };
  
  const { score, feedback } = passwordStrength();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      setIsSubmitting(false);
      // In a real app, you would redirect or handle successful signup here
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-lg mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create an Account</CardTitle>
                <CardDescription>
                  Join EduAccess to start learning for free
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium flex items-center justify-between">
                        <span>Password</span>
                        <span className={`text-xs ${score >= 4 ? 'text-green-600' : score >= 3 ? 'text-amber-600' : 'text-red-600'}`}>
                          {feedback}
                        </span>
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <div className="h-1 w-full bg-gray-200 rounded-full mt-1">
                        <div 
                          className={`h-full rounded-full ${
                            score >= 4 ? 'bg-green-500' : 
                            score >= 3 ? 'bg-amber-500' : 
                            score > 0 ? 'bg-red-500' : ''
                          }`} 
                          style={{ width: `${(score / 5) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {confirmPassword && password !== confirmPassword && (
                        <p className="text-xs text-red-600">
                          Passwords do not match
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="language" className="text-sm font-medium">
                        Preferred Language
                      </label>
                      <Select 
                        value={preferredLanguage} 
                        onValueChange={setPreferredLanguage}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">
                        Course content will be prioritized in your preferred language when available
                      </p>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={acceptTerms}
                          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                          required
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                          I agree to the{" "}
                          <Link to="/terms" className="text-edu-purple hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-edu-purple hover:underline">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="marketing" 
                          checked={acceptMarketing}
                          onCheckedChange={(checked) => setAcceptMarketing(checked as boolean)}
                        />
                        <label htmlFor="marketing" className="text-sm text-gray-600 leading-tight">
                          I want to receive updates about new courses and educational resources
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button" className="ml-1 text-gray-500">
                                  <Info className="h-3.5 w-3.5" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-64 text-xs">
                                  You can change your communication preferences at any time from your account settings.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-edu-purple hover:bg-edu-purple/90 mt-2"
                      disabled={!isFormValid() || isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                          Creating account...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Create Account
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Button variant="outline" type="button" className="border border-gray-300">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"></path>
                      </svg>
                      Facebook
                    </Button>
                    <Button variant="outline" type="button" className="border border-gray-300">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.01 14.99c-1.45 1.32-3.35 2.01-5.01 2.01-1.66 0-3.57-.69-5.01-2.01-.24-.22-.25-.59-.03-.82l.38-.41c.2-.22.54-.24.78-.04 1.17 1.08 2.54 1.68 3.88 1.68s2.71-.6 3.88-1.68c.24-.2.58-.18.78.04l.38.41c.22.23.2.6-.03.82z"></path>
                      </svg>
                      Google
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-edu-purple font-medium hover:underline">
                    Log in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
