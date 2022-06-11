import { redirect } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export const action = async ({ request }) => {
  const form = await request.formData();
  const actionName = form.get("actionName");
  const track = form.get("track");
  const parsedTrack = JSON.parse(track);
  console.log("parsedTrack", parsedTrack);
  console.log("actionName", actionName);

  switch (actionName) {
    case "changeVolume":
      const volume = form.get("volume");
      console.log("volume: ", volume);
      await db.trackSettings.update({
        where: {
          id: 1,
        },
        data: {
          trackVolume: parseFloat(volume),
        },
      });
      break;
    case "changeMasterVolume":
      const masterVolume = form.get("masterVolume");
      console.log("masterVolume: ", masterVolume);
      await db.trackMix.update({
        where: {
          id: 1,
        },
        data: {
          masterVolume: parseFloat(masterVolume),
        },
      });
      break;

    case "changePan":
      const pan = form.get("pan");
      console.log("pan: ", pan);
      break;

    case "changeMute":
      const mute = form.get("mute");
      console.log("mute: ", mute);
      break;

    case "changeSolo":
      const solo = form.get("solo");
      console.log("solo", solo);
      break;

    case "changeHighEqLevel":
      const highEqLevel = form.get("highEqLevel");
      console.log("highEqLevel: ", highEqLevel);
      break;

    case "changeMidEqLevel":
      const midEqLevel = form.get("midEqLevel");
      console.log("midEqLevel", midEqLevel);
      break;

    case "changeLowEqLevel":
      const lowEqLevel = form.get("lowEqLevel");
      console.log("lowEqLevel", lowEqLevel);
      break;

    default:
      throw new Response(`Unknown action ${actionName}`, { status: 400 });
  }
  return redirect("/");
};
