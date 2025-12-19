// import necessari 
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import IconButton from "../Button/IconButton";
import Modal from "../Modals/Modal";

// Dati del gruppo da visualizzare
const GROUP_INFO = {
  groupName: "G-26",
  members: [
    {
      name: "Giovanni",
      surname: "Zampetti",
      email: "gi.zampetti@studenti.unina.it",
    },
    {
      name: "Michele",
      surname: "Corvino",
      email: "miche.corvino@studenti.unina.it",
    },
  ],
};

export default function Navbar() {
  // Stato per l’apertura del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
      {/* LEFT */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Crop Recommendation
        </h2>
        <span className="text-xs text-gray-400 font-medium">
          Overview & Analytics
        </span>
      </div>

      {/* CENTER: Search Bar */}
      <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 w-96 border border-transparent focus-within:border-indigo-300 focus-within:bg-white transition-all">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cerca colture, sensori o dati..."
          className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-600 placeholder-gray-400"
        />
      </div>

      {/* RIGHT: Actions & Profile */}
      <div className="flex items-center gap-6 relative">
        {/* Notifiche */}
        <IconButton
          icon={<BellIcon />}
          ariaLabel="Notifiche"
          onClick={() => {
            /* eventuale logica per notifiche */
          }}
          badge={true}
        />

        <div className="h-8 w-px bg-gray-200 mx-1" />

        {/* Profilo: apre il modal */}
        <div
          onClick={() => setIsModalOpen(true)}
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
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full" />
          </div>

          <ChevronDownIcon
            className={`h-4 w-4 text-gray-400 group-hover:text-indigo-600 transition-transform ${
              isModalOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* Modal con le info gruppo */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Info Gruppo Progetto"
        >
          <p className="text-sm font-semibold text-indigo-600 mb-2">
            Nominativo Gruppo: {GROUP_INFO.groupName}
          </p>

          <h4 className="text-sm font-semibold text-gray-700 mt-4 mb-2">
            Membri del Gruppo:
          </h4>

          <div className="space-y-3">
            {GROUP_INFO.members.map((member, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="text-xs space-y-1 mt-1 text-gray-700">
                  <p>
                    <span className="font-bold">Nome:</span> {member.name}
                  </p>
                    <p>
                    <span className="font-bold">Cognome:</span>{" "}
                    {member.surname}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span>{" "}
                    <span className="font-medium text-indigo-500">
                      {member.email}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </header>
  );
}
