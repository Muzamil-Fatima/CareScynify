import { NavLink } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import  {menuByRole} from "../../config/menuConfig"
import { useAuth } from "../../hooks/useAuth";


const SideBar = ({ setActiveSidebar, isOpen, setIsOpen }) => {
 
 const { user } = useAuth();
  const role = user?.role;

  const menuItem = menuByRole[role] || [];
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } min-h-screen bg-slate-900 text-white transition-all duration-300 shadow-xl`}
    >
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />

      <ul className="mt-6 space-y-2 px-2">
        {menuItem.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => {
              if (item.id) {
                setActiveSidebar(item.id);
              }
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-slate-800 hover:pl-4"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            {isOpen && <span className="text-sm font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
