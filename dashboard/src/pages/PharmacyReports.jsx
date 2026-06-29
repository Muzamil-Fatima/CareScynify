import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaFileDownload,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
// Libraries import kiye PDF download karne ke liye
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
  { name: "May", sales: 6000 },
];

const PharmacyReports = () => {
  const [showAll, setShowAll] = useState(false);

  const allTransactions = [
    {
      id: 1,
      order: "Order #1201",
      date: "14 May 2026, 10:30 PM",
      amount: "+$120.00",
    },
    {
      id: 2,
      order: "Order #1202",
      date: "14 May 2026, 11:15 PM",
      amount: "+$45.00",
    },
    {
      id: 3,
      order: "Order #1203",
      date: "15 May 2026, 09:00 AM",
      amount: "+$250.00",
    },
    {
      id: 4,
      order: "Order #1204",
      date: "15 May 2026, 01:45 PM",
      amount: "+$85.00",
    },
    {
      id: 5,
      order: "Order #1205",
      date: "16 May 2026, 04:20 PM",
      amount: "+$310.00",
    },
  ];

  const displayedTransactions = showAll
    ? allTransactions
    : allTransactions.slice(0, 3);

  // PDF generate karne wala main function
  const exportPDF = () => {
    const input = document.getElementById("reports-page");
    const button = document.getElementById("pdf-btn");

    // Download karte waqt button ko chupayenge taake PDF mein button na aaye
    if (button) button.style.display = "none";

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 size width
      const pageHeight = 295; // A4 size height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Pharmacy_Business_Report.pdf");
      // PDF save hone ke baad button wapas show ho jayega
      if (button) button.style.display = "flex";
    });
  };

  return (
    <div id="reports-page" className="p-8 bg-[#f8f9fe] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-black text-blue-950">
            Business Reports
          </h1>
          <p className="text-gray-500 font-medium">
            Analyze your pharmacy's growth and sales
          </p>
        </div>
        <button
          id="pdf-btn"
          onClick={exportPDF}
          className="bg-blue-950 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-900 transition-all shadow-lg"
        >
          <FaFileDownload /> EXPORT PDF
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-4xl shadow-sm border border-gray-100">
          <p className="text-xs font-black text-gray-400 uppercase">
            Monthly Revenue
          </p>
          <div className="flex items-center gap-3 mt-2">
            <h2 className="text-3xl font-black text-blue-950">$24,500</h2>
            <span className="text-emerald-500 flex items-center font-bold text-sm">
              <FaArrowUp /> 12%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-4xl shadow-sm border border-gray-100">
          <p className="text-xs font-black text-gray-400 uppercase">
            Avg. Sale Value
          </p>
          <div className="flex items-center gap-3 mt-2">
            <h2 className="text-3xl font-black text-blue-950">$450</h2>
            <span className="text-red-500 flex items-center font-bold text-sm">
              <FaArrowDown /> 3%
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-4xl shadow-sm border border-gray-100">
          <p className="text-xs font-black text-gray-400 uppercase">
            Total Transactions
          </p>
          <h2 className="text-3xl font-black text-blue-950 mt-2">1,284</h2>
        </div>
      </div>

      {/* Sales Growth Chart */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl mb-8 border border-white">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-950">
          <FaChartLine className="text-blue-600" /> Sales Growth Trend
        </h3>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontWeight: "bold" }}
              />
              <YAxis hide />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#2563eb"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-black text-blue-950">Recent Transactions</h3>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 font-black text-sm hover:text-blue-800 transition-colors bg-transparent border-none cursor-pointer"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
        <table className="w-full">
          <tbody className="divide-y divide-gray-50">
            {displayedTransactions.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 pl-8">
                  <div className="font-bold text-gray-800">{item.order}</div>
                  <div className="text-xs text-gray-400">{item.date}</div>
                </td>
                <td className="p-4 text-emerald-600 font-black">
                  {item.amount}
                </td>
                <td className="p-4 pr-8 text-right">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold uppercase">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacyReports;