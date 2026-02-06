import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
import CategorySummaryChart from "../components/CategorySummaryChart";
import FilterBar from "../components/FilterBar";
import DateRangeFilter from "../components/DateRangeFilter";
import ReportSelector from "../components/ReportSelector";
import TransferModal from "../components/TransferModal";
import AccountSummary from "../components/AccountSummary";

export default function App() {
  const API = import.meta.env.VITE_API_URL;
  const [transactions, setTransactions] = useState([]);
  const [reportType, setReportType] = useState("monthly");
  const [reportData, setReportData] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [showTransfer, setShowTransfer] = useState(false);

  const [category, setCategory] = useState("");
  const [division, setDivision] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* ================= LOAD TRANSACTIONS ================= */
  const loadTransactions = async () => {
    const res = await axios.get(`${API}/api/transactions`);
    setTransactions(res.data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  /* ================= LOAD REPORT ================= */
  useEffect(() => {
    axios
      .get(`${API}/api/reports/${reportType}`)
      .then((res) => setReportData(res.data));
  }, [reportType]);

  /* ================= SUMMARY FROM REPORT ================= */
  const summary = useMemo(() => {
    const income = reportData.reduce((s, r) => s + r.income, 0);
    const expense = reportData.reduce((s, r) => s + r.expense, 0);
    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [reportData]);

  /* ================= FILTER TRANSACTIONS ================= */
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (category && !t.category.toLowerCase().includes(category.toLowerCase()))
        return false;
      if (division && t.division !== division) return false;
      if (startDate && new Date(t.createdAt) < new Date(startDate)) return false;
      if (endDate && new Date(t.createdAt) > new Date(endDate)) return false;
      return true;
    });
  }, [transactions, category, division, startDate, endDate]);

  /* ================= CRUD ================= */
  const addTransaction = async (data) => {
    await axios.post(`${API}/api/transactions`, data);
    loadTransactions();
    setShowAddModal(false);
  };

  const updateTransaction = async (id, data) => {
    await axios.put(`${API}/api/transactions/${id}`, data);
    loadTransactions();
    setEditTransaction(null);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto p-6 space-y-8">

        <h1 className="text-4xl font-bold">Money Manager</h1>

        {/* REPORT DROPDOWN */}
        <ReportSelector value={reportType} onChange={setReportType} />

        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-4">
          <Card title="Income" value={summary.income} color="green" />
          <Card title="Expense" value={summary.expense} color="red" />
          <Card title="Balance" value={summary.balance} color="indigo" />
        </div>
        {/* ACCOUNT SUMMARY */}
<AccountSummary transactions={transactions} />


        {/* FILTERS */}
        <FilterBar
          category={category}
          division={division}
          startDate={startDate}
          endDate={endDate}
          setCategory={setCategory}
          setDivision={setDivision}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <DateRangeFilter
          onApply={(s, e) => {
            setStartDate(s);
            setEndDate(e);
          }}
        />

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            + Add Transaction
          </button>
          <button onClick={() => setShowTransfer(true)} className="btn-secondary">
            Transfer
          </button>
        </div>

        {/* TRANSACTION HISTORY */}
        <ul className="bg-white rounded-xl divide-y">
          {filteredTransactions.map((t) => {
            const canEdit =
              (Date.now() - new Date(t.createdAt)) / 36e5 <= 12;

            return (
              <li key={t._id} className="p-4 flex justify-between">
                <div>
                  <p className="font-semibold">{t.category}</p>
                  <p className="text-sm text-slate-500">
                    {t.division} • {new Date(t.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span
                    className={
                      t.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {t.type === "expense" ? "-" : "+"}₹{t.amount}
                  </span>
                  {canEdit && (
                    <button
                      onClick={() => setEditTransaction(t)}
                      className="text-indigo-600"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* CATEGORY SUMMARY */}
        <CategorySummaryChart />

      </div>

      {showAddModal && (
        <AddModal onSave={addTransaction} onClose={() => setShowAddModal(false)} />
      )}

      {editTransaction && (
        <EditModal
          transaction={editTransaction}
          onSave={updateTransaction}
          onClose={() => setEditTransaction(null)}
        />
      )}

      {showTransfer && (
        <TransferModal onClose={() => setShowTransfer(false)} />
      )}
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl">
      <p className="text-sm">{title}</p>
      <p className={`text-2xl text-${color}-600`}>₹{value}</p>
    </div>
  );
}
