import { reportCategories } from "./reportCategories";

const ReportTabs = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex gap-3 flex-wrap mb-6">

      {reportCategories.map((cat) => (
        <button
          key={cat.name}
          onClick={() =>
            setActiveTab(cat.name)
          }
          className={`px-4 py-2 rounded-full border border-gray-200
          ${
            activeTab === cat.name
              ? "bg-purple-600 text-white"
              : "bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            {cat.icon}
            {cat.name}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ReportTabs;