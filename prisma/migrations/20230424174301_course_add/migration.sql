-- CreateTable
CREATE TABLE "courses" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("code")
);
