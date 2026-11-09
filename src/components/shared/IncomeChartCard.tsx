
"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface IncomeChartCardProps {
  startDate?: string;
  endDate?: string;
}

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const formatLabel = (date: Date) =>
  date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
  });

export default function IncomeChartCard({
  startDate,
  endDate,
}: IncomeChartCardProps) {
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
        warlok: 500000 + ((index * 137000) % 600000),
        turis: 200000 + ((index * 97000) % 400000),
      });

      current.setDate(current.getDate() + 1);
      index++;
    }

    return result;
  }, [startDate, endDate]);

  const periodLabel =
    startDate && endDate
      ? `${startDate} - ${endDate}`
      : "Pilih periode";

  return (
    <article className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]">
      <header className="mb-4">
        <h2 className="text-sm font-bold text-neutral-800">
          Laporan Pendapatan
        </h2>

        <p className="text-[11px] text-neutral-400">
          Perbandingan pendapatan Warlok dan Turis.
        </p>

        <p className="text-[10px] text-neutral-400 mt-1">
          Periode: {periodLabel}
        </p>
      </header>

      <div className="h-44 w-full">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 5, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eeeeee"
              />

              <XAxis
                dataKey="tanggal"
                tick={{ fontSize: 9, fill: "#888888" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />

              <YAxis
                tickFormatter={(value) => `${value / 1000000} jt`}
                tick={{ fontSize: 9, fill: "#888888" }}
                axisLine={false}
                tickLine={false}
                width={35}
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
                wrapperStyle={{
                  fontSize: "10px",
                  paddingTop: "8px",
                }}
              />

              <Line
                type="monotone"
                dataKey="warlok"
                name="Warlok"
                stroke="#7772E8"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="turis"
                name="Turis"
                stroke="#50C5B5"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-neutral-400">
            Tidak ada periode tanggal yang valid.
          </div>
        )}
      </div>
    </article>
  );
}
