/*
  Warnings:

  - You are about to drop the column `busOne` on the `Track` table. All the data in the column will be lost.
  - Added the required column `songMixId` to the `TrackMix` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TrackMix` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SongMix" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "masterVolume" REAL NOT NULL,
    "busOneVolume" REAL NOT NULL,
    "busTwoVolume" REAL NOT NULL,
    CONSTRAINT "SongMix_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SongMix" ("busOneVolume", "busTwoVolume", "id", "masterVolume", "userId") SELECT "busOneVolume", "busTwoVolume", "id", "masterVolume", "userId" FROM "SongMix";
DROP TABLE "SongMix";
ALTER TABLE "new_SongMix" RENAME TO "SongMix";
CREATE UNIQUE INDEX "SongMix_userId_key" ON "SongMix"("userId");
CREATE TABLE "new_Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "songId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "volume" REAL DEFAULT 0,
    "pan" REAL DEFAULT 0,
    CONSTRAINT "Track_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Track" ("id", "name", "pan", "path", "songId", "volume") SELECT "id", "name", "pan", "path", "songId", "volume" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE TABLE "new_TrackMix" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "songMixId" INTEGER NOT NULL,
    "trackMixId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "trackVolume" REAL DEFAULT 0,
    "trackPan" REAL DEFAULT 0,
    "trackEqHi" REAL DEFAULT 0,
    "trackEqMid" REAL DEFAULT 0,
    "trackEqLow" REAL DEFAULT 0,
    CONSTRAINT "TrackMix_trackMixId_fkey" FOREIGN KEY ("trackMixId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TrackMix" ("id", "trackEqHi", "trackEqLow", "trackEqMid", "trackMixId", "trackPan", "trackVolume") SELECT "id", "trackEqHi", "trackEqLow", "trackEqMid", "trackMixId", "trackPan", "trackVolume" FROM "TrackMix";
DROP TABLE "TrackMix";
ALTER TABLE "new_TrackMix" RENAME TO "TrackMix";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
