import ToggleButton from "../../components/sidebar/ToggleButton";
import { NavLink } from "react-router-dom";
const DrSideBar = ({ isOpen, setIsOpen }) => {
  const menuItem = [
    {
      name: "Dashboard",
      path: "/doctor/dashboard",
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
    {
      name: "My Schedule",
      path: "/schedule",
      icon: (
        <svg
          fill="#ffffff"
          width="28px"
          height="28px"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.78 16.17a5.39 5.39 0 1 1 0-10.78 5.39 5.39 0 0 1 0 10.78zm0-1.54a3.85 3.85 0 1 0 0-7.7 3.85 3.85 0 0 0 0 7.7z" />
          <rect x="10.01" y="7.7" width="1.54" height="3.85" rx=".767" />
          <rect x="10.01" y="10.01" width="3.08" height="1.54" rx=".767" />
        </svg>
      ),
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_68_254)">
            <path
              d="M6.04703 0V8.06667M18.9537 0V8.06667M5.24036 12.1H10.0804M19.7604 12.1H14.9204M5.24036 16.94H10.0804M14.9204 16.94H19.7604M2.82036 4.03333H22.1804C22.6082 4.03333 23.0186 4.20331 23.3212 4.50587C23.6237 4.80843 23.7937 5.21878 23.7937 5.64667V21.78C23.7937 22.2079 23.6237 22.6182 23.3212 22.9208C23.0186 23.2234 22.6082 23.3933 22.1804 23.3933H2.82036C2.39248 23.3933 1.98212 23.2234 1.67957 22.9208C1.37701 22.6182 1.20703 22.2079 1.20703 21.78V5.64667C1.20703 5.21878 1.37701 4.80843 1.67957 4.50587C1.98212 4.20331 2.39248 4.03333 2.82036 4.03333Z"
              stroke="currentcolor"
              stroke-width="1.65"
              stroke-linecap="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_68_254">
              <rect
                width="24.2"
                height="24.2"
                fill="white"
                transform="translate(0.400391)"
              />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      name: "Messages",
      path: "/chat",
      icon: (
        <svg
          width="28px"
          height="28px"
          viewBox="0 0 76.01 76.01"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          baseProfile="full"
          enable-background="new 0 0 76.01 76.01"
          xml:space="preserve"
        >
          <path
            fill="#ffffff"
            fill-opacity="1"
            stroke-width="0.2"
            stroke-linejoin="round"
            d="M 40.3806,19.0027C 49.5637,19.0027 57.008,23.611 57.008,29.2958C 57.008,32.9008 54.0141,36.073 49.4815,37.9115C 50.4478,39.7772 52.1442,41.8291 53.8406,44.4135C 50.3128,43.1826 45.0382,41.9924 41.9082,39.546L 40.3806,39.5889C 31.1976,39.5889 23.7533,34.9805 23.7533,29.2958C 23.7533,23.611 31.1976,19.0027 40.3806,19.0027 Z M 44.3395,43.5477C 44.3395,48.3579 38.6677,52.2573 31.6711,52.2573L 30.7082,52.2325C 28.1329,54.6161 24.5589,57.008 20.5862,57.008C 21.5113,55.1577 23.5174,53.3075 24.7099,50.8257C 21.2717,49.2683 19.0026,46.5902 19.0026,43.5477C 19.0026,40.5065 21.27,37.8293 24.706,36.2715C 27.6472,39.1709 32.8586,41.0982 38.7973,41.0982L 40.3249,41.0553C 41.4454,41.9312 42.8409,42.646 44.3327,43.2594L 44.3395,43.5477 Z "
          />
        </svg>
      ),
    },
    {
      name: "Patients",
      path: "/patients",
      icon: (
        <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 11C17.6569 11 19 9.65685 19 8C19 6.34315 17.6569 5 16 5C14.3431 5 13 6.34315 13 8C13 9.65685 14.3431 11 16 11Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M4 19C4 16.7909 5.79086 15 8 15H10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M20 19C20 16.7909 18.2091 15 16 15H14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: "Prescriptions",
      path: "/prescriptions",
      icon: (
        <svg
          fill="#ffffff"
          width="24px"
          height="24px"
          viewBox="-3 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m15.76 2.852h-2.577v1.221h2.577.007c.655 0 1.186.531 1.186 1.186v.008 16.326.007c0 .656-.532 1.187-1.187 1.187-.002 0-.005 0-.007 0h-13.351c-.002 0-.005 0-.007 0-.656 0-1.187-.532-1.187-1.187 0-.003 0-.005 0-.008v-16.326c0-.002 0-.005 0-.007 0-.656.532-1.187 1.187-1.187h.007 2.577v-1.22h-2.577c-1.331 0-2.411 1.08-2.411 2.411v16.326c.001 1.331 1.08 2.41 2.411 2.41h13.351c1.331 0 2.411-1.08 2.411-2.411v-16.326c0-1.331-1.08-2.411-2.411-2.411z" />
          <path d="m12.605 2.225h-1.319c0-1.229-.996-2.225-2.225-2.225s-2.225.996-2.225 2.225h-1.31v3.057h7.073v-3.057zm-2.258 0h-2.57c0-.01 0-.021 0-.032 0-.71.576-1.286 1.286-1.286s1.286.576 1.286 1.286v.034-.002z" />
          <path d="m5.947 8.512h9.458v1.17h-9.458z" />
          <path d="m5.947 13.41h9.458v1.17h-9.458z" />
          <path d="m5.947 18.25h9.458v1.176h-9.458z" />
          <path d="m2.628 7.757h2.68v2.68h-2.68z" />
          <path d="m2.628 12.655h2.68v2.68h-2.68z" />
          <path d="m2.628 17.497h2.68v2.68h-2.68z" />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/doctor/profile",
      icon: (
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
            fill="#ffffff"
          />
        </svg>
      ),
    },
    {
      name:"Patient Reviews",
      path:"/doctor-reviews"
    },
  ];
  return (
    <div
      className={`${isOpen ? "w-64" : "w-0"} min-h-screen bg-slate-950 text-white p-2 transition-all duration-300`}
    >
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
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
            <span>{item.name}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default DrSideBar;
