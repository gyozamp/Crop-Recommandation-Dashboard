import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function DashboardLayout() {
  return (
    // 1. h-screen: Forza l'altezza pari esattamente alla finestra del browser
    // 2. overflow-hidden: Impedisce lo scroll sulla finestra principale (gestiamo lo scroll dentro main)
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* La Navbar rimane fissa in alto perché non è dentro il container scrollabile */}
        <Navbar />

        {/* flex-1: Occupa tutto lo spazio rimanente tra Navbar e Footer.
           overflow-y-auto: Se il contenuto è lungo, la scrollbar appare SOLO qui.
        */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Il Footer rimane fisso in basso visivamente perché main spinge, ma non scrolla via */}
        <Footer />
      </div>
    </div>
  );
}