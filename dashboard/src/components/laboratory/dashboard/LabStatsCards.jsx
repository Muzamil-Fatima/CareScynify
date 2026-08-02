import React from "react";
import { FlaskConical, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import useLabDashboard from "../../../hooks/laboratory/useLabDashboard";

const LabStatsCards = () => {
  const { stats } = useLabDashboard();

  const cards = [
    {
      title: "Pending Samples",
      value: stats?.pendingTests || 0,
      icon: Clock,
      color: "text-yellow-600",
    },

    {
      title: "Completed Samples",
      value: stats?.completedTests || 0,
      icon: CheckCircle,
      color: "text-green-600",
    },

    {
      title: "Urgent Cases",
      value: stats?.urgentCases || 0,
      icon: AlertTriangle,
      color: "text-red-600",
    },

    {
      title: "Total Samples",
      value: stats?.totalSamples || 0,
      icon: FlaskConical,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((item,index)=>{

        const Icon=item.icon;

        return(
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <div className="flex justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {item.value}
                </h2>
              </div>


              <Icon 
                className={item.color}
                size={35}
              />

            </div>
          </div>
        )
      })}
    </div>
  );
};

export default LabStatsCards;