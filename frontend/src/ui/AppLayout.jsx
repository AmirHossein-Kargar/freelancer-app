import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export default function AppLayout() {
  return (
    <div className="w-full grid grid-rows-[auto_1fr] grid-cols-[15rem_1fr] h-screen dark:text-white">
      <aside className="row-span-2 pt-8 border-r border-gray-400">
        <SideBar />
      </aside>
      <header className="p-4 border-b">
        <Header />
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
