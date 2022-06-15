import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
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
  return (
    <div>
      {data.user ? (
        <div className="user-info">
          <span>{`Hi ${data.user.username}`}</span>
          <form action="/logout" method="post">
            <button type="submit">Logout</button>
          </form>
          <div style={{ padding: "1rem" }}>
            <Link style={{ color: "white" }} to="/mixer">
              Go to Mixer
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: "2rem", display: "flex", gap: "16px" }}>
          <Link style={{ color: "white" }} to="/login">
            Login
          </Link>
        </div>
      )}
      <div className="logo-wrap">
        <img src="/remix.svg" alt="remix" width="600" />
        <p style={{ fontWeight: "bold" }}>version 0.0.0.0.1</p>
      </div>
    </div>
  );
}
