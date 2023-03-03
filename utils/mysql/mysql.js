import pool from './pool';

//#region Flashcard ----------------------------------------------- START
function flashcard_create() {

}
//#endregion Flashcard -------------------------------------------- END
export async function getAllTopic() {
    const query = `select * from topic;`;
    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // getAllTopic

export async function getAllCollection() {
    const query = `select * from collection;`;
    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // getAllCollection

export async function createFlashcard(topic_id, term, description, date) {
    const query = `insert into flashcard (topic_id, term, description, creation_time) values( ?, ?, ?, ?);`;
    const values = [topic_id, term, description, date];
    const [data] = await pool().execute(query, values);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Tạo flashcard thành công'
    };
} // createFlashcard

export async function removeFlashcard(id) {
    const query = `delete from flashcard where id = ?;`;
    const [data] = await pool().execute(query, [id]);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Xóa flashcard thành công'
    };
} // getAllFlashcard


export async function updateFlashcard(id, field, value) {
    const query = `update flashcard set ${field} = ? where id = ${id};`;
    const [data] = await pool().execute(query, [value]);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Chỉnh sửa flashcard thành công'
    };
} // updateFlashcard

export async function getFlashcardWithCondition(topic_id, field, orderBy, direction) {
    let query = `select * from flashcard 
    ${topic_id ? `where flashcard.${field} = ${topic_id}` : ''} 
    ${orderBy ? `order by ${orderBy} ${direction}` : ''};`

    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // getFlashcardWithCondition

export async function searchFlashcard(key) {
    const query = ` 
    select * from flashcard f
    inner join topic t
    on f.topic_id = t.topic_id
    where f.term like '%${key}%' or f.description like '%${key}%'`
    const [result] = await pool().execute(query);

    if (!result)
        return false;
    return result;
} // searchFlashcard

export async function addCollection(field, value) {
    const query = `insert into ${field}(${field}) values('${value}');`;
    const [data] = await pool().execute(query);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Tạo Collection thành công'
    };
} // addCollection

export async function countTopicItem() {
    const query = `select topic_id, count(topic_id) as quantity from flashcard group by topic_id;`;
    const [result] = await pool().execute(query);

    if (!result)
        return false;

    return result;
} // countTopicItem

export async function getCollection() {
    const query = `select * from collection;`;
    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // getCollection

export async function countCollectionItem() {
    const query = `select collection_id, count(collection_id) as quantity from flashcard group by collection_id;`;
    const [result] = await pool().execute(query);

    if (!result)
        return false;

    return result;
} // countCollectionItem

export async function collection_AddToCollection(collection_id, id) {
    const query = `update flashcard set collection_id = ${collection_id} where id = ${id};`;
    const [result] = await pool().execute(query);

    if (result?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Successfully added to the collection'
    };
} // countCollectionItem

export async function collection_AddToCollection2(flashcard_id, collection_id) {
    const query = `insert into flashcard_collection_id(flashcard_id, collection_id) values(?, ?);`;
    const values = [flashcard_id, collection_id];
    const [result] = await pool().execute(query, values);

    if (result?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Successfully added to the collection'
    };
} // countCollectionItem