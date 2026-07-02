import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import KPICards from "../components/analytics/KPICards";
import MemoryGrowth from "../components/analytics/MemoryGrowth";
import MemoryDistribution from "../components/analytics/MemoryDistribution";
import KnowledgeHealth from "../components/analytics/KnowledgeHealth";
import BugTrend from "../components/analytics/BugTrend";
import ActivityHeatmap from "../components/analytics/ActivityHeatmap";
import RepositoryTable from "../components/analytics/RepositoryTable";
import KnowledgeGaps from "../components/analytics/KnowledgeGaps";
import ADReferences from "../components/analytics/ADRReferences";
import AIConfidence from "../components/analytics/AIConfidence";

export function AnalyticsPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">

      <AnalyticsHeader />

      <KPICards />

      {/* Memory Growth + Distribution */}

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12 xl:col-span-8">
          <MemoryGrowth />
        </div>

        <div className="col-span-12 xl:col-span-4">
          <MemoryDistribution />
        </div>

      </div>

      {/* Health + Activity */}

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12 xl:col-span-4">
          <KnowledgeHealth />
        </div>

        <div className="col-span-12 xl:col-span-8">
          <ActivityHeatmap />
        </div>

      </div>

      {/* Bug Trend */}

      <BugTrend />

      {/* Repository Intelligence */}

      <RepositoryTable />

      {/* Bottom Section */}

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-4">
          <KnowledgeGaps />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <ADReferences />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <AIConfidence />
        </div>

      </div>

    </div>
  );
}