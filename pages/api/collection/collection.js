import { collection_countItem, collection_add, collection_addItem, collection_deleteItemCollection } from "../../../utils/mysql/mysql";
import { getSession } from "next-auth/react";


export default async function handler(req, res) {
  const { url, method, query, body, headers } = req;
  const session = await getSession({req});
  const username = session?.user.nickname;

  switch (method) {
    case "GET":
      const data = await collection_countItem(username);

      if (!data) return res.status(400).send("Error occured.");

      res.status(201).json(data);

      break;
    case "POST":
      const result = await collection_add(body.value, username);

      if (!result) return res.status(400).send("Error occured.");

      res.status(201).json(result);

      break;
    case "PATCH":
      const { id, collection_id } = body;
      const foo = await collection_addItem(id, collection_id, username);

      if (!foo.success) return res.status(400).send(foo.message);
      res.status(201).json(foo.message);
      break;

    case "DELETE":
      const ok = await collection_deleteItemCollection(query.f_id, query.c_id);

      if (!ok.success) return res.status(400).send(ok.message);
      res.status(201).json(ok);

      break;
    default:
      break;
  } // switch
} // handler