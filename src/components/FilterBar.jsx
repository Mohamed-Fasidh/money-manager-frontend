export default function FilterBar({
  category,
  division,
  startDate,
  endDate,
  setCategory,
  setDivision,
  setStartDate,
  setEndDate
}) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <select value={division} onChange={(e) => setDivision(e.target.value)}>
        <option value="">All</option>
        <option>Personal</option>
        <option>Office</option>
      </select>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
    </div>
  );
}
