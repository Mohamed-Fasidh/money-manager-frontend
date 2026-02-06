import AddModal from "./AddModal";

export default function EditModal({ transaction, onSave, onClose }) {
  const hoursPassed =
    (Date.now() - new Date(transaction.createdAt)) /
    (1000 * 60 * 60);

  if (hoursPassed > 12) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-sm text-center">
          <p className="text-red-600 font-medium">
            Editing time expired (12 hours)
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-slate-200 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <AddModal
      initialData={transaction}
      onSave={(data) => onSave(transaction._id, data)}
      onClose={onClose}
      isEdit
    />
  );
}
