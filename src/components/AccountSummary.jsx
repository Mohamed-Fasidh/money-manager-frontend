export default function AccountSummary({ transactions }) {
  const accounts = ["Cash", "Bank"];

  const balances = accounts.map((account) => {
    const income = transactions
      .filter(t => t.account === account && t.type === "income")
      .reduce((s, t) => s + t.amount, 0);

    const expense = transactions
      .filter(t => t.account === account && t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);

    return {
      account,
      balance: income - expense,
    };
  });

  return (
    <div className="bg-white rounded-xl p-4">
      <h2 className="font-semibold text-lg mb-3">Account Balances</h2>

      <div className="grid grid-cols-2 gap-4">
        {balances.map((a) => (
          <div key={a.account} className="border rounded-lg p-3">
            <p className="text-sm text-slate-500">{a.account}</p>
            <p
              className={`text-xl font-semibold ${
                a.balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹{a.balance}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
