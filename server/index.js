const userApi = require('./api/userApi');
const contentApi = require('./api/contentApi');
const modifyApi = require('./api/modifyApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// 以下 配置允许跨域请求； **********一定要放在上面**********
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// 后端api路由
app.use('/api/user', userApi);
app.use('/api/content', contentApi);
app.use('/api/modify', modifyApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');