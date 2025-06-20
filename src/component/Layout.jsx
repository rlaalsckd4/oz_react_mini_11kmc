import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import DarkMode from "./DarkMode";

export default function Layout() {
  return (
    <>
      <NavBar />
      <main className="px-4 py-6">
        <Outlet />
      </main>
    </>
  );
}
