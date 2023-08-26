import debug from 'debug';
import { MongoClient } from 'mongodb';

const DB_URL = 'mongodb://127.0.0.1:27017';
// const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = process.env.NODE_ENV === 'production' ? 'myweb' : 'test';
const COLLECTIONS = ['sessions', 'users', 'todos'];

/* 连接数据库，执行数据库操作 */
export async function operateInCollection(
  operator,
  collName,
  dbName = DB_NAME,
  dbUrl = DB_URL
) {
  const client = new MongoClient(dbUrl);
  try {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collName);
      return await operator(collection);
    } finally {
      await client.close();
    }
  } catch (err) {
    debug('db:err')(err);
    throw err;
  }
}

//以下是对数据库操作的包装，返回值为operateInCollection的第一个参数
export function operateUpdateOne(filter, doc, opts = {}) {
  return async function (collection) {
    return await collection.updateOne(filter, doc, opts);
  };
}

export function operateUpsertMany(ids, entities, opts = { upsert: true }) {
  return async function (collection) {
    let success = true;
    for (let i = 0; i < ids.length; i++) {
      const filter = { id: ids[i] };
      const doc = { $set: entities[i] };
      const result = await collection.updateOne(filter, doc, opts);
      success &&= result.acknowledged;
    }
    return success;
  };
}

export function operateFindAndToArray(filter, sort = {}) {
  return async function (collection) {
    const cursor = collection.find(filter).sort(sort);
    return await cursor.toArray();
  };
}

export function operateDocsCount() {
  return async function (collection) {
    return await collection.estimatedDocumentCount();
  };
}

export function operateInsertOne(doc) {
  return async function (collection) {
    return await collection.insertOne(doc);
  };
}

export function operateDeleteMany(filter) {
  return async function (collection) {
    return await collection.deleteMany(filter);
  };
}

export function operateCreateIndex(fields, opts = {}) {
  return async function (collection) {
    return await collection.createIndex(fields, opts);
  };
}

export function operateIndexExists(fieldsName) {
  return async function (collection) {
    return await collection.indexExists(fieldsName);
  };
}

export function operateFindOne(filter, opts = {}) {
  return async function (collection) {
    return await collection.findOne(filter, opts);
  };
}

//以下是初始化数据库
async function initializeExpiredIndex(collName) {
  const existed = await operateInCollection(
    operateIndexExists('expiredAt_1'),
    collName
  );
  debug('db:init:indexExists')(existed);
  if (existed) return;

  const fields = { expiredAt: 1 };
  const opts = { expireAfterSeconds: 0 };
  const result = await operateInCollection(
    operateCreateIndex(fields, opts),
    collName
  );
  debug('db:init:createIndex')(result);
}

async function initializeCollections(dbName = DB_NAME, dbUrl = DB_URL) {
  const client = new MongoClient(dbUrl);

  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.listCollections({}, { nameOnly: true }).toArray();
    const existedColls = result.map((item) => item.name);
    debug('db:init:listCollections')(existedColls);

    for (const coll of COLLECTIONS) {
      if (!existedColls.includes(coll)) {
        await db.createCollection(coll);
      }
    }
  } finally {
    await client.close();
  }
}

export default async function initDb() {
  try {
    await initializeCollections();
    await initializeExpiredIndex('sessions');
  } catch (err) {
    console.log('initDb()', err);
  }
}
