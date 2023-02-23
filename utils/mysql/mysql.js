import pool from './pool';

export async function test() {
    const query = `select * from flashcard;`;
    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data[0];
} // test