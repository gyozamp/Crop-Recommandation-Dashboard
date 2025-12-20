import { GlobeAltIcon } from "@heroicons/react/24/solid"; // Icona di esempio

export default function Footer() {
  return (
    // bg-white e border-gray-100 riprendono la sidebar
    <footer className="py-7 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left: Copyright & Brand */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-semibold text-gray-900">IoT Dashboard</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>

        {/* Right: Links */}
        <div className="flex gap-6 mt-4 md:mt-0 text-sm font-medium text-gray-500">
          <a 
            href="https://github.com/gyozamp/Crop-Recommandation-Dashboard" 
            className="flex items-center gap-1 hover:text-indigo-600 transition-colors duration-200"
          >
            <GlobeAltIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}