import { NavLink } from "react-router-dom";
import ToggleButton from "../sidebar/ToggleButton";
import { settingByRole } from "../../config/settingsConfig";
import { useAuth } from "../../hooks/useAuth";

const SettingsLayout = ({ setActiveSidebar, isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const role = user?.role;
  const menuItem = settingByRole[role] || [];

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-40 md:relative
        ${isOpen ? "w-64 translate-x-0" : "w-16 md:translate-x-0 -translate-x-full"}
        flex flex-col h-screen overflow-hidden
        bg-white border-r border-purple-100 text-gray-600
        transition-all duration-300 ease-in-out shadow-xl shadow-purple-900/5
      `}
    >
      <div className="flex h-16 items-center border-b border-purple-50/80 px-2">
        {isOpen && (
          <span className="ml-2 text-base font-extrabold tracking-tight bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            CareScynify
          </span>
        )}

        <div className={`flex items-center justify-center w-full`}>
          <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* Navigation list featuring */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-none">
        <ul className="space-y-1.5">
          {menuItem.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => {
                  if (item.id) setActiveSidebar(item.id);
                }}
                className={({ isActive }) =>
                  ` relative flex items-center rounded-xl font-medium text-sm transition-all duration-200 group ${isOpen ? "gap-4 px-3 py-2.5" : "justify-center py-3"} ${isActive ? "bg-purple-50/80 text-purple-700 font-semibold" : "hover:bg-gray-50 hover:text-gray-900"}`
                }
              >
                <span
                  className={({ isActive }) => `
                  absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md transition-all duration-200
                  ${isActive ? "bg-purple-600" : "bg-transparent group-hover:bg-gray-200"}
                `}
                />
                {/* Icon Layout container */}
                <span
                  className={`
                    text-lg transition-colors duration-200 min-w-6 flex justify-center
                    ${isOpen ? "" : "mx-auto"}
                  `}
                >
                  {item.icon}
                </span>
                {/* Animated Text label view toggling */}
                <span
                  className={`
                    whitespace-nowrap transition-all duration-200
                    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible w-0 overflow-hidden"}
                  `}
                >
                  {item.name}
                </span>
                {/* Hover Flyout Tooltip bubble when sidebar structure collapsed */}
                {!isOpen && (
                  <div className="absolute left-20 scale-0 group-hover:scale-100 transition-all duration-150 origin-left bg-gray-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SettingsLayout;
