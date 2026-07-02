import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Concepts",
    value: 38,
    color: "#2EA043",
  },
  {
    name: "Files",
    value: 24,
    color: "#3B82F6",
  },
  {
    name: "Architecture",
    value: 18,
    color: "#8B5CF6",
  },
  {
    name: "Bugs",
    value: 12,
    color: "#EF4444",
  },
  {
    name: "APIs",
    value: 8,
    color: "#F59E0B",
  },
];

export default function MemoryDistribution() {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 h-full">

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Memory Distribution
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Types of engineering knowledge stored.
        </p>

      </div>

      <div className="h-[260px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#161B22",
                border: "1px solid #30363D",
                borderRadius: "12px",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="space-y-4 mt-2">

        {data.map((item) => (

          <div
            key={item.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <span
                className="w-3 h-3 rounded-full"
                style={{
                  background: item.color,
                }}
              />

              <span className="text-sm text-gray-300">

                {item.name}

              </span>

            </div>

            <span className="text-sm font-semibold">

              {item.value}%

            </span>

          </div>

        ))}

      </div>

    </div>
  );
}