import { useEffect, useState } from "react";

export default function AddModal({
  onSave,
  onClose,
  initialData = null,
  isEdit = false
}) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [division, setDivision] = useState("Personal");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );

  /* ✅ PRELOAD DATA FOR EDIT */
  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setAmount(initialData.amount);
      setCategory(initialData.category);
      setDivision(initialData.division);
      setDescription(initialData.description || "");
      setDateTime(
        new Date(initialData.createdAt).toISOString().slice(0, 16)
      );
    }
  }, [initialData]);

  const handleSave = () => {
    if (!amount || !category) return;

    onSave({
      type,
      amount: Number(amount),
      category,
      division,
      description,
      createdAt: isEdit
        ? initialData.createdAt
        : new Date(dateTime)
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[480px] space-y-5">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800">
            {isEdit ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button onClick={onClose} className="text-slate-500">✕</button>
        </div>

        {/* TABS */}
        <div className="flex gap-3">
          {["income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium ${
                type === t
                  ? t === "income"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {t === "income" ? "Income" : "Expense"}
            </button>
          ))}
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4">
          <Input type="number" placeholder="Amount" value={amount} onChange={setAmount} />
          <Input placeholder="Category" value={category} onChange={setCategory} />

          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="input"
          >
            <option>Personal</option>
            <option>Office</option>
          </select>

          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="input"
            disabled={isEdit}
          />
        </div>

        <textarea
          placeholder="One-line description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full input"
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
          >
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUT */
function Input({ type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    />
  );
}
