import {  collection_checkCollectionExist, topic_checkTopicExist } from "../../../utils/mysql/mysql";

export default async function handler(req, res) {
    const { url, method, query, body, headers } = req;

    switch (method) {
        case "GET":
            const data = await topic_checkTopicExist(query.id);
            if (!data) return res.status(400).send("Error occured.");

            res.status(201).json(data);

            break;
        default:
            break;
    } // switch
} // handler