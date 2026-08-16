import React from "react";

const NotificationFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { label: "All", value: "all" },
    { label: "Appointments", value: "appointment" },
    { label: "Lab", value: "lab" },
    { label: "Pharmacy", value: "pharmacy" },
    { label: "System", value: "system" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto p-3 border-b bg-white">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => setActiveFilter(filter.value)}
          className={`
            px-3
            py-1.5
            rounded-full
            text-xs
            font-medium
            whitespace-nowrap
            transition
            ${
              activeFilter === filter.value
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default NotificationFilter;
