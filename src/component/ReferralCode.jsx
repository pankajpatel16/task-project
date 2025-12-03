import React, { useState } from "react";
import CreateReferralModal from "./CreateReferralModal";
import { referralCodes as initialReferralCodes } from "../data/staticData";

const ReferralCode = () => {
  const [referralCodes, setReferralCodes] = useState(initialReferralCodes);
  const [loading] = useState(false);
  const [error] = useState(null);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCode = (newCode) => {
    // Add the new code locally to static state
    setReferralCodes((prev) => [
      ...prev,
      { id: Date.now().toString(36), ...newCode },
    ]);
  };

  // Data is static; no fetch required

  const filtered = referralCodes.filter((r) => {
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      r.code.toLowerCase().includes(q) ||
      r.owner.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q);
    const matchType = filterType === "All Types" || r.type === filterType;
    const matchStatus =
      filterStatus === "All Status" || r.status === filterStatus;
    return matchQuery && matchType && matchStatus;
  });

  const totalCodes = referralCodes.length;
  const activeCodes = referralCodes.filter((r) => r.status === "Active").length;
  const inactiveCodes = referralCodes.filter(
    (r) => r.status === "Inactive"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Referral Code Dashboard
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Referral Code
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-slate-600 text-sm font-medium mb-2">
              Total Referral Codes
            </p>
            <p className="text-4xl font-bold text-slate-800">{totalCodes}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-slate-600 text-sm font-medium mb-2">
              Active Codes
            </p>
            <p className="text-4xl font-bold text-green-600">{activeCodes}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-slate-600 text-sm font-medium mb-2">
              Inactive Codes
            </p>
            <p className="text-4xl font-bold text-red-600">{inactiveCodes}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Referral Codes List
            </h2>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[250px]">
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
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
              >
                <option>All Types</option>
                <option>Percentage</option>
                <option>Fixed</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Type
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">
                    Max
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">
                    Used
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.length > 0 ? (
                  filtered.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href="#"
                          className="text-blue-600 hover:underline font-medium text-sm"
                        >
                          {r.code}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                        {r.owner}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {r.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                        {r.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-700">
                        {r.max}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-700">
                        {r.used}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-medium">
                        {r.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            r.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {r.created}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No referral codes found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CreateReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCode={handleAddCode}
      />
    </div>
  );
};

export default ReferralCode;
