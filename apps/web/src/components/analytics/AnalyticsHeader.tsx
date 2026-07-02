import { CalendarDays, Download, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Engineering Intelligence
        </h1>

        <p className="text-muted-foreground mt-1">
          Monitor repository health, engineering knowledge, AI confidence and
          architectural insights.
        </p>
      </div>

      <div className="flex items-center gap-3">

        <button
          className="
          flex
          items-center
          gap-2
          px-4
          py-2.5
          rounded-xl
          border
          border-[#30363D]
          hover:border-[#2EA043]/50
          transition
        "
        >
          <CalendarDays size={18} />

          Last 30 Days

        </button>

        <button
          className="
          flex
          items-center
          gap-2
          px-4
          py-2.5
          rounded-xl
          border
          border-[#30363D]
          hover:border-[#2EA043]/50
          transition
        "
        >
          <Filter size={18} />

          Filters

        </button>

        <button
          className="
          bg-[#2EA043]
          text-black
          font-semibold
          px-5
          py-2.5
          rounded-xl
          flex
          items-center
          gap-2
          hover:scale-[1.02]
          transition
        "
        >
          <Download size={18} />

          Export Report

        </button>

      </div>
    </motion.div>
  );
}