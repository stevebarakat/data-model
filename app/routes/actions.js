import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const actionName = form.get("actionName");
  const track = form.get("track");
  const id = form.get("id");
  const parsedTrack = JSON.parse(track);
  console.log("parddsedTrack", parsedTrack);
  console.log("actionName", actionName);

  switch (actionName) {
    case "changeVolume":
      const volume = form.get("volume");
      console.log("volume: ", volume);
      await db.trackSettings.update({
        where: {
          id: parseInt(id, 10),
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
