import { useAuthStore } from "../store/useAuthStore.js";
import { useThemeStore } from "../store/useThemeStore.js";
import { LogOut, MessageSquare, User, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <header className="w-full bg-base-100 border-b border-base-300 fixed top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* APP ICON */}
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">
                Chat<span className="text-primary">Hub</span>
              </h1>
            </NavLink>
          </div>

          {/* NAVLINKS */}
          <div className="flex items-center gap-2">
            <button className="p-1 cursor-pointer flex items-center justify-center hover:opacity-70 transition-opacity">
              {theme === "dark" ? 
                <Sun className="w-5 h-5" onClick={() => setTheme("light")}/> 
              : 
                <Moon className="w-5 h-4" onClick={() => setTheme("dark")}/>}
            </button>

            {authUser && (
              <>
                <NavLink to={"/profile"} className="flex items-center justify-center gap-2 px-2 py-1.5 rounded-md hover:opacity-70 transition-opacity">
                  <User className="w-5 h-5" />
                  <span className="hidden text-sm font-medium sm:inline">Profile</span>
                </NavLink>

                <button className="flex gap-2 items-center cursor-pointer hover:text-red-500 transition-colors" onClick={logout}>
                  <LogOut className="w-5 h-5" />
                  <span className="hidden text-sm font-medium sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
