import { motion } from "framer-motion";
import {
  Brain,
  FileCode2,
  GitCommitHorizontal,
  Network,
  Bug,
  FileText,
  ShieldCheck,
} from "lucide-react";

const evidence = [
  {
    label: "Files",
    value: "2,412",
    icon: FileCode2,
    color: "text-blue-400",
  },
  {
    label: "Commits",
    value: "421",
    icon: GitCommitHorizontal,
    color: "text-green-400",
  },
  {
    label: "ADRs",
    value: "129",
    icon: Network,
    color: "text-purple-400",
  },
  {
    label: "Bugs",
    value: "102",
    icon: Bug,
    color: "text-red-400",
  },
  {
    label: "Design Docs",
    value: "38",
    icon: FileText,
    color: "text-orange-400",
  },
];

export default function AIConfidence() {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 h-full">

      <div className="flex items-center gap-3 mb-6">

        <div className="p-3 rounded-xl bg-[#2EA043]/10">

          <Brain
            className="text-[#2EA043]"
            size={22}
          />

        </div>

        <div>

          <h2 className="text-xl font-semibold">

            AI Confidence

          </h2>

          <p className="text-sm text-gray-400">

            Confidence backed by repository evidence

          </p>

        </div>

      </div>

      {/* Score */}

      <div className="flex justify-center mb-8">

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-36 h-36 rounded-full border-[8px] border-[#2EA043] flex flex-col justify-center items-center"
        >

          <h1 className="text-5xl font-bold">

            96%

          </h1>

          <span className="text-[#2EA043] text-sm font-medium mt-1">

            Excellent

          </span>

        </motion.div>

      </div>

      <div className="space-y-4">

        {evidence.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.label}
              className="flex items-center justify-between"
            >

              <div className="flex items-center gap-3">

                <Icon
                  size={18}
                  className={item.color}
                />

                <span className="text-gray-300">

                  {item.label}

                </span>

              </div>

              <span className="font-semibold">

                {item.value}

              </span>

            </div>

          );

        })}

      </div>

      <div className="border-t border-[#30363D] mt-8 pt-6 space-y-4">

        <Metric
          label="Avg Sources / Answer"
          value="18"
        />

        <Metric
          label="Avg Retrieval Time"
          value="180 ms"
        />

        <Metric
          label="Knowledge Freshness"
          value="98%"
        />

      </div>

      <div className="mt-8 rounded-xl bg-[#2EA043]/10 border border-[#2EA043]/20 p-4">

        <div className="flex items-center gap-3">

          <ShieldCheck
            className="text-[#2EA043]"
            size={18}
          />

          <p className="text-sm text-[#8BE28B]">

            AI responses are generated using verified repository
            memories, commits, ADRs and engineering knowledge.

          </p>

        </div>

      </div>

    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">

      <span className="text-gray-400 text-sm">

        {label}

      </span>

      <span className="font-semibold">

        {value}

      </span>

    </div>
  );
}