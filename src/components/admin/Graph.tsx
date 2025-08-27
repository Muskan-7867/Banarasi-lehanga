import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Graph = () => {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 text-black">
  

      <ResponsiveContainer width="100%" height={300}>
        <LineChart >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="monthlyUsers"
            stroke="#ffc107"
            strokeWidth={2}
            name="Monthly Users"
          />
          <Line
            type="monotone"
            dataKey="products"
            stroke="#2196f3"
            strokeWidth={2}
            name="Products"
          />
     
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
