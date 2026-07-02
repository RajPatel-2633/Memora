import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", resolved: 12 },
  { month: "Feb", resolved: 18 },
  { month: "Mar", resolved: 21 },
  { month: "Apr", resolved: 28 },
  { month: "May", resolved: 34 },
  { month: "Jun", resolved: 39 },
  { month: "Jul", resolved: 47 },
];

export default function BugTrend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Bug Resolution Trend
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          AI-assisted engineering fixes over time.
        </p>
      </div>

      <div className="h-[300px]">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid
              stroke="#30363D"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#161B22",
                border: "1px solid #30363D",
                borderRadius: "10px",
              }}
            />

            <Bar
              dataKey="resolved"
              radius={[8, 8, 0, 0]}
              fill="#2EA043"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-6 flex justify-between">

        <Stat
          title="Resolved"
          value="199"
        />

        <Stat
          title="Avg / Month"
          value="28"
        />

        <Stat
          title="Success Rate"
          value="96%"
        />

      </div>

    </motion.div>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="text-center">

      <p className="text-xs text-gray-500 uppercase">

        {title}

      </p>

      <h3 className="mt-2 text-2xl font-bold">

        {value}

      </h3>

    </div>
  );
}