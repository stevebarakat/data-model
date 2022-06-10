import { PrismaClient } from "@prisma/client";
import { json } from "@remix-run/node";
const db = new PrismaClient();

export const loader = async ({ params: { id } }) => {
  const song = await db.song.findUnique({
    where: { id: id },
    include: { tracks: true },
  });
  if (!song) throw new Error("Song not found");
  const data = { song };
  return json(data);
};
