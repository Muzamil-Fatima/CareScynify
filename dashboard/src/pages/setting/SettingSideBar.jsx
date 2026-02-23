import React from "react";

const SettingSideBar = () => {
  const [toggle, setToggle] = React.useState(true);
  const menuItem = [
    {
      name: "Doctor",
      path: "/doctor",
      icon: (
        <svg
          viewBox="0 0 23 25"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
        >
          <path d="M12.4998 2.26165L19.8267 8.27838C20.2389 8.61563 20.485 9.13524 20.485 9.68982V20.6853C20.485 21.702 19.6881 22.484 18.7576 22.484H15.4888V16.5509C15.4888 15.6399 15.1269 14.7662 14.4827 14.1221C13.8385 13.4779 12.9648 13.116 12.0538 13.116H10.8048C9.89378 13.116 9.02009 13.4779 8.37592 14.1221C7.73175 14.7662 7.36985 15.6399 7.36985 16.5509V22.484H4.10106C3.17051 22.484 2.37361 21.702 2.37361 20.6853V9.69107C2.37361 9.13524 2.61967 8.61688 3.03186 8.27963L10.3589 2.2604C10.6595 2.01029 11.0382 1.87335 11.4293 1.87335C11.8204 1.87335 12.1991 2.01154 12.4998 2.26165ZM18.7576 24.3563C20.7685 24.3563 22.3586 22.6888 22.3586 20.6841V9.68982C22.36 9.14346 22.2404 8.60356 22.0082 8.10898C21.776 7.61439 21.4371 7.17741 21.0159 6.82947L13.6901 0.812741C13.0543 0.287389 12.2553 0 11.4306 0C10.6058 0 9.8068 0.287389 9.171 0.812741L1.84275 6.83072C1.4215 7.17866 1.08259 7.61564 0.850417 8.11022C0.618243 8.60481 0.498572 9.14471 0.500013 9.69107V20.6853C0.500013 22.6901 2.09007 24.3576 4.10106 24.3576L18.7576 24.3563Z" />
        </svg>
      ),
    },
  ];
  return (
    <div
      className={` min-h-screen bg-slate-950 text-white p-2 transition-all duration-300 ${
        toggle ? "w-64" : "w-16"
      }`}
    >
      <div className="flex justify-between items-center mb-2 p-4">
        {" "}
        <button onClick={() => setToggle(!toggle)} className=" text-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-10 h-10"
          >
            {/* Green circle */}
            <circle cx="50" cy="35" r="30" fill="#a3e635" />

            {/* Road/path */}
            <path
              d="M35 35 L50 70 L65 35"
              stroke="#60a5fa"
              strokeWidth="6"
              fill="none"
            />

            {/* Road dashed lines */}
            <path d="M49 42 L51 42" stroke="#fff" strokeWidth="2" />
            <path d="M49 50 L51 50" stroke="#fff" strokeWidth="2" />
            <path d="M49 58 L51 58" stroke="#fff" strokeWidth="2" />
          </svg>
        </span>
      </div>

      <ul className="space-y-4">
        {menuItem.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `w-full pl-2 h-13 flex items-center rounded-lg
     ${
       isActive
         ? "bg-blue-600 text-white"
         : "text-white hover:text-indigo-500 hover:border-2 hover:border-dashed hover:border-indigo-500"
     }`
            }
          >
            {item.icon}
            <span className={`ml-2 ${toggle ? "block" : "hidden"}`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SettingSideBar;
