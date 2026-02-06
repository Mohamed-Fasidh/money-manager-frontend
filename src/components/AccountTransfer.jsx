import { useState } from "react";
import axios from "axios";

export default function AccountTransfer() {
  const [from, setFrom] = useState("Cash");
  const [to, setTo] = useState("Bank");
  const [amount, setAmount] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const transfer = async () => {
    await axios.post(`${API}/api/accounts/transfer`, {
      from,
      to,
      amount: Number(amount)
    });
    alert("Transfer successful");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
      <h2 className="text-lg font-semibold">
        Account Transfer
      </h2>

      <select onChange={(e) => setFrom(e.target.value)}>
        <option>Cash</option>
        <option>Bank</option>
      </select>

      <select onChange={(e) => setTo(e.target.value)}>
        <option>Bank</option>
        <option>Cash</option>
      </select>

      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded-lg px-3 py-2"
      />

      <button
        onClick={transfer}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        Transfer
      </button>
    </div>
  );
}
