import { postData } from "../../tools/helper/index.js"
import { dataHost, dataPort } from '../../tools/variables/index.js'

const readTodos = async (query) => {
    const res = await postData(`https://${dataHost}:${dataPort}/api/readTodos`, query)
    if (res.fail) return []
    return res
}

const upsertTodos = async (data) => {
    const res = await postData(`https://${dataHost}:${dataPort}/api/upsertTodos`, data)
    if (res.fail) return {}
    return res
}

const fetch = {
    readTodos,
    upsertTodos
}

export default fetch