var express = require('express')
var router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
// const adapter = new FileSync(__dirname + '/../data/db.json')
// const db = low(adapter)
const moment = require('moment')
const AccountModel = require('../../model/Account')
/* GET home page. */

const middlewares = require('../../middlewares/middlewares')

router.get('/account', middlewares, function (req, res, next) {
  // res.render('index', { title: 'Express' });
  //获取db中的数据
  // const accounts = db.get('accounts').value()
  AccountModel.find().sort({ time: -1 }).then(data => {
    res.render('list', { accounts: data, moment })
  }).catch(err => {
    res.status(500).send('出错了')
  }
  )
  // res.render('list', { accounts: accounts })

});
router.get('/account/create', middlewares, function (req, res, next) {
  res.render('create')
});

router.post('/account', middlewares, function (req, res, next) {
  // console.log(req.body)
  // const id = shortid.generate()
  // db.get('accounts').unshift({ id: id, ...req.body }).write()
  // console.log(req.body)
  // console.log(moment("2023-12-13").toDate())
  AccountModel.create({ ...req.body, time: moment(req.body.time).toDate() }).then(data => {
    res.render('success', { title: "添加成功了", url: "/account" })
  }).catch(err => {
    res.status(500).send('出错了')
  })
  // res.render('success', { title: "添加成功了", url: "/account" })
});

router.get('/account/:id', middlewares, function (req, res, next) {
  const id = req.params.id
  // db.get('accounts').remove({ id: id }).write()
  AccountModel.deleteOne({ _id: id }).then(data => {
    res.render('success', { title: "删除成功", url: "/account" })
  }).catch(err => {
    res.status(500).send('失败了')
  })
  // res.render('success', { title: "删除成功", url: "/account" })
});

module.exports = router;
