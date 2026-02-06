import axios from "axios";

export default function ReportDropdown({ setReport }) {
  const API = import.meta.env.VITE_API_URL;
  const fetchReport = async (type) => {
    const res = await axios.get(`${API}/api/reports/${type}`);
    setReport(res.data);
  };

  return (
    <select onChange={(e) => fetchReport(e.target.value)}>
      <option value="">Select View</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  );
}
