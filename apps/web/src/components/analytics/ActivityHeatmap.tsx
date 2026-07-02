import { motion } from "framer-motion";

const weeks = 26;
const days = 7;

const cells = Array.from({ length: weeks * days }, (_, i) => ({
  id: i,
  level: Math.floor(Math.random() * 5),
}));

const colors = [
  "bg-[#161B22]",
  "bg-[#12351F]",
  "bg-[#1C5D2E]",
  "bg-[#238636]",
  "bg-[#2EA043]",
];

export default function ActivityHeatmap() {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold">
            Engineering Activity
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Knowledge captured across repositories.
          </p>

        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">

          Less

          {colors.map((color) => (
            <span
              key={color}
              className={`w-3 h-3 rounded-sm ${color}`}
            />
          ))}

          More

        </div>

      </div>

      <div className="overflow-x-auto">

        <div className="flex gap-1">

          {Array.from({ length: weeks }).map((_, week) => (

            <div
              key={week}
              className="flex flex-col gap-1"
            >

              {Array.from({ length: days }).map((_, day) => {

                const cell = cells[week * days + day];

                return (

                  <motion.div
                    key={cell.id}
                    whileHover={{
                      scale: 1.4,
                    }}
                    transition={{
                      duration: 0.15,
                    }}
                    title={`${cell.level * 8} memories`}
                    className={`
                        w-4
                        h-4
                        rounded-[3px]
                        cursor-pointer
                        transition-all
                        duration-200
                        ${colors[cell.level]}
                    `}
                  />

                );

              })}

            </div>

          ))}

        </div>

      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">

        <Stat
          title="Memories"
          value="2,814"
        />

        <Stat
          title="Commits"
          value="12,440"
        />

        <Stat
          title="Files"
          value="3,942"
        />

        <Stat
          title="Bugs"
          value="148"
        />

      </div>

    </div>
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
    <div className="rounded-xl border border-[#30363D] p-4">

      <p className="text-xs text-gray-500 uppercase">

        {title}

      </p>

      <h3 className="text-2xl font-bold mt-2">

        {value}

      </h3>

    </div>
  );
}