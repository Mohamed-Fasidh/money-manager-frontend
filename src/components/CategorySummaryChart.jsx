import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategorySummaryChart() {
  const [data, setData] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/reports/category-summary`)
      .then((res) =>
        setData(
          res.data.map((c) => ({
            name: c._id,
            value: c.expense || c.income
          }))
        )
      );
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl">
      <h3 className="font-semibold mb-4">Category Summary</h3>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" label>
          {data.map((_, i) => (
            <Cell key={i} fill={["#ef4444", "#22c55e", "#6366f1", "#f59e0b"][i % 4]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
