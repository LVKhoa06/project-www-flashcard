import { countCollectionItem, addCollection } from "../../utils/mysql/mysql";

export default async function handler(req, res) {
  // reusable
  const { url, method, query, body, headers } = req;

  switch (method) {
    case "GET":
      const data = await countCollectionItem();

      if (!data) return res.status(400).send("Error occured.");

      res.status(201).json(data);

      break;
    case "POST":
      const result = await addCollection(body.filed, body.value);

      if (!result) return res.status(400).send("Error occured.");

      res.status(201).json(result);

      break;
    default:
      break;
  } // switch
} // handler