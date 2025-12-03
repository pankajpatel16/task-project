import axios from "axios";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";

const Table = () => {
  const [query, setQuery] = useState("");
  const [data, setdata] = useState([]);

  async function registeredUsersdata() {
    let response = await axios.get("http://localhost:8080/registeredUsers");
    setdata(response.data);
  }

  useEffect(() => {
    const fatchdata = async () => {
      await registeredUsersdata();
    };
    fatchdata();
  }, []);

  const filtered = data.filter((u) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (u.name || "-").toLowerCase().includes(q) ||
      (u.email || "-").toLowerCase().includes(q) ||
      (u.city || "-")?.toLowerCase().includes(q) ||
      (u.state || "-")?.toLowerCase().includes(q)
    );
  });
  return (
    <div className="w-screen mx-auto px-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Registered Users{" "}
              <span className="text-base font-normal text-slate-500">
                ({data.length})
              </span>
            </h2>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium shadow">
              showing result {filtered.length} of {data.length}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                />
              </svg>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow flex items-center gap-2">
              <FiDownload />
              Export excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  City
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  State
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filtered.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 font-medium">
                    {u.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {u.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {u.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {u.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {u.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
