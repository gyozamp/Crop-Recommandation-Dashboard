import { MagnifyingGlassIcon, BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect } from 'react';

// Dati fittizi del gruppo da visualizzare
const GROUP_INFO = {
    groupName: "G-26",
    members: [
        { name: "Giovanni", surname: "Zampetti", email: "gi.zampetti@studenti.unina.it" },
        { name: "Michele", surname: "Corvino", email: "miche.corvino@studenti.unina.it" },
    ]
};

export default function Navbar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const profileRef = useRef(null);
  const popoverRef = useRef(null);

  // Hook per chiudere il popover quando si clicca al di fuori
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current && 
        !profileRef.current.contains(event.target) &&
        popoverRef.current && 
        !popoverRef.current.contains(event.target)
      ) {
        setIsPopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef, popoverRef]);


  const togglePopover = () => {
    setIsPopoverOpen(prev => !prev);
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
      
      {/* Left: Title / Breadcrumbs */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Crop Recommendation
        </h2>
        <span className="text-xs text-gray-400 font-medium">Overview & Analytics</span>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 w-96 border border-transparent focus-within:border-indigo-300 focus-within:bg-white transition-all">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Cerca colture, sensori o dati..." 
          className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-600 placeholder-gray-400"
        />
      </div>

      {/* Right: Actions & Profile Container (Relative) */}
      <div className="flex items-center gap-6 relative">
        
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 mx-1"></div>

        {/* User Profile Area (Clickable) */}
        <div 
          ref={profileRef}
          onClick={togglePopover}
          className="flex items-center gap-3 cursor-pointer group p-1 -m-1 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
              Zampetti-Corvino
            </p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=11"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md group-hover:border-indigo-400 transition-all"
              alt="User avatar"
            />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          <ChevronDownIcon className={`h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-transform ${isPopoverOpen ? 'rotate-180' : 'rotate-0'}`} />
        </div>
        
        {/* --- PROFILE POPOVER / MODAL --- */}
        {isPopoverOpen && (
          <div
            ref={popoverRef}
            className="absolute right-0 top-full mt-3 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 z-30 transform origin-top-right animate-fade-in"
          >
            <h3 className="text-base font-bold text-gray-900 border-b pb-2 mb-3">Info Gruppo Progetto</h3>
            
            <p className="text-sm font-semibold text-indigo-600 mb-2">Nominativo Gruppo: {GROUP_INFO.groupName}</p>

            <h4 className="text-sm font-semibold text-gray-700 mt-4 mb-2">Membri del Gruppo:</h4>
            
            <div className="space-y-3">
              {GROUP_INFO.members.map((member, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs space-y-1 mt-1 text-gray-700">
                    <p>
                        <span className="font-bold">Nome:</span> {member.name}
                    </p>
                    <p>
                        <span className="font-bold">Cognome:</span> {member.surname}
                    </p>
                    <p>
                        <span className="font-bold">Email:</span> <span className="font-medium text-indigo-500">{member.email}</span>
                    </p>
                  </div>                  
                </div>
              ))}
            </div>
            
          </div>
        )}
        
      </div>
    </header>
  );
}