import SQLite from 'react-native-sqlite-storage';
import {TTodo} from '@/types/main';

SQLite.enablePromise(true);

const getDB = async () => {
  try {
    const db = await SQLite.openDatabase({
      name: 'be-productive.db',
      location: 'default',
    });

    return db;
  } catch (error: any) {
    throw error;
  }
};

export const createTodosTable = async () => {
  try {
    const db = await getDB();

    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS todos (
          id INTEGER PRIMARY KEY NOT NULL,
          todo TEXT NOT NULL,
          start TEXT NOT NULL,
          end TEXT NOT NULL
      )`,
    );
  } catch (error: any) {
    throw error;
  }
};

export const getTodos = async (): Promise<TTodo[]> => {
  const db = await getDB();

  try {
    const response = await db.executeSql('SELECT * FROM todos');

    const results = response[0].rows.raw();

    const formattedResults = results.map(item => ({
      ...item,
      start: new Date(item.start),
      end: new Date(item.end),
    }));

    return formattedResults;
  } catch (error: any) {
    throw error;
  }
};

export const getTodo = async (id: number): Promise<TTodo> => {
  const db = await getDB();

  try {
    const response = await db.executeSql('SELECT * FROM todos WHERE id=?', [
      id,
    ]);

    const result = response[0].rows.raw()[0];

    const formattedResult = {
      ...result,
      start: new Date(result.start),
      end: new Date(result.end),
    };

    return formattedResult;
  } catch (error: any) {
    throw error;
  }
};

export const addTodo = async ({
  todo,
  start,
  end,
}: {
  todo: string;
  start: Date;
  end: Date;
}) => {
  const db = await getDB();

  try {
    const result = await db.executeSql(
      'INSERT INTO todos (todo, start, end) VALUES (?, ?, ?)',
      [todo, start.toISOString(), end.toISOString()],
    );

    return result;
  } catch (error: any) {
    throw error;
  }
};

export const editTodo = async ({
  id,
  todo,
  start,
  end,
}: {
  id: number;
  todo: string;
  start: Date;
  end: Date;
}) => {
  const db = await getDB();

  try {
    const result = await db.executeSql(
      'UPDATE todos SET todo = ?, start = ?, end = ? WHERE id=?',
      [todo, start.toISOString(), end.toISOString(), id],
    );

    return result;
  } catch (error: any) {
    throw error;
  }
};

export const deleteTodo = async (id: number) => {
  const db = await getDB();

  try {
    const result = await db.executeSql('DELETE FROM todos WHERE id=?', [id]);

    return result;
  } catch (error: any) {
    throw error;
  }
};
