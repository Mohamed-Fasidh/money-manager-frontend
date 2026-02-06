import { canEditTransaction } from "../utils/time";

export default function TransactionList({ transactions, onEdit }) {
  return (
    <ul className="divide-y max-h-[300px] overflow-y-auto">
      {transactions.map((t) => (
        <li key={t._id} className="flex justify-between py-4">
          <div>
            <p className="font-medium">{t.category}</p>
            <p className="text-sm text-slate-500">
              {t.division} • {new Date(t.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={t.type === "income" ? "text-green-600" : "text-red-600"}>
              {t.type === "income" ? "+" : "-"}₹{t.amount}
            </span>

            {canEditTransaction(t.createdAt) && (
              <button
                onClick={() => onEdit(t)}
                className="text-indigo-600 text-sm"
              >
                Edit
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
