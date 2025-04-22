-- CreateTable
CREATE TABLE "Freelancer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "bestThings" TEXT[],
    "location" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Freelancer_pkey" PRIMARY KEY ("id")
);
