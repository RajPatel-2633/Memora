import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const gaps = [
  {
    module: "Authentication",
    confidence: "42%",
    severity: "High",
  },
  {
    module: "Notification Service",
    confidence: "58%",
    severity: "Medium",
  },
  {
    module: "Payment Gateway",
    confidence: "63%",
    severity: "Medium",
  },
  {
    module: "Background Workers",
    confidence: "72%",
    severity: "Low",
  },
];

const colors: Record<string, string> = {
  High: "bg-red-500/10 text-red-400 border-red-500/30",

  Medium:
    "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",

  Low:
    "bg-green-500/10 text-green-400 border-green-500/30",
};

export default function KnowledgeGaps() {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-semibold">

            Knowledge Gaps

          </h2>

          <p className="text-sm text-gray-400 mt-1">

            Modules where AI needs more engineering context.

          </p>

        </div>

        <AlertTriangle
          className="text-orange-400"
          size={22}
        />

      </div>

      <div className="space-y-4">

        {gaps.map((gap) => (

          <motion.div
            key={gap.module}
            whileHover={{ y: -2 }}
            className="border border-[#30363D] rounded-xl p-4 hover:border-orange-400/40 transition-all cursor-pointer"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-medium">

                  {gap.module}

                </h3>

                <p className="text-sm text-gray-500 mt-1">

                  AI Confidence

                  <span className="font-semibold ml-2 text-white">

                    {gap.confidence}

                  </span>

                </p>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs border ${colors[gap.severity]}`}
              >
                {gap.severity}
              </span>

            </div>

            <div className="mt-4 flex justify-between items-center">

              <span className="text-sm text-[#2EA043]">

                Improve Context

              </span>

              <ArrowRight
                size={16}
                className="text-[#2EA043]"
              />

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}