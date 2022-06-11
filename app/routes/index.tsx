import { useState, useEffect } from "react";
import { Form, useFetcher, useLoaderData, Link } from "@remix-run/react";
import Mixer from "~/components/Mixer";
import { db } from "~/utils/db.server";
import type { User } from "@prisma/client";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { getUser } from "~/utils/session.server";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  const data: LoaderData = {
    user,
  };
  return json(data);
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
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

  function changeSong(e) {
    switch (e.target.value) {
      case "a-day-in-the-life":
        setSelectedSongId("a-day-in-the-life");
        break;

      case "roxanne":
        setSelectedSongId("roxanne");
        break;

      case "blue-monday":
        setSelectedSongId("blue-monday");
        break;

      default:
        break;
    }
  }
  console.log("data: ", data);
  return (
    <div>
      {songQuery !== undefined && <Mixer song={songQuery.song} />}
      <Form method="post" style={{ display: "flex", justifyContent: "center" }}>
        <select
          onChange={changeSong}
          className="song-select"
          name="slug"
          id="song-select"
        >
          <option value="">Choose A Song...</option>
          <option value="a-day-in-the-life">
            The Beatles - A Day In The Life
          </option>
          <option value="roxanne">The Police - Roxanne</option>
          <option value="blue-monday">New Order - Blue Monday</option>
        </select>
      </Form>
      {data.user ? (
        <div className="user-info">
          <span>{`Hi ${data.user.username}`}</span>
          <form action="/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <div style={{ fontSize: "2rem", display: "flex", gap: "16px" }}>
        <Link style={{ color: "white" }} to="/login">
          login
        </Link>
        <Link style={{ color: "white" }} to="/logout">
          logout
        </Link>
      </div>
    </div>
  );
}