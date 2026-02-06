export default function TransactionItem({ t, onEdit }) {
  const hours =
    (Date.now() - new Date(t.createdAt)) / (1000 * 60 * 60);

  return (
    <div className="flex justify-between">
      <div>{t.category}</div>
      {hours <= 12 && (
        <button onClick={() => onEdit(t)} className="text-indigo-600">
          Edit
        </button>
      )}
    </div>
  );
}
