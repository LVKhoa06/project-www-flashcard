import { bin_remove, bin_getAll, bin_recover } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
  // reusable
  const { url, method, query, body, headers } = req;

  switch (method) {
    case "GET":
      const data = await bin_getAll();

      if (!data) return res.status(400).send("Error occured.");

      res.status(201).json(data);

      break;
    case "PATCH":
      const foo = await bin_remove(body.id);

      if (!foo.success) return res.status(400).send(foo.message);
      res.status(201).json(foo.message);
      break;

    case "DELETE":
      const ok = await bin_recover(query.id);

      if (!ok.success) return res.status(400).send(ok.message);
      res.status(201).json(ok);

      break;
    default:
      break;
  } // switch
} // handler