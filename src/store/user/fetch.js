import { getData, postData } from '../../tools/helper/index.js'
import { dataHost, dataPort } from '../../tools/variables/index.js'

/*
    后端对users的所有请求都以res.send结束，不存在返回的status等于500（服务器错误）的情况
    但是存在网络错误，所以要返回下面的err
*/
const err = {
    code: '44',
    msg: '网络错误'
}
const fetch = {
    async register(user) {
        const res = await postData(`https://${dataHost}:${dataPort}/api/register`, user)
        if (res.fail) return err
        return res
    },
    async login(user) {
        const res = await postData(`https://${dataHost}:${dataPort}/api/login`, user)
        if (res.fail) return err
        return res
    },
    async logout() {
        const res = await postData(`https://${dataHost}:${dataPort}/api/logout`)
        if (res.fail) return err
        return res
    },
    async getUser() {//GET
        const res = await getData(`https://${dataHost}:${dataPort}/api/getUser`)
        if (res.fail) return {}
        return res
    },
    async savePreference(data) {
        const res = await postData(`https://${dataHost}:${dataPort}/api/savePreference`, data)
        if (res.fail) return
        return res
    },
    async saveTic(data) {
        const res = await postData(`https://${dataHost}:${dataPort}/api/saveTic`, data)
        if (res.fail) return
        return res
    },
}

export default fetch