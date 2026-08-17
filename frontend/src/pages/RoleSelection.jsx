import { useNavigate } from "react-router-dom";

const roles = [
  {
    id: "doctor",
    title: "Doctor",
    icon: "👨‍⚕️",
    desc: "Provide consultations & appointments",
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
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-white flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
      {/* Header */}
      <div className="text-center w-full max-w-2xl mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
          Choose Your Role
        </h1>

        <p className="text-sm sm:text-base text-gray-500 px-4">
          Select how you want to use the platform
        </p>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-5xl w-full">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => handleSelect(role.id)}
            className="
              w-full
              min-h-[180px]
              sm:min-h-[200px]
              bg-white
              border border-gray-100
              rounded-2xl
              p-5 sm:p-6
              text-center
              shadow-sm
              cursor-pointer
              transition-all
              duration-300
              hover:shadow-xl
              hover:-translate-y-1
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:ring-offset-2
            "
          >
            {/* Icon */}
            <div className="text-4xl sm:text-5xl mb-3">{role.icon}</div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {role.title}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed max-w-[250px] mx-auto">
              {role.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
