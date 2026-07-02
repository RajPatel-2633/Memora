-- CreateTable
CREATE TABLE "Memory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "type" "MemoryType" NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "important" INTEGER NOT NULL DEFAULT 1,
    "tags" JSONB,
    "source" TEXT,
    "embeddingId" TEXT,
    "filePath" TEXT,
    "lineStart" INTEGER,
    "lineEnd" INTEGER,
    "repositoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ADR" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "ADRStatus" NOT NULL,
    "context" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "consequences" TEXT NOT NULL,
    "author" TEXT,
    "references" JSONB,
    "repositoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ADR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bug" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" "BugSeverity" NOT NULL,
    "status" "BugStatus" NOT NULL,
    "rootCause" TEXT,
    "resolution" TEXT,
    "confidence" DOUBLE PRECISION,
    "affectedFile" JSONB,
    "introducedCommit" TEXT,
    "fixedCommit" TEXT,
    "repositoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bug_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Memory_repositoryId_idx" ON "Memory"("repositoryId");

-- CreateIndex
CREATE INDEX "Memory_type_idx" ON "Memory"("type");

-- CreateIndex
CREATE INDEX "ADR_repositoryId_idx" ON "ADR"("repositoryId");

-- CreateIndex
CREATE INDEX "Bug_repositoryId_idx" ON "Bug"("repositoryId");

-- CreateIndex
CREATE INDEX "Bug_severity_idx" ON "Bug"("severity");

-- CreateIndex
CREATE INDEX "Bug_status_idx" ON "Bug"("status");

-- AddForeignKey
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ADR" ADD CONSTRAINT "ADR_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "Bug_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE CASCADE ON UPDATE CASCADE;
