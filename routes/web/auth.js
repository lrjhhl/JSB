var express = require('express')
var router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
// const adapter = new FileSync(__dirname + '/../data/db.json')
// const db = low(adapter)
const moment = require('moment')
const md5 = require('md5')
// const AccountModel = require('../../model/Account')
const UserModel = require('../../model/UserModel')
/* GET home page. */
//注册

router.get('/', (req, res) => {
    res.redirect('/account')
})
router.get('/log', (req, res) => {
    res.render('auth/log')
})
router.post('/log', (req, res) => {
    UserModel.create({ ...req.body, password: md5(req.body.password) }).then(data => {
        console.log(req.body)
        res.render('success', { title: "注册成功了", url: "/login" })
    }).catch(err => {
        res.status(500).send('失败了')
    })
})

//登录
router.get('/login', (req, res) => {
    res.render('auth/login')
})
router.post('/login', (req, res) => {
    const { username, password } = req.body
    UserModel.findOne({ username: username, password: md5(password) }).then(data => {
        // console.log(data.username)
        if (!data) {
            return res.status(500).send('密码错误')
        }
        req.session.username = data.username
        // req.session.username = data.username
        req.session.password = data.password
        req.session._id = data.id
        res.render('success', { title: "登录成功了", url: "/account" })

    }).catch(err => {
        res.status(500).send('登录失败')
        return
    })
})

//退出
router.post('/loginout', (req, res) => {
    // res.render('auth/login')
    req.session.destroy(() => {
        res.render('success', { title: "退出成功了", url: "/login" })
    })
})
module.exports = router;
