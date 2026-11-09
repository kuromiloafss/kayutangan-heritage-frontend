
"use client";

import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from "recharts";

const data = [
  { tanggal: "11 Sen", warlok: 80, turis: 20 },
  { tanggal: "12 Sel", warlok: 85, turis: 30 },
  { tanggal: "13 Rab", warlok: 90, turis: 50 },
  { tanggal: "14 Kam", warlok: 80, turis: 40 },
  { tanggal: "15 Jum", warlok: 95, turis: 40 },
  { tanggal: "16 Sab", warlok: 75, turis: 30 },
  { tanggal: "17 Min", warlok: 100, turis: 50 },
];

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function RevenueChart() {
  return (
    <div className="w-full h-[220px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#eeeeee"
          />

          <XAxis
            dataKey="tanggal"
            tick={{ fontSize: 10, fill: "#888888" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: "#888888" }}
            axisLine={false}
            tickLine={false}
            width={30}
          />

          <Tooltip
            formatter={(value) => formatRupiah(Number(value))}
            contentStyle={{
              borderRadius: "10px",
              border: "1px solid #eeeeee",
              fontSize: "11px",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }}
          />

          <Line
            type="monotone"
            dataKey="warlok"
            name="Warlok"
            stroke="#7772E8"
            strokeWidth={2}
            dot={{ r: 2, fill: "#7772E8" }}
            activeDot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="turis"
            name="Turis"
            stroke="#50C5B5"
            strokeWidth={2}
            dot={{ r: 2, fill: "#50C5B5" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
