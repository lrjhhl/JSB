var express = require('express')
const checktokenMiddlewares = require('../../middlewares/checktotkenMiddlewares')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
// const adapter = new FileSync(__dirname + '/../data/db.json')
// const db = low(adapter)
const moment = require('moment')
const jwt = require('jsonwebtoken')
const AccountModel = require('../../model/Account')
/* GET home page. */
var router = express.Router()

router.get('/account', checktokenMiddlewares, function (req, res, next) {
    // res.render('index', { title: 'Express' });
    //获取db中的数据
    // const accounts = db.get('accounts').value()
    AccountModel.find().sort({ time: -1 }).then(data => {
        // res.render('list', { accounts: data, moment })
        res.json({
            code: '0000',
            msg: '读取成功',
            data: data,
        })
    }).catch(err => {
        res.json({
            code: '1001',
            msg: '读取失败',
            data: null,
        })
    }
    )
    // res.render('list', { accounts: accounts })

});
router.get('/account/create', checktokenMiddlewares, function (req, res, next) {
    res.render('create')
});

router.post('/account', checktokenMiddlewares, function (req, res, next) {
    // console.log(req.body)
    // const id = shortid.generate()
    // db.get('accounts').unshift({ id: id, ...req.body }).write()
    // console.log(req.body)
    // console.log(moment("2023-12-13").toDate())
    AccountModel.create({ ...req.body, time: moment(req.body.time).toDate() }).then(data => {
        // res.render('success', { title: "添加成功了", url: "/account" })
        res.json({
            code: '0000',
            msg: '添加成功',
            data: data,
        })
    }).catch(err => {
        // res.status(500).send('出错了')
        res.json({
            code: '1002',
            msg: '添加失败',
            data: null,
        })
    })
    // res.render('success', { title: "添加成功了", url: "/account" })
});

router.delete('/account/:id', checktokenMiddlewares, function (req, res, next) {
    const id = req.params.id
    // db.get('accounts').remove({ id: id }).write()
    AccountModel.deleteOne({ _id: id }).then(data => {
        // res.render('success', { title: "删除成功", url: "/account" })
        res.json({
            code: '0000',
            msg: '删除成功',
            data: null,
        })
    }).catch(err => {
        // res.status.send('失败了')
        res.json({
            code: '1003',
            msg: '删除失败',
            data: null,
        })
    })
    // res.render('success', { title: "删除成功", url: "/account" })
});
router.get('/account/:id', checktokenMiddlewares, (req, res) => {
    const { id } = req.params
    AccountModel.findById(id).then(data => {
        res.json({
            code: '0000',
            msg: '单条读取成功',
            data: data,
        })
    }).catch(err => {
        res.json({
            code: '1004',
            msg: '读取失败',
            data: null
        })
    })
})
router.patch('/account/:id', checktokenMiddlewares, (req, res) => {
    const { id } = req.params
    AccountModel.updateOne({ _id: id }, req.body).then(data => {
        AccountModel.findById(id).then(data => {
            res.json({
                code: '0000',
                msg: "更新成功",
                data: data,
            })
        }).catch(err => {
            res.json({
                code: '1004',
                msg: "读取失败",
                data: null,
            })
        })

    }).catch(err => {
        res.json({
            code: '1005',
            msg: "更新失败",
            data: null,
        })
    })
})
module.exports = router;
