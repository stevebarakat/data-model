import { useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";

export default function Index() {
  const fetcher = useFetcher();
  const songQuery = fetcher.data;
  const [selectedSongId, setSelectedSongId] = useState("roxanne");

  songQuery !== undefined && console.log("songQuery", songQuery.song);

  // load server data via resource route based on selected song id
  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load(`/songs/${selectedSongId}`);
    }
  }, [fetcher, selectedSongId]);

  useEffect(() => {
    fetcher.load(`/songs/${selectedSongId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSongId]);

  // THIS IS WHERE THE LOGARITHMIC SCALE IS SET
  function changeVolume(e) {
    const value = parseFloat(e.target.value, 10);

    fetcher.submit(
      {
        actionName: "changeVolume",
        volume: value,
      },
      { method: "post", action: "/actions", replace: true }
    );
  }

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <fetcher.Form>
        <input type="range" onChange={changeVolume} />
      </fetcher.Form>
    </div>
  );
}
