const AppointmentTabs = ({ active, setActive }) => {
  const tabs = ["all", "doctor", "lab", "pharmacy", "hospital"];

  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 rounded-xl capitalize ${
            active === tab
              ? "bg-purple-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default AppointmentTabs;