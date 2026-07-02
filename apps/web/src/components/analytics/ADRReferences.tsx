import { motion } from "framer-motion";
import {
  GitBranch,
  ArrowUpRight
} from "lucide-react";

const adrs = [
  {
    title: "JWT Refresh Token Strategy",
    references: 31,
    repositories: 3,
    files: 24,
  },
  {
    title: "Redis Queue Architecture",
    references: 26,
    repositories: 2,
    files: 19,
  },
  {
    title: "Repository Indexing Pipeline",
    references: 18,
    repositories: 4,
    files: 16,
  },
  {
    title: "CQRS Command Pattern",
    references: 14,
    repositories: 2,
    files: 12,
  },
];

export default function ADReferences() {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-semibold">

            Most Referenced ADRs

          </h2>

          <p className="text-gray-400 text-sm mt-1">

            Architectural decisions driving engineering knowledge.

          </p>

        </div>

        <button className="text-[#2EA043] text-sm hover:text-green-300">

          View All

        </button>

      </div>

      <div className="space-y-4">

        {adrs.map((adr) => (

          <motion.div
            whileHover={{ y: -3 }}
            key={adr.title}
            className="
              border
              border-[#30363D]
              rounded-xl
              p-4
              hover:border-purple-500/40
              transition-all
              cursor-pointer
            "
          >

            <div className="flex justify-between items-center">

              <div className="flex gap-3 items-center">

                <div className="bg-purple-500/10 p-2 rounded-lg">

                  <GitBranch
                    size={18}
                    className="text-purple-400"
                  />

                </div>

                <div>

                  <h4 className="font-medium">

                    {adr.title}

                  </h4>

                  <p className="text-xs text-gray-500 mt-1">

                    {adr.repositories} repositories · {adr.files} files

                  </p>

                </div>

              </div>

              <ArrowUpRight
                size={18}
                className="text-gray-500"
              />

            </div>

            <div className="mt-4">

              <div className="flex justify-between text-sm mb-2">

                <span className="text-gray-400">

                  References

                </span>

                <span className="font-semibold">

                  {adr.references}

                </span>

              </div>

              <div className="w-full h-2 rounded-full bg-[#30363D] overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${adr.references * 3}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="h-full bg-purple-500"
                />

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  );
}