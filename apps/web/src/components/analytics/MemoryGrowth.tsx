import {ResponsiveContainer,LineChart, Line, XAxis, YAxis,CartesianGrid,Tooltip,} from "recharts";

const data = [
  { month: "Jan", memories: 120, bugs: 30, adrs: 8, commits: 180 },
  { month: "Feb", memories: 210, bugs: 42, adrs: 11, commits: 260 },
  { month: "Mar", memories: 320, bugs: 54, adrs: 14, commits: 390 },
  { month: "Apr", memories: 460, bugs: 71, adrs: 18, commits: 520 },
  { month: "May", memories: 690, bugs: 93, adrs: 24, commits: 760 },
  { month: "Jun", memories: 910, bugs: 118, adrs: 31, commits: 1010 },
  { month: "Jul", memories: 1220, bugs: 146, adrs: 39, commits: 1310 },
];

export default function MemoryGrowth() {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold">
            Memory Growth
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Engineering knowledge accumulated over time
          </p>

        </div>

        <div className="flex gap-5 text-sm">

          <Legend color="#2EA043" label="Memories" />

          <Legend color="#ef4444" label="Bugs" />

          <Legend color="#8b5cf6" label="ADRs" />

          <Legend color="#64748b" label="Commits" />

        </div>

      </div>

      <div className="h-[340px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              stroke="#30363D"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#161B22",
                border: "1px solid #30363D",
                borderRadius: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="memories"
              stroke="#2EA043"
              strokeWidth={4}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="bugs"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="adrs"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="commits"
              stroke="#64748b"
              strokeWidth={2}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-3 h-3 rounded-full"
        style={{ background: color }}
      />
      <span className="text-gray-400">{label}</span>
    </div>
  );
}