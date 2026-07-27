
// import React, { useState } from "react";
// import {
//   FlaskConical,
//   Search,
//   PlusCircle,
//   Trash2,
//   Edit,
//   DollarSign,
//   Clock,
// } from "lucide-react";

// export default function LabTests() {
//   // Mock Data for Available Lab Tests
//   const [testsList, setTestsList] = useState([
//     {
//       code: "T-CBC",
//       name: "Complete Blood Count (CBC)",
//       category: "Hematology",
//       price: 1200,
//       turnAround: "4 Hours",
//       status: "Active",
//     },
//     {
//       code: "T-LIP",
//       name: "Lipid Profile / Panel",
//       category: "Biochemistry",
//       price: 2500,
//       turnAround: "6 Hours",
//       status: "Active",
//     },
//     {
//       code: "T-THY",
//       name: "Thyroid Profile (T3, T4, TSH)",
//       category: "Endocrinology",
//       price: 3200,
//       turnAround: "12 Hours",
//       status: "Active",
//     },
//     {
//       code: "T-RBS",
//       name: "Random Blood Sugar (RBS)",
//       category: "Biochemistry",
//       price: 300,
//       turnAround: "1 Hour",
//       status: "Active",
//     },
//     {
//       code: "T-LFT",
//       name: "Liver Function Test (LFT)",
//       category: "Biochemistry",
//       price: 2200,
//       turnAround: "8 Hours",
//       status: "Active",
//     },
//   ]);

//   // Form State for Adding New Test
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "Biochemistry",
//     price: "",
//     turnAround: "",
//   });

//   // Search Filter State
//   const [searchTerm, setSearchTerm] = useState("");

//   // Handle Input Changes
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle Form Submit (Add New Test)
//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.price || !formData.turnAround) {
//       alert("Please enter test name, price, and turnaround time!");
//       return;
//     }

//     // Generate random code for test
//     const randomCode = `T-${formData.name
//       .substring(0, 3)
//       .toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;

//     const newTest = {
//       code: randomCode,
//       name: formData.name,
//       category: formData.category,
//       price: parseInt(formData.price),
//       turnAround: formData.turnAround,
//       status: "Active",
//     };

//     setTestsList([newTest, ...testsList]);

//     // Reset Form fields
//     setFormData({
//       name: "",
//       category: "Biochemistry",
//       price: "",
//       turnAround: "",
//     });
//   };

//   // Delete Test Handler
//   const handleDeleteTest = (code) => {
//     if (
//       window.confirm(
//         "Kya aap is test profile ko hamesha ke liye delete karna chahte hain?",
//       )
//     ) {
//       setTestsList(testsList.filter((t) => t.code !== code));
//     }
//   };

//   // Filter List based on Search Term
//   const filteredTests = testsList.filter(
//     (t) =>
//       t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       t.category.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
//       <main className="max-w-7xl mx-auto p-6 lg:p-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">
//           <div>
//             <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
//               Tests Management
//             </h2>

//             <p className="mt-2 text-slate-500">
//               Configure laboratory test menu matrix, pricing, and turnaround
//               setup
//             </p>
//           </div>

//           {/* Search */}
//           <div className="relative w-full md:w-80">
//             <Search
//               size={18}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400"
//             />

//             <input
//               type="text"
//               placeholder="Search test by name, code or category..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full rounded-2xl border border-violet-200 bg-white/80 backdrop-blur-xl py-3 pl-11 pr-4 text-sm text-slate-700 shadow-md outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
//             />
//           </div>
//         </div>

//         {/* Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Form */}
//           <div className="lg:col-span-1 rounded-3xl border border-violet-100 bg-white/80 backdrop-blur-xl p-6 shadow-xl h-fit">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100">
//                 <FlaskConical className="text-violet-600" size={20} />
//               </div>

//               <div>
//                 <h3 className="text-base font-bold text-slate-800">
//                   Add Test Profile
//                 </h3>

//                 <p className="text-xs text-slate-500">
//                   Create laboratory test profile
//                 </p>
//               </div>
//             </div>

//             <form onSubmit={handleFormSubmit} className="space-y-5">
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//                   Test Name
//                 </label>

//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder="e.g. Liver Function Test (LFT)"
//                   className="w-full px-4 py-3 bg-violet-50/60 border border-violet-200 rounded-2xl text-sm font-medium text-slate-700 outline-none transition-all duration-300 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//                   Category Group
//                 </label>

//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 bg-violet-50/60 border border-violet-200 rounded-2xl text-sm font-medium text-slate-700 cursor-pointer outline-none transition-all duration-300 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
//                 >
//                   <option value="Biochemistry">Biochemistry</option>
//                   <option value="Hematology">Hematology</option>
//                   <option value="Microbiology">Microbiology</option>
//                   <option value="Endocrinology">Endocrinology</option>
//                   <option value="Serology">Serology</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//                   Price (Rs.)
//                 </label>

//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-violet-500 font-semibold text-sm">
//                     Rs
//                   </span>

//                   <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     placeholder="e.g. 1500"
//                     className="w-full pl-11 pr-4 py-3 bg-violet-50/60 border border-violet-200 rounded-2xl text-sm font-medium text-slate-700 outline-none transition-all duration-300 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//                   Turnaround Time (TAT)
//                 </label>

//                 <input
//                   type="text"
//                   name="turnAround"
//                   value={formData.turnAround}
//                   onChange={handleInputChange}
//                   placeholder="e.g. 3 Hours, 12 Hours"
//                   className="w-full px-4 py-3 bg-violet-50/60 border border-violet-200 rounded-2xl text-sm font-medium text-slate-700 outline-none transition-all duration-300 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 py-3 px-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
//               >
//                 <PlusCircle size={16} />
//                 <span>Create Test Profile</span>
//               </button>
//             </form>
//           </div>

//           {/* Right Column: Active Laboratory Test Menu Table */}
//           <div className="lg:col-span-2 rounded-3xl border border-violet-100 bg-white/80 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col justify-between">
//             <div>
//               <div className="p-5 bg-gradient-to-r from-violet-50 to-fuchsia-50 border-b border-violet-100 flex justify-between items-center">
//                 <h3 className="text-sm font-bold text-slate-800">
//                   Active Lab Menu Pricing ({filteredTests.length})
//                 </h3>

//                 <span className="text-[10px] bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-violet-200">
//                   Live Catalog
//                 </span>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-violet-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-violet-100">
//                       <th className="p-4 pl-6">Code</th>

//                       <th className="p-4">Test Specification</th>

//                       <th className="p-4">Rate / Cost</th>

//                       <th className="p-4">TAT (Reporting)</th>

//                       <th className="p-4 text-center pr-6">Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-violet-100 text-sm text-slate-700">
//                     {filteredTests.length === 0 ? (
//                       <tr>
//                         <td
//                           colSpan="5"
//                           className="py-10 text-center text-slate-400 font-medium"
//                         >
//                           Koi test catalogue match nahi mila.
//                         </td>
//                       </tr>
//                     ) : (
//                       filteredTests.map((test) => (
//                         <tr
//                           key={test.code}
//                           className="hover:bg-violet-50/70 transition-all duration-300"
//                         >
//                           <td className="p-4 pl-6">
//                             <span className="font-mono font-bold text-violet-700">
//                               {test.code}
//                             </span>
//                           </td>

//                           <td className="p-4">
//                             <div>
//                               <span className="block text-[13px] font-bold text-slate-800">
//                                 {test.name}
//                               </span>

//                               <span className="mt-1 inline-block rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700 border border-violet-200">
//                                 {test.category}
//                               </span>
//                             </div>
//                           </td>

//                           <td className="p-4">
//                             <div className="flex items-center gap-1 font-bold text-slate-800">
//                               <DollarSign
//                                 size={14}
//                                 className="text-violet-500"
//                               />
//                               <span>{test.price.toLocaleString()}</span>
//                             </div>
//                           </td>

//                           <td className="p-4">
//                             <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-700">
//                               <Clock size={13} className="mr-1" />
//                               {test.turnAround}
//                             </span>
//                           </td>

//                           <td className="p-4 text-center">
//                             <div className="flex items-center justify-center gap-2">
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   alert(
//                                     `Edit config options for ${test.code} coming soon!`,
//                                   )
//                                 }
//                                 className="rounded-xl p-2 text-violet-600 hover:bg-violet-100 transition-all duration-300"
//                               >
//                                 <Edit size={15} />
//                               </button>

//                               <button
//                                 type="button"
//                                 onClick={() => handleDeleteTest(test.code)}
//                                 className="rounded-xl p-2 text-red-500 hover:bg-red-100 transition-all duration-300"
//                               >
//                                 <Trash2 size={15} />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//             {/* Catalog Meta Info Card Footer */}
//             <div className="px-6 py-4 border-t border-violet-100 bg-gradient-to-r from-violet-50 via-white to-fuchsia-50 flex justify-between items-center">
//               <span className="text-xs font-medium text-slate-500">
//                 CareScynify Laboratory Inventory Module v1.0
//               </span>

//               <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-[11px] font-semibold border border-violet-200">
//                 Laboratory Management
//               </span>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import React, { useState } from "react";

import LabTestsHeader from "../../components/laboratory/labTests/LabTestsHeader";
import LabTestForm from "../../components/laboratory/labTests/LabTestForm";
import LabTestsTable from "../../components/laboratory/labTests/LabTestsTable";

export default function LabTests() {
  // Mock Data for Available Lab Tests
  const [testsList, setTestsList] = useState([
    {
      code: "T-CBC",
      name: "Complete Blood Count (CBC)",
      category: "Hematology",
      price: 1200,
      turnAround: "4 Hours",
      status: "Active",
    },
    {
      code: "T-LIP",
      name: "Lipid Profile / Panel",
      category: "Biochemistry",
      price: 2500,
      turnAround: "6 Hours",
      status: "Active",
    },
    {
      code: "T-THY",
      name: "Thyroid Profile (T3, T4, TSH)",
      category: "Endocrinology",
      price: 3200,
      turnAround: "12 Hours",
      status: "Active",
    },
    {
      code: "T-RBS",
      name: "Random Blood Sugar (RBS)",
      category: "Biochemistry",
      price: 300,
      turnAround: "1 Hour",
      status: "Active",
    },
    {
      code: "T-LFT",
      name: "Liver Function Test (LFT)",
      category: "Biochemistry",
      price: 2200,
      turnAround: "8 Hours",
      status: "Active",
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "Biochemistry",
    price: "",
    turnAround: "",
  });

  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Test
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.turnAround) {
      alert("Please enter test name, price, and turnaround time!");
      return;
    }

    const randomCode = `T-${formData.name
      .substring(0, 3)
      .toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;

    const newTest = {
      code: randomCode,
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      turnAround: formData.turnAround,
      status: "Active",
    };

    setTestsList([newTest, ...testsList]);

    setFormData({
      name: "",
      category: "Biochemistry",
      price: "",
      turnAround: "",
    });
  };

  // Delete Test
  const handleDeleteTest = (code) => {
    if (
      window.confirm(
        "Kya aap is test profile ko hamesha ke liye delete karna chahte hain?"
      )
    ) {
      setTestsList(testsList.filter((t) => t.code !== code));
    }
  };

  // Search Filter
  const filteredTests = testsList.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-fuchsia-50">
      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        <LabTestsHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <LabTestForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />

          <LabTestsTable
            filteredTests={filteredTests}
            handleDeleteTest={handleDeleteTest}
          />
        </div>
      </main>
    </div>
  );
}