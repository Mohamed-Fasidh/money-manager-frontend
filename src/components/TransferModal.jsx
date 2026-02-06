import { useState } from "react";
import axios from "axios";

export default function TransferModal({ onClose }) {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const handleTransfer = async () => {
    if (!fromAccount || !toAccount || !amount) {
      alert("All fields are required");
      return;
    }

    if (fromAccount === toAccount) {
      alert("From and To accounts cannot be same");
      return;
    }

    try {
      await axios.post(`${API}/api/transactions/transfer`, {
        fromAccount,
        toAccount,
        amount: Number(amount),
        date: new Date(),
      });

      onClose();
      window.location.reload(); // refresh dashboard
    } catch (err) {
      console.error(err);
      alert("Transfer failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="font-semibold text-lg">Account Transfer</h2>

        <select
          className="w-full border p-2 rounded"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
        >
          <option value="">From Account</option>
          <option value="Cash">Cash</option>
          <option value="Bank">Bank</option>
        </select>

        <select
          className="w-full border p-2 rounded"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
        >
          <option value="">To Account</option>
          <option value="Cash">Cash</option>
          <option value="Bank">Bank</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          className="w-full border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleTransfer}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
