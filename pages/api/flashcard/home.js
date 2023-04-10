import { flashcard_remove, flashcard_update, flashcard_getWithCondition } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
  const { url, method, query, body, headers } = req;

  switch (method) {
    case "GET":
      const data = await flashcard_getWithCondition(query.topic_id, query.orderBy, query.direction, query.username);

      if (!data) return res.status(400).send("Error occured.");
      res.status(201).json(data);

      break;
    case "PATCH":
      const { id, field, value } = body;
      const foo = await flashcard_update(id, field, value);

      if (!foo.success) return res.status(400).send(foo.message);
      res.status(201).json(foo.message);

      break;
    case "DELETE":
      const result = await flashcard_remove(query.id);

      if (!result.success) return res.status(400).send(result.message);
      res.status(201).json(result.message);

      break;
    default:
      break;
  } // switch
} // handler