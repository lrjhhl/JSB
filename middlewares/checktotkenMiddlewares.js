const jwt = require('jsonwebtoken')

const { secret } = require('../config/config')
module.exports = (req, res, next) => {
    const token = req.get('token')
    if (!token) {
        res.json({
            code: '2004',
            msg: 'token 缺失',
            data: null
        })
        return
    }
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            res.json({
                code: '2003',
                msg: 'token 校验失败',
                data: null
            })
            return
        }
        next()

    })
}