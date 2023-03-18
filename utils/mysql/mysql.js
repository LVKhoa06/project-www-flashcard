import pool from './pool';

//#region Flashcard ----------------------------------------------- START

export async function flashcard_create(topic_id, term, description, date) {
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

// stored proc. // trigger
export async function flashcard_remove(id) {
    const query1 = `insert into flashcard_bin select * from flashcard where id = ${id};`;
    const [data1] = await pool().execute(query1);

    if (data1?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    const query2 = `insert into flashcard_collection_id_bin select * from flashcard_collection_id where flashcard_id = ${id};`;
    const [data2] = await pool().execute(query2);
    const query3 = `delete from flashcard_collection_id where flashcard_id = ${id};`;
    const [data3] = await pool().execute(query3);

    const query4 = `delete from flashcard where id = ${id};`;
    const [data] = await pool().execute(query4);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Xóa flashcard thành công'
    };
} // flashcard_remove

export async function flashcard_update(id, field, value) {
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

export async function flashcard_getWithCondition(topic_id, field, orderBy, direction) {
    let query = `select * from flashcard 
    ${topic_id ? `where flashcard.${field} = ${topic_id}` : ''} 
    ${orderBy ? `order by ${orderBy} ${direction}` : ''};`

    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // getFlashcardWithCondition

export async function flashcard_getAFlashcard(id) {
    let query = `select * from flashcard where id = ${id}`
    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // getFlashcardWithCondition

export async function flashcard_search(key) {
    const query = ` 
    select * from flashcard f
    inner join topic t
    on f.topic_id = t.topic_id
    where f.term like '%${key}%' or f.description like '%${key}%' limit 5`
    const [result] = await pool().execute(query);

    if (!result)
        return false;
    return result;
} // searchFlashcard

export async function flashcard_getWithCollection(id) {
    const query = ` 
    select * from flashcard f inner join flashcard_collection_id fc
    on f.id = fc.flashcard_id where fc.collection_id = ${id};`
    const [result] = await pool().execute(query);

    if (!result)
        return false;
    return result;
} // searchFlashcard

export async function flashcard_getWithKeyword(key) {
    const query = ` 
    select * from flashcard where description like '%${key}%' or term like '%${key}%'`
    const [result] = await pool().execute(query);

    if (!result)
        return false;
    return result;
} // searchFlashcard
//#endregion Flashcard -------------------------------------------- END


//#region Topic ----------------------------------------------- START
export async function topic_getAll() {
    const query = `select * from topic;`;
    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // getAllTopic

export async function topic_countItem() {
    const query = `select * from count_topic;`;
    const [result] = await pool().execute(query);

    if (!result)
        return false;

    return result;
} // countTopicItem

export async function topic_curTopic(id) {
    const query = `select f.id, f.topic_id, t.topic from flashcard f left join topic t on t.topic_id = f.topic_id where f.id = ${id};`;
    const [result] = await pool().execute(query);

    if (!result)
        return false;

    return result;
} // topic_curTopic

export async function topic_changeTopic(id, topic_id) {
    const query = `update flashcard set topic_id = ? where id = ${id};`;
    const [result] = await pool().execute(query, [topic_id]);

    if (result?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Change topic collection Successfull'
    };
} // topic_changeTopic

//#endregion Topic -------------------------------------------- END


//#region Collection ----------------------------------------------- START
export async function collection_getAll() {
    const query = `select * from collection;`;
    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // getAllCollection

export async function collection_deleteItemCollection(f_id, c_id) {
    const q1 = `delete from flashcard_collection_id where flashcard_id = ${f_id} and collection_id = ${c_id};`
    const [result] = await pool().execute(q1);

    if (result?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Delete collection Successfull'
    };
} // collection_AddToCollection


export async function collection_delete(id) {
    const q1 = `delete from flashcard_collection_id where collection_id = ${id};`
    const [r1] = await pool().execute(q1);

    const query = `delete from collection where collection_id = ${id};`;
    const [result] = await pool().execute(query);

    if (result?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Delete collection Successful'
    };
} // collection_AddToCollection

// flashcard_addToCollection
// flashcard_removeFromCollection
export async function collection_addItem(flashcard_id, collection_id) {
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
} // collection_AddToCollection

export async function collection_countItem() {
    const query = `select * from count_collection;`;
    const [result] = await pool().execute(query);

    if (!result)
        return false;

    return result;
} // countCollectionItem

export async function collection_add(field, value) {
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

export async function collection_getSelectedItem(id) {
    const query = `select * from flashcard_collection_id fc where fc.flashcard_id = ${id};`;
    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // collection_getSelectedItem

export async function collection_update(id, field, value) {
    const query = `update collection set ${field} = '${value}' where collection_id = ${id};`;
    const [data] = await pool().execute(query);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Rename collection successful'
    };
} // collection_update

//#endregion Collection -------------------------------------------- END

//#region Collection -------------------------------------------- START

export async function bin_getAll() {
    const query = `select * from flashcard_bin;`;
    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // bin_getAll

export async function bin_remove(id) {
    const query1 = `delete from flashcard_collection_id_bin where flashcard_id = ${id};`;
    const [data1] = await pool().execute(query1);

    const query = `delete from flashcard_bin where id = ${id};`;
    const [data] = await pool().execute(query);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Xóa flashcard thành công'
    };
} // bin_getAll


export async function bin_recover(id) {
    const query1 = `insert into flashcard select * from flashcard_bin where id = ${id};`;
    const [data1] = await pool().execute(query1);

    if (data1?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    const query2 = `insert into flashcard_collection_id select * from flashcard_collection_id_bin where flashcard_id = ${id};`;
    const [data2] = await pool().execute(query2);
    const query3 = `delete from flashcard_collection_id_bin where flashcard_id = ${id};`;
    const [data3] = await pool().execute(query3);

    const query = `delete from flashcard_bin where id = ${id};`;
    const [data] = await pool().execute(query);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Xóa flashcard thành công'
    };
} // bin_recover

//#endregion Collection -------------------------------------------- END
