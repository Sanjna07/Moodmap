-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT DEFAULT 'https://www.vecteezy.com/vector-art/20765399-default-profile-account-unknown-icon-black-silhouette',
    "age" INTEGER NOT NULL,
    "wScr" INTEGER[],
    "MScr" INTEGER[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
