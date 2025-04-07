
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-edu-purple rounded-md flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="font-bold text-xl text-edu-purple">EduAccess</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Making quality education accessible to everyone, everywhere.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-edu-purple">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-edu-purple">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-edu-purple">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-edu-purple">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-gray-600 hover:text-edu-purple text-sm">All Courses</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-edu-purple text-sm">About Us</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-edu-purple text-sm">Community</Link></li>
              <li><Link to="/support" className="text-gray-600 hover:text-edu-purple text-sm">Support</Link></li>
            </ul>
          </div>

          {/* Course Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Course Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/basic-education" className="text-gray-600 hover:text-edu-purple text-sm">Basic Education</Link></li>
              <li><Link to="/category/digital-skills" className="text-gray-600 hover:text-edu-purple text-sm">Digital Skills</Link></li>
              <li><Link to="/category/health" className="text-gray-600 hover:text-edu-purple text-sm">Health & Wellbeing</Link></li>
              <li><Link to="/category/agriculture" className="text-gray-600 hover:text-edu-purple text-sm">Agriculture</Link></li>
              <li><Link to="/category/entrepreneurship" className="text-gray-600 hover:text-edu-purple text-sm">Entrepreneurship</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <span className="text-gray-600 text-sm">support@eduaccess.org</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Download Our App</h4>
              <p className="text-xs text-gray-600 mb-2">Access courses offline!</p>
              <div className="flex space-x-2">
                <a href="#" className="bg-black text-white text-xs px-3 py-1 rounded">
                  App Store
                </a>
                <a href="#" className="bg-black text-white text-xs px-3 py-1 rounded">
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} EduAccess. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-sm text-gray-600 hover:text-edu-purple">Terms of Service</Link>
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-edu-purple">Privacy Policy</Link>
              <Link to="/accessibility" className="text-sm text-gray-600 hover:text-edu-purple">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
