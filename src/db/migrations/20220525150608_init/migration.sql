-- CreateTable
CREATE TABLE "Vault" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authHash" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "value" TEXT NOT NULL
);
