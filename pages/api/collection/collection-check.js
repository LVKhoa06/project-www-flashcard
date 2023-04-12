import { flashcard_getWithCollection, collection_getOneCollection, collection_checkCollectionExist } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
    // reusable
    const { url, method, query, body, headers } = req;

    switch (method) {
        case "GET":
            const data = await collection_checkCollectionExist(query.id, query.username);
            if (!data) return res.status(400).send("Error occured.");

            res.status(201).json(data);

            break;
        default:
            break;
    } // switch
} // handler