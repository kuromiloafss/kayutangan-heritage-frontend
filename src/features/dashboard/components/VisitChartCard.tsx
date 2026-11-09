
"use client";

import React, { useMemo } from "react";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,} from "recharts";

interface VisitChartCardProps {
  startDate?: string;
  endDate?: string;
}

const formatLabel = (date: Date) =>
  date.toLocaleDateString("id-ID", {
    weekday: "short",
  });

export default function VisitChartCard({
  startDate,
  endDate,
}: VisitChartCardProps) {
  const data = useMemo(() => {
    if (!startDate || !endDate) return [];

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      start > end
    ) {
      return [];
    }

    const result = [];
    const current = new Date(start);
    let index = 0;

    while (current <= end && index < 366) {
      result.push({
        tanggal: formatLabel(current),
        kunjungan: 20 + ((index * 17 + 31) % 70),
      });

      current.setDate(current.getDate() + 1);
      index++;
    }

    return result;
  }, [startDate, endDate]);

  return (
    <article className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <header className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-[#34402c]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 19V5m0 14h16M7 14l4-4 3 2 5-6"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#34402c]">
            Grafik Kunjungan
          </h2>
          <p className="text-[11px] text-neutral-400 mt-1">
            Total kunjungan wisatawan dalam periode yang dipilih.
          </p>
        </div>
      </header>

      {/* Line Chart */}
      <div className="h-44 w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: -15,
                bottom: 0,
              }}
            >
              <CartesianGrid
                stroke="#E5E7EB"
                strokeDasharray="2 3"
                vertical={true}
              />

              <XAxis
                dataKey="tanggal"
                tick={{ fontSize: 9, fill: "#737373" }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tick={{ fontSize: 9, fill: "#737373" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                  fontSize: "11px",
                }}
                formatter={(value) => [value, "Kunjungan"]}
                labelFormatter={(label) => `Hari: ${label}`}
              />

              <Line
                type="monotone"
                dataKey="kunjungan"
                name="Kunjungan"
                stroke="#71864F"
                strokeWidth={1.8}
                dot={{
                  r: 2,
                  fill: "#71864F",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 4,
                  fill: "#71864F",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-neutral-400">
            Tidak ada data pada periode ini.
          </div>
        )}
      </div>
    </article>
  );
}
