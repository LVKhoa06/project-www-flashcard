import { topic_getAll, flashcard_create } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
  // reusable
  const { url, method, query, body, headers } = req;

  switch (method) {
    case "GET":
      const data = await topic_getAll();
      if (!data) return res.status(400).send("Error occured.");
      res.status(201).json(data);

      break;
    case "POST":
      const { topic_id, term, description, date } = body;
      const result = await flashcard_create(topic_id, term, description, date);

      if (!result) return res.status(400).send("Error occured.");

      res.status(201).json(result);

      break;
    default:
      break;
  } // switch
} // handler