//1. 安装 mongoose
//2. 导入 mongoose
const { DBHOST, DBRORT, DBNAME } = require('../config/config.js')
module.exports = ((Success, Err) => {
    const mongoose = require('mongoose');

    //设置 strictQuery 为 true
    mongoose.set('strictQuery', true);

    //3. 连接 mongodb 服务                        数据库的名称
    mongoose.connect(`mongodb://${DBHOST}:${DBRORT}/${DBNAME}`);
    mongoose.connection.on('error', () => {
        Err()
    });

    //设置连接关闭的回调
    mongoose.connection.on('close', () => {
        console.log('连接关闭');
    });
    mongoose.connection.once('open', () => {
        Success()

    })
})