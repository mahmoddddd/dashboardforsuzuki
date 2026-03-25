"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
  LineChart, Line, Area, AreaChart,
} from "recharts";
import {
  globalSales, regionSales, topModels, egyptModels, categoryDist,
} from "@/lib/data";

const RADIAN = Math.PI / 180;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PieLabel(props: any) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontWeight="bold" fontSize={13}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export function GlobalSalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={globalSales}>
        <defs>
          <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#007BFF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#007BFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="year" tick={{ fontSize: 13 }} />
        <YAxis tick={{ fontSize: 13 }} domain={[2, 3.6]} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          formatter={(value) => [`${value}M وحدة`, "المبيعات"]}
        />
        <Area type="monotone" dataKey="sales" stroke="#007BFF" strokeWidth={3}
          fill="url(#salesGrad)" dot={{ r: 6, fill: "#007BFF", stroke: "#fff", strokeWidth: 2 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RegionPieChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie data={regionSales} cx="50%" cy="50%" innerRadius={70} outerRadius={130}
          dataKey="value" nameKey="name" labelLine={false}
          label={PieLabel} strokeWidth={3} stroke="#fff">
          {regionSales.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}K وحدة`, ""]}
          contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TopModelsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={topModels} layout="vertical" margin={{ left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis type="category" dataKey="model" tick={{ fontSize: 13 }} width={100} />
        <Tooltip formatter={(value) => [`${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} وحدة/شهر`, ""]}
          contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
        <Bar dataKey="sales" radius={[0, 8, 8, 0]} barSize={28}>
          {topModels.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function EgyptPricesChart() {
  const catColorMap: Record<string, string> = {
    Hatchback: "#007BFF", SUV: "#E30013", Sedan: "#00C9A7",
  };
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={egyptModels}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="model" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" height={60} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value) => [`${value}K EGP`, "السعر"]}
          contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
        <Bar dataKey="price" radius={[8, 8, 0, 0]} barSize={36}>
          {egyptModels.map((entry, i) => (
            <Cell key={i} fill={catColorMap[entry.category]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RatingsChart() {
  const getColor = (r: number) => r >= 4.5 ? "#00C9A7" : r >= 4.0 ? "#007BFF" : "#FF8C00";
  const sorted = [...egyptModels].sort((a, b) => b.rating - a.rating);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={sorted} layout="vertical" margin={{ left: 30 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12 }} />
        <YAxis type="category" dataKey="model" tick={{ fontSize: 13 }} width={100} />
        <Tooltip formatter={(value) => [`${value}/5`, "التقييم"]}
          contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
        <Bar dataKey="rating" radius={[0, 8, 8, 0]} barSize={24}>
          {sorted.map((entry, i) => (
            <Cell key={i} fill={getColor(entry.rating)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CategoryPieChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={categoryDist} cx="50%" cy="50%" innerRadius={55} outerRadius={100}
          dataKey="value" nameKey="name" labelLine={false}
          label={PieLabel} strokeWidth={3} stroke="#fff">
          {categoryDist.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
