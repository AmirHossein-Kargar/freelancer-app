import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

export default function AppLayout() {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  const sideBarRef = useOutsideClick(() => {
    if (isSideBarOpen) setIsSidebarOpen(false);
  });
  return (
    <div className="fixed inset-0 grid md:grid-rows-[auto_1fr] md:grid-cols-[15rem_1fr]">
      {/* Sidebar */}
      <aside
        ref={sideBarRef}
        className={`row-span-2 fixed top-0 left-0 h-full z-50
    w-64  bg-white md:bg-transparent shadow-lg md:shadow-none transition-all-custom transform
    ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:static md:translate-x-0 md:block`}
      >
        <SideBar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Header */}
      <header className="border-b border-gray-300 px-4 py-6">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
      </header>

      {/* Main with scroll */}
      <main className="overflow-y-auto min-h-0 space-y-4 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
