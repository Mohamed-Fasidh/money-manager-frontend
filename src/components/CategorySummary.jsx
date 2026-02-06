export default function CategorySummary({ data }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">Category Summary</h3>
      {data.map((c, i) => (
        <div key={i} className="flex justify-between py-2 border-b">
          <span>{c._id || "Others"}</span>
          <span className="font-medium">
            +₹{c.income || 0} / -₹{c.expense || 0}
          </span>
        </div>
      ))}
    </div>
  );
}
