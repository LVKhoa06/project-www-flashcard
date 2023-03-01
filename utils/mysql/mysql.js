import pool from './pool';

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
} // getAllFlashcard

export async function getFlashcardWithCondition(topic_id, orderBy, direction) {
    let query = `select * from flashcard 
    ${topic_id ? `where flashcard.topic_id = ${topic_id}` : ''} 
    ${orderBy ? `order by ${orderBy} ${direction}` : ''};`

    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // getFlashcardWithCondition

export async function searchFlashcard(key) {
    // Create temporary table
    const createTable = `
    create view search_result as 
    select * from flashcard
    having flashcard.term like '%${key}%' or description like '%${key}%' limit 50;`;
    const [created] = await pool().execute(createTable);

    // Search data in temporary table
    const topicResult =`
    select *
    from search_result 
    inner join topic
    on search_result.topic_id = topic.topic_id;`
    const [topic] = await pool().execute(topicResult);
    
    // Delete temporary table
    const dropTable = `DROP VIEW search_result;`
    const [ok] = await pool().execute(dropTable);

    if (!topic)
        return false;
    return topic;
}

export async function createTopic(topic, field) {
    const query = `insert into ${field}(${field}) values(${topic});`;
    const [data] = await pool().execute(query);

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