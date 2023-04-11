import { flashcard_getWithCondition, topic_getOneTopic } from "../../../utils/mysql/mysql";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    // reusable
    const { url, method, query, body, headers } = req;
    const session = await getSession({ req });
    const username = session.user.nickname;

    switch (method) {
        case "GET":
            const data1 = await flashcard_getWithCondition(query.id, username);
            const data2 = await topic_getOneTopic(query.id);

            if (!data1 || !data2) return res.status(400).send("Error occured.");

            res.status(201).json({ data1: data1, data2: data2 });

            break;
        default:
            break;
    } // switch
} // handler