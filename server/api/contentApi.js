var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var bodyParser = require('body-parser');//用于req.body获取值的
let formidableMiddleware = require('express-formidable');
var fs = require('fs');


// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};
//  用户请求打开文本的文字内容
router.post('/abc', (req, res) => {
    var params = req.body;
    console.log(params);
    var sql = params.userpath;
    console.log(sql);
    fs.readFile(sql, function (err, data) {
        if (err) {
            console.log(err);
        }
        console.log("异步读取: " + data.toString());
        jsonWrite(res, data.toString());
     });
});

module.exports = router;    