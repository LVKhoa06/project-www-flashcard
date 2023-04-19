import { getSession } from "next-auth/react";
import { changePassword } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
  const { url, method, query, body, headers } = req;
  const { mat_khau, mat_khau_moi } = body;

  const session = await getSession({ req });
  const user = session?.user;
  const id = user.id;

  switch (method) {
    case "POST":
      const result = await changePassword(id, mat_khau, mat_khau_moi);
      if (!result) return res.status(400).send("Error occured.");

      res.status(201).json(result);

      break;

    default:
      break;
  } // switch
} // handler