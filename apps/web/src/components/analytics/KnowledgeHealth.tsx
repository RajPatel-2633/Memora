import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const metrics = [
  {
    title: "Coverage",
    value: 96,
  },
  {
    title: "Confidence",
    value: 94,
  },
  {
    title: "Freshness",
    value: 88,
  },
  {
    title: "Connectivity",
    value: 91,
  },
];

export default function KnowledgeHealth() {

  const score = 92;

  return (

    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 h-full">

      <div className="flex items-center gap-3 mb-8">

        <ShieldCheck
          size={22}
          className="text-[#2EA043]"
        />

        <div>

          <h2 className="text-xl font-semibold">

            Engineering Health

          </h2>

          <p className="text-sm text-gray-400">

            Overall knowledge quality

          </p>

        </div>

      </div>

      {/* Circular Score */}

      <div className="flex justify-center mb-10">

        <div className="relative w-44 h-44">

          <svg
            viewBox="0 0 160 160"
            className="-rotate-90"
          >

            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#30363D"
              strokeWidth="10"
              fill="none"
            />

            <motion.circle
              initial={{ pathLength: 0 }}
              animate={{ pathLength: score / 100 }}
              transition={{
                duration: 1.8,
              }}
              cx="80"
              cy="80"
              r="68"
              stroke="#2EA043"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="427"
              strokeDashoffset="0"
              style={{
                pathLength: score / 100,
              }}
            />

          </svg>

          <div className="absolute inset-0 flex flex-col justify-center items-center">

            <h2 className="text-5xl font-bold">

              {score}

            </h2>

            <span className="text-[#2EA043] text-sm font-semibold mt-1">

              Excellent

            </span>

          </div>

        </div>

      </div>

      <div className="space-y-5">

        {metrics.map((metric) => (

          <div
            key={metric.title}
          >

            <div className="flex justify-between text-sm mb-2">

              <span>

                {metric.title}

              </span>

              <span className="font-semibold">

                {metric.value}%

              </span>

            </div>

            <div className="w-full h-2 rounded-full bg-[#30363D] overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${metric.value}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="h-full bg-[#2EA043] rounded-full"
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}