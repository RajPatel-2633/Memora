import { motion } from "framer-motion";
import {
  FolderGit2,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

const repositories = [
  {
    name: "memora-web",
    description: "React + TypeScript Frontend",
    coverage: 94,
    health: "Excellent",
    risk: "Low",
    files: 482,
    memories: 824,
    bugs: 18,
    adrs: 9,
  },
  {
    name: "memora-api",
    description: "Express Backend",
    coverage: 87,
    health: "Good",
    risk: "Medium",
    files: 623,
    memories: 1031,
    bugs: 31,
    adrs: 12,
  },
  {
    name: "memora-ai",
    description: "FastAPI + Cognee",
    coverage: 73,
    health: "Needs Attention",
    risk: "High",
    files: 284,
    memories: 412,
    bugs: 26,
    adrs: 6,
  },
];

function HealthBadge({ health }: { health: string }) {
  const colors: Record<string, string> = {
    Excellent:
      "bg-green-500/10 text-green-400 border-green-500/30",

    Good:
      "bg-blue-500/10 text-blue-400 border-blue-500/30",

    "Needs Attention":
      "bg-orange-500/10 text-orange-400 border-orange-500/30",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs border font-medium ${colors[health]}`}
    >
      {health}
    </span>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  if (risk === "Low")
    return (
      <div className="flex items-center gap-2 text-green-400">
        <ShieldCheck size={16} />
        <span>Low</span>
      </div>
    );

  if (risk === "Medium")
    return (
      <div className="flex items-center gap-2 text-yellow-400">
        <AlertTriangle size={16} />
        <span>Medium</span>
      </div>
    );

  return (
    <div className="flex items-center gap-2 text-red-400">
      <AlertCircle size={16} />
      <span>High</span>
    </div>
  );
}

export default function RepositoryTable() {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-semibold">

            Repository Intelligence

          </h2>

          <p className="text-sm text-gray-400 mt-1">

            Engineering knowledge coverage across repositories.

          </p>

        </div>

        <button
          className="
          text-sm
          text-[#2EA043]
          hover:text-green-300
          transition-colors
        "
        >
          View All
        </button>

      </div>

      <div className="space-y-5">

        {repositories.map((repo) => (

          <motion.div
            key={repo.name}
            whileHover={{
              y: -3,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
                border
                border-[#30363D]
                rounded-xl
                p-5
                hover:border-[#2EA043]/50
                transition-all
                cursor-pointer
            "
          >

            <div className="flex justify-between items-start">

              <div className="flex gap-4">

                <div className="bg-[#2EA043]/10 p-3 rounded-xl">

                  <FolderGit2
                    className="text-[#2EA043]"
                    size={22}
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-lg">

                    {repo.name}

                  </h3>

                  <p className="text-sm text-gray-400">

                    {repo.description}

                  </p>

                </div>

              </div>

              <ChevronRight
                className="text-gray-500"
                size={18}
              />

            </div>

            <div className="mt-6">

              <div className="flex justify-between text-sm mb-2">

                <span className="text-gray-400">

                  Knowledge Coverage

                </span>

                <span className="font-semibold">

                  {repo.coverage}%

                </span>

              </div>

              <div className="w-full h-2 rounded-full bg-[#30363D] overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${repo.coverage}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="h-full bg-[#2EA043]"
                />

              </div>

            </div>

            <div className="grid grid-cols-4 gap-5 mt-6">

              <Stat
                label="Files"
                value={repo.files}
              />

              <Stat
                label="Memories"
                value={repo.memories}
              />

              <Stat
                label="Bugs"
                value={repo.bugs}
              />

              <Stat
                label="ADRs"
                value={repo.adrs}
              />

            </div>

            <div className="flex justify-between items-center mt-6">

              <HealthBadge
                health={repo.health}
              />

              <RiskBadge
                risk={repo.risk}
              />

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>

      <p className="text-xs uppercase tracking-wide text-gray-500">

        {label}

      </p>

      <h4 className="mt-2 text-xl font-semibold">

        {value}

      </h4>

    </div>
  );
}