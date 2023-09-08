import debug from 'debug';
import {
  operateDeleteMany,
  operateDocsCount,
  operateFindAndToArray,
  operateInCollection,
  operateUpdateOne,
} from './index.js';

export default function connectDb(session) {
  const Store = session.Store;
  /*
    按照express-session要求实现的数据库接口
    https://github.com/expressjs/session#session-store-implementation
    */
  return class MongodbStore extends Store {
    constructor(collName = 'sessions', ttl) {
      super(collName);
      this.collName = collName;
      this.ttl = ttl; //millisecond
    }

    //express-session required
    async set(sid, session, cb) {
      debug('session')(session);
      const filter = { sid };
      const doc = {
        $set: {
          sid,
          session,
          expiredAt: new Date(Date.now() + this.ttl),
        },
      };
      const opts = { upsert: true };

      try {
        await operateInCollection(
          operateUpdateOne(filter, doc, opts),
          this.collName
        );
      } catch (err) {
        return cb(err);
      }
      cb();
    }

    //express-session required
    async get(sid, cb) {
      let result;
      try {
        result = await operateInCollection(
          operateFindAndToArray({ sid }),
          this.collName
        );
      } catch (err) {
        return cb(err);
      }
      cb(undefined, result[0]?.session);
    }

    //express-session required
    async destroy(sid, cb) {
      this._deleteMany({ sid }, cb);
    }

    //express-session recommended
    async touch(sid, session, cb) {
      const filter = { sid };
      const doc = {
        $set: {
          expiredAt: new Date(Date.now() + this.ttl),
        },
      };
      try {
        await operateInCollection(operateUpdateOne(filter, doc), this.collName);
      } catch (err) {
        return cb(err);
      }
      cb();
    }

    //express-session optional
    async length(cb) {
      let result;
      try {
        result = await operateInCollection(operateDocsCount(), this.collName);
      } catch (err) {
        return cb(err);
      }
      cb(undefined, result);
    }

    //express-session optional
    async all(cb) {
      let result;
      try {
        result = await operateInCollection(
          operateFindAndToArray(),
          this.collName
        );
      } catch (err) {
        return cb(err);
      }
      cb(
        undefined,
        result.map((doc) => doc.session)
      );
    }

    //express-session optional
    async clear(cb) {
      this._deleteMany({}, cb);
    }

    //helper, for express-session
    async _deleteMany(filter, cb) {
      try {
        await operateInCollection(operateDeleteMany(filter), this.collName);
      } catch (err) {
        return cb(err);
      }
      cb();
    }
  };
}
