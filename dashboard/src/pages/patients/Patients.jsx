import { useEffect, useState } from "react";
import Search from "../../components/SearchBox";
import { FaPaperPlane, FaTrash, FaUsers, FaChevronUp } from "react-icons/fa";

const Patients = () => {
  const [clients, setClients] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(clients.length / rowsPerPage);

  // Paginate data
  const paginatedClients = clients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:3000/clients")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients: ", error));
  }, []);

  return (
    <div className="font-secondary font-medium text-[13px] mr-4">
      <h2 className="font-bold text-[40px] mt-2 text-gray-900">Patients</h2>

      <Search />

      <div className="mt-2 border border-gray-300/30 rounded-[15px] bg-white shadow-sm">
        {/* Header */}
        <div className="flex py-2 px-2 items-center justify-between border-b border-gray-300/30">
          <div className="text-[16px] font-semibold text-gray-800">
            All Clients
          </div>
          <div className="flex gap-3 items-center justify-end">
            <button className="flex items-center justify-center px-3 w-33 h-8.5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white gap-1.5 transition">
              Send Email <FaPaperPlane className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center px-3 w-8.5 h-8.5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300/30 transition">
              <FaTrash className="w-4 h-4" />
            </button>
            <p className="text-[14px] text-gray-600">
              1-10 <span className="opacity-50">of {clients.length}</span>
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-gray-700">
            <thead>
              <tr className="border-b border-gray-300/30">
                {["ID", "Name", "Email", "Sessions", "Classes", "Status"].map(
                  (title) => (
                    <th key={title} className="px-4 py-3 text-left">
                      <div className="flex items-center gap-1">
                        {title === "ID" && (
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-indigo-500 border border-indigo-500 rounded focus:ring-indigo-500/20"
                          />
                        )}
                        {title} <FaUsers className="w-3 h-3 text-gray-400" />
                      </div>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedClients.map((client, index) => (
                <tr
                  key={client.id}
                  className={`text-[13px] font-medium ${
                    index % 2 !== 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-indigo-500 border border-gray-300 rounded focus:ring-indigo-500/20 mr-2"
                    />
                    {client.id}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={client.profile}
                      alt={client.name}
                      className="w-6 h-6 rounded-full"
                    />
                    {client.name}
                  </td>
                  <td className="px-4 py-3">{client.email}</td>
                  <td className="px-4 py-3">{client.sessions}</td>
                  <td className="px-4 py-3">{client.classes}</td>
                  <td className="px-4 py-3">
                    <button className="w-17 h-6 rounded-full text-green-600 bg-green-100 border border-green-400 text-sm">
                      {client.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 mb-6 flex justify-between items-center text-gray-700">
        <p>
          {(currentPage - 1) * rowsPerPage + 1}-
          {Math.min(currentPage * rowsPerPage, clients.length)} of{" "}
          {clients.length}
        </p>

        <div className="flex items-center gap-4">
          <p>
            Rows per Page:
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="ml-1.5 bg-gray-100 h-6.5 w-12.5 border border-gray-300 rounded px-1 text-gray-700"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </p>

          <div className="flex gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition ${
                currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <FaChevronUp className="rotate-180" />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              }`}
            >
              <FaChevronUp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Patients;
