import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "doctor",
    title: "Doctor",
    icon: "👨‍⚕️",
    desc: "Provide consultations & appointments",
  },
  {
    id: "hospital",
    title: "Hospital",
    icon: "🏥",
    desc: "Manage hospital services",
  },
  {
    id: "clinic",
    title: "Clinic",
    icon: "🏥",
    desc: "Private clinic management",
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    icon: "💊",
    desc: "Medicine & prescriptions",
  },
  {
    id: "laboratory",
    title: "Laboratory",
    icon: "🔬",
    desc: "Tests & reports handling",
  },
];

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-white flex flex-col items-center px-6 py-16">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Choose Your Role
      </h1>
      <p className="text-gray-500 mb-10 text-center">
        Select how you want to use the platform
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => handleSelect(role.id)}
            className="cursor-pointer bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-5xl mb-3">{role.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800">
              {role.title}
            </h2>
            <p className="text-sm text-gray-500 mt-2">{role.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
