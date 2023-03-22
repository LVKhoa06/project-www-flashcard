import { signUp } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
  const { url, method, query, body, headers } = req;
  const { username, password, id } = body;
  switch (method) {
    case "POST":
      try {
        const result = await signUp(id, username, password);

        res.status(201).json(result);
      } catch (ex) {
        res.status(500).send("Internal server error.");
      } // catch

      break;
    default:
      break;
  } // switch
} // handler