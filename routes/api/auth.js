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
const jwt = require('jsonwebtoken')

//注册


router.post('/login', (req, res) => {
    const { username, password } = req.body
    UserModel.findOne({ username: username, password: md5(password) }).then(data => {
        // console.log(data.username)
        if (!data) {
            // return res.status(500).send('密码错误')
            res.json({
                code: "2001",
                msg: '密码错误',
                data: null,
            })
            return
        }
        // req.session.username = data.username
        // req.session.username = data.username
        // req.session.password = data.password
        // req.session._id = data.id
        // res.render('success', { title: "登录成功了", url: "/account" })
        const token = jwt.sign({ username: data.username, _id: data._id }, 'atguigu', { expiresIn: 60 * 60 * 24 * 7 })
        res.json({
            code: '0000',
            msg: '登录成功',
            data: token
        })

    }).catch(err => {
        // res.status(500).send('登录失败')
        res.json({
            code: "2002",
            msg: '登录失败',
            data: null,
        })
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
