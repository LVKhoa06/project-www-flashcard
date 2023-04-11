import { bin_remove, bin_getAll, bin_recover } from "../../../utils/mysql/mysql";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { url, method, query, body, headers } = req;
  const session = await getSession({req});
  const username = session.user.nickname;

  switch (method) {
    case "GET":
      const data = await bin_getAll(username);

      if (!data) return res.status(400).send("Error occured.");

      res.status(201).json(data);

      break;
    case "PATCH":
      const foo = await bin_recover(body.id);

      if (!foo.success) return res.status(400).send(foo.message);
      res.status(201).json(foo.message);
      break;

    case "DELETE":
      const ok = await bin_remove(query.id);

      if (!ok.success) return res.status(400).send(ok.message);
      res.status(201).json(ok);

      break;
    default:
      break;
  } // switch
} // handler