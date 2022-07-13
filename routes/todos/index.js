import debug from 'debug'
import { api } from '../../global.js'
import {
    operateDeleteMany,
    operateFindAndToArray,
    operateInCollection,
    operateUpsertMany
} from '../../mongodb/index.js'

const COLL_NAME = api.cs[2]

/* 读取一个或多个todo */
async function rs(req, res, next) {
    const filter = req.body
    const sort = { createdTime: -1 }
    try {
        const todos = await operateInCollection(operateFindAndToArray(filter, sort), COLL_NAME)
        debug('db:todos:find')(todos)
        res.send(todos)
    }
    catch (err) {
        next(err)
    }
}

/* 更新todos */
async function us(req, res, next) {
    let { entities, ids, userId } = req.body
    entities = ids.map(id => {
        // eslint-disable-next-line no-unused-vars
        const { _id, ...others } = entities[id]
        return { ...others, userId }
    })
    const deleteFilter = { completed: true }

    try {
        const upsertResult = await operateInCollection(operateUpsertMany(ids, entities), COLL_NAME)
        const deleteResult = await operateInCollection(operateDeleteMany(deleteFilter), COLL_NAME)
        const done = upsertResult && deleteResult.acknowledged
        res.send({ done })
    }
    catch (err) {
        next(err)
    }
}

export default function todosRoute(app) {
    app.post('/' + api.rs, rs)
    app.post('/' + api.us, us)
}