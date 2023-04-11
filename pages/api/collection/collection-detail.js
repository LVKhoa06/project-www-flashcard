import { flashcard_getWithCollection, collection_getOneCollection } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
  // reusable
  const { url, method, query, body, headers } = req;

  switch (method) {
    case "GET":
      const data1 = await flashcard_getWithCollection(query.id);
      const data2 = await collection_getOneCollection(query.id);

      if (!data1 || !data2) return res.status(400).send("Error occured.");

      res.status(201).json({data1: data1, data2:data2});

      break;
    default:
      break;
  } // switch
} // handler