/* eslint-disable no-unused-vars */
import debug from 'debug'
import { nanoid } from 'nanoid'
import { GUEST_ID } from '../../global.mjs'
import {
    operateFindAndToArray,
    operateFindOne,
    operateInCollection,
    operateInsertOne,
    operateUpdateOne
} from '../../mongodb/index.mjs'

const COLL_NAME = 'users'

/* 读取全部users，存储在req */
async function readUsers(req, res, next) {
    try {
        const users = await operateInCollection(operateFindAndToArray({}), COLL_NAME)
        req._existedUsers = users
        debug('db:users')(req._existedUsers)
        next()
    }
    catch (err) {
        res.send({
            code: '04',
            msg: '服务器错误'
        })
    }
}

/* 注册 */
async function register(req, res, next) {
    const userId = nanoid(5)
    const newUser = { ...req.body, userId }//preference也保存了

    if (req._existedUsers.map(user => user.username).includes(newUser.username)) {
        res.send({
            code: '11',
            msg: '用户名已存在'
        })
    }
    else {
        try {
            await operateInCollection(operateInsertOne(newUser), COLL_NAME)
            /* 赋值session.userId即表示登录 */
            req.session.userId = userId//给此session绑定上userId

            const { password, ...user } = newUser
            res.send({
                user,/* 前端通过这个属性来判断 */
                code: '13',//注册并登录
                msg: '注册并登录成功'
            })
        }
        catch (err) {
            res.send({
                code: '14',
                msg: '服务器错误'
            })
        }

    }
}

/* 登录 */
async function login(req, res, next) {
    const comingUser = req.body
    const index = req._existedUsers.map(user => user.username).indexOf(comingUser.username)

    if (index < 0) {
        res.send({
            code: '21',
            msg: '用户名或密码错误'
        })
    }
    else {
        const matchedUser = req._existedUsers[index]
        //password should be crypted and then compared using the crypted string
        if (matchedUser.password === comingUser.password) {
            /* 赋值session.userId即表示登录 */
            req.session.userId = matchedUser.userId//给此session绑定上userId

            const { _id, password, ...user } = matchedUser//返回的是数据库里的preference
            res.send({
                user,
                code: '23',
                msg: '登录成功'
            })
        }
        else {
            res.send({
                code: '22',
                msg: '用户名或密码错误'
            })
        }
    }
}

/* 登出 */
function logout(req, res, next) {
    req.session.userId = GUEST_ID//登出就是把session的userId改成guest，不存储任何数据
    res.send({
        code: '31',
        msg: '已登出'
    })
}

/* 获取用户 */
async function getUser(req, res, next) {
    const userId = req.session.userId

    if (userId === GUEST_ID) {
        res.send({
            userId: GUEST_ID
        })
    }
    else {
        const filter = { userId }
        const opts = { projection: { _id: 0, password: 0 } }
        try {
            const user = await operateInCollection(operateFindOne(filter, opts), COLL_NAME)
            debug('db:users')(user)
            res.send(user)//客户端通过此对象的username属性来确定本次session是否已登录
        }
        catch (err) {
            res.send({
                userId: GUEST_ID
            })
        }
    }
}

/* 保存个人设置 */
async function savePreference(req, res, next) {
    const { theme, element, userId } = req.body
    const filter = { userId }

    let doc
    if (theme) {
        doc = {
            $set: {
                'preference.theme': theme//嵌套的属性用这种方式
            }
        }
    }
    else {
        doc = {
            $set: {
            'preference.element': element
            }
        }
    }

    try {
        const result = await operateInCollection(operateUpdateOne(filter, doc), COLL_NAME)
        res.send(result.acknowledged)
    }
    catch (err) {
        res.send(false)
    }
}

/* 保存tictactoe的数据 */
async function saveTic(req, res, next) {
    const { tic, userId } = req.body
    const filter = { userId }
    const doc = {
        $set: { tic }
    }

    try {
        const result = await operateInCollection(operateUpdateOne(filter, doc), COLL_NAME)
        res.send(result.acknowledged)
    }
    catch (err) {
        res.send(false)
    }
}

export default function usersRoute(app) {
    app.post('/register', readUsers, register)
    app.post('/login', readUsers, login)
    app.post('/logout', logout)
    app.get('/getUser', getUser)
    app.post('/savePreference', savePreference)
    app.post('/saveTic', saveTic)
}