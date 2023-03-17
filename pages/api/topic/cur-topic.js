import { topic_changeTopic, topic_curTopic, topic_getAll } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
  const { url, method, query, body, headers } = req;

  switch (method) {
    case "GET":
      const data = await topic_curTopic(query.id);
      if (!data) return res.status(400).send("Error occured.");
      res.status(201).json(data);

      break;

      case "PATCH":
        const { id, topic_id } = body;
        const foo = await topic_changeTopic(id, topic_id);
  
        if (!foo.success) return res.status(400).send(foo.message);
        res.status(201).json(foo.message);
  
        break;
    default:
      break;
  } // switch
} // handler