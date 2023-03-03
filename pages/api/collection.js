import { countCollectionItem, addCollection, collection_AddToCollection} from "../../utils/mysql/mysql";

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
      case "PATCH":
      const { id, collection_id } = body;
      const foo = await collection_AddToCollection(id, collection_id);
      
      if (!foo.success) return res.status(400).send(foo.message);
      res.status(201).json(foo.message);
      break;
    default:
      break;
  } // switch
} // handler