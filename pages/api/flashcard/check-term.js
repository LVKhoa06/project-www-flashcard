import { getSession } from "next-auth/react";
import { flashcard_checkTermAlreadyExistOrNot } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
  // reusable
  const { url, method, query, body, headers } = req;
  const session = await getSession({req});
  const username = session.user.nickname

  switch (method) {
    case "GET":
      const data = await flashcard_checkTermAlreadyExistOrNot(query.term, username);
      if (!data) return res.status(400).send("Error occured.");
      res.status(201).json(data);

      break;
    default:
      break;
  } // switch
} // handler