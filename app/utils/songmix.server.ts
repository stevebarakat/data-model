import { db } from "./db.server";

function loader({ request, params }) {
  const userId = requireUserId(request); // validates logged in user
  // /songmix?id=123
  const songMixId = new URL(request.url).searchParams.get("id");
  // or /songmix/123
  const songMixId = params.id;
  const songMix = await getSongMix(songMixId);
  if (!songMix) throw new Response("Not Found", { status: 404 });
  if (songMix.userId !== userId)
    throw new Response("Forbidden", { status: 403 });
  //... do stuff with song mix
}
