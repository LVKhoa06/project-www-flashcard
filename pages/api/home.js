import { getAllFlashcard, removeFlashcard, updateFlashcard } from "../../utils/mysql/mysql";

export default async function handler(req, res) {
  const { url, method, query, body, headers } = req;

  switch (method) {
    case "GET":
      const data = await getAllFlashcard();
      if (!data) return res.status(400).send("Error occured.");
      res.status(201).json(data);

      break;
      case "PATCH":
        const { id, field, value } = body;
        const foo = await updateFlashcard(id, field, value);
        
        if (!foo.success) return res.status(400).send(foo.message);
        res.status(201).json(foo.message);
  
        break;
      case "DELETE":
        const result = await removeFlashcard(query.id);
        
        if (!result.success) return res.status(400).send(result.message);
        res.status(201).json(result.message);
  
        break;
    default:
      break;
  } // switch
} // handler