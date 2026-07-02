import { motion } from "framer-motion";
import {
  AlertTriangle,
  Network,
  Bug,
  ArrowUpRight,
} from "lucide-react";

const knowledgeGaps = [
  {
    title: "Authentication Module",
    description: "Sparse documentation and missing ADRs.",
    severity: "High",
  },
  {
    title: "Payment Service",
    description: "Limited AI memory from commits.",
    severity: "Medium",
  },
  {
    title: "Notification Worker",
    description: "Low architectural coverage.",
    severity: "Low",
  },
];

const topADRs = [
  {
    title: "JWT Refresh Strategy",
    references: 31,
  },
  {
    title: "Redis Queue Architecture",
    references: 24,
  },
  {
    title: "Repository Index Pipeline",
    references: 19,
  },
];

const hotspots = [
  {
    module: "Authentication",
    bugs: 18,
  },
  {
    module: "API Gateway",
    bugs: 13,
  },
  {
    module: "Worker Queue",
    bugs: 9,
  },
];

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    High: "bg-red-500/10 text-red-400 border-red-500/30",
    Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    Low: "bg-green-500/10 text-green-400 border-green-500/30",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full border text-xs ${colors[severity]}`}
    >
      {severity}
    </span>
  );
}

export default function EngineeringInsights() {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">

      <div className="mb-8">

        <h2 className="text-2xl font-semibold">
          Engineering Insights
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Actionable intelligence generated from your engineering memory.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Knowledge Gaps */}

        <div>

          <div className="flex items-center gap-2 mb-5">

            <AlertTriangle
              className="text-orange-400"
              size={18}
            />

            <h3 className="font-semibold">
              Knowledge Gaps
            </h3>

          </div>

          <div className="space-y-4">

            {knowledgeGaps.map((gap) => (

              <motion.div
                key={gap.title}
                whileHover={{ y: -3 }}
                className="border border-[#30363D] rounded-xl p-4 hover:border-orange-400/40 transition-all"
              >

                <div className="flex justify-between items-center">

                  <h4 className="font-medium">

                    {gap.title}

                  </h4>

                  <SeverityBadge
                    severity={gap.severity}
                  />

                </div>

                <p className="text-sm text-gray-400 mt-3">

                  {gap.description}

                </p>

              </motion.div>

            ))}

          </div>

        </div>

        {/* Top ADRs */}

        <div>

          <div className="flex items-center gap-2 mb-5">

            <Network
              className="text-purple-400"
              size={18}
            />

            <h3 className="font-semibold">

              Top Referenced ADRs

            </h3>

          </div>

          <div className="space-y-4">

            {topADRs.map((adr) => (

              <motion.div
                key={adr.title}
                whileHover={{ y: -3 }}
                className="border border-[#30363D] rounded-xl p-4 hover:border-purple-500/40 transition-all"
              >

                <div className="flex justify-between items-center">

                  <h4 className="font-medium">

                    {adr.title}

                  </h4>

                  <ArrowUpRight
                    size={16}
                    className="text-gray-500"
                  />

                </div>

                <p className="text-sm text-gray-400 mt-3">

                  Referenced by{" "}

                  <span className="font-semibold text-white">

                    {adr.references}

                  </span>{" "}

                  engineering memories.

                </p>

              </motion.div>

            ))}

          </div>

        </div>

        {/* Bug Hotspots */}

        <div>

          <div className="flex items-center gap-2 mb-5">

            <Bug
              className="text-red-400"
              size={18}
            />

            <h3 className="font-semibold">

              Bug Hotspots

            </h3>

          </div>

          <div className="space-y-4">

            {hotspots.map((bug) => (

              <motion.div
                key={bug.module}
                whileHover={{ y: -3 }}
                className="border border-[#30363D] rounded-xl p-4 hover:border-red-500/40 transition-all"
              >

                <div className="flex justify-between items-center">

                  <h4 className="font-medium">

                    {bug.module}

                  </h4>

                  <span className="text-red-400 font-semibold">

                    {bug.bugs}

                  </span>

                </div>

                <div className="mt-4 h-2 rounded-full bg-[#30363D] overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${bug.bugs * 5}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="h-full bg-red-500"
                  />

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}