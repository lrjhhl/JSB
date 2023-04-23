const mongoose = require('mongoose')
let AccountSchema = new mongoose.Schema({
    // id: String,
    title: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    type: {
        type: Number,
        default: -1
    },
    account: {
        type: Number,
        required: true,
    },
    remarks: String,
});

//6. 创建模型对象  对文档操作的封装对象    mongoose 会使用集合名称的复数, 创建集合
let AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel