import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export default function AppLayout() {
  return (
    <div className="w-full h-screen grid grid-rows-[auto_1fr] grid-cols-[15rem_1fr] dark:text-white">
      {/* Sidebar */}
      <aside className="row-span-2 border-r border-gray-300 overflow-y-auto dark:bg-zinc-800 pt-4">
        <SideBar />
      </aside>

      {/* Header */}
      <header className="p-4 border-b border-gray-300 dark:bg-zinc-800">
        <Header />
      </header>

      {/* Main with scroll */}
      <main className="p-4 overflow-y-auto min-h-0">
        <Outlet />
      </main>
    </div>
  );
}
