-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "provider" VARCHAR(100) NOT NULL,
    "image" TEXT,
    "oauth_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
