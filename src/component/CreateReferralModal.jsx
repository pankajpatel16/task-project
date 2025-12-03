import React, { useCallback, useState } from "react";

const initialState = {
  owner: "",
  email: "",
  type: "Teacher",
  max: "5",
  amount: "0",
};

const CreateReferralModal = ({ isOpen, onClose, onAddCode }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => setFormData(initialState), []);

  const generateCode = useCallback(() => {
    return `REF-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
  }, []);

  const formatDate = useCallback((date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { owner, email, type, max, amount } = formData;

      if (!owner.trim() || !email.trim() || !type || !max || !amount) {
        alert(
          "Please complete all required fields: owner, email, type, max, amount."
        );
        return;
      }

      const payload = {
        ...formData,
        code: generateCode(),
        created: formatDate(new Date()),
      };

      onAddCode?.(payload);
      onClose?.();
      resetForm();
    },
    [formData, onAddCode, onClose, resetForm, generateCode, formatDate]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-hidden={false}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onClose && onClose()}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Create Referral Code"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow-xl w-[50vw] max-w-[95vw] max-h-[90vh] overflow-auto"
      >
        <header className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-slate-800">
            Create Referral Code
          </h3>
          <button
            type="button"
            onClick={() => onClose && onClose()}
            aria-label="Close modal"
            className="text-slate-600 hover:text-slate-900 text-2xl leading-none"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Owner Name
              </label>
              <input
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="Full name"
                className="block w-full px-3 py-2 border rounded-md border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Owner Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="owner@example.com"
                className="block w-full px-3 py-2 border rounded-md border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                owner Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Percentage">Teacher</option>
                <option value="Fixed">Student</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Max Uses
              </label>
              <input
                name="max"
                type="number"
                min="5"
                value={formData.max}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Redeemable Amount
              </label>
              <input
                name="amount"
                type="number"
                min="0"
                value={formData.amount}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Generate Referral Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReferralModal;
