import { createTopic } from "../../utils/mysql/mysql";

export default async function handler(req, res) {
  // reusable
  const { url, method, query, body, headers } = req;

  switch (method) {
    case "POST":
      const result = await createTopic(body.topic, body.filed);

      if (!result) return res.status(400).send("Error occured.");

      res.status(201).json(result);

      break;
    default:
      break;
  } // switch
} // handler