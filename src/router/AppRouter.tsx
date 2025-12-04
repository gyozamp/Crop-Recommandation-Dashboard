import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Dataset from "../pages/Dataset";
import Analytics from "../pages/Analytics";
//import Settings from "../pages/Settings";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* <Route path="/settings" element={<Settings/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
