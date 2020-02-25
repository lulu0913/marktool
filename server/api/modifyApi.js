var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var bodyParser = require('body-parser');//用于req.body获取值的
let formidableMiddleware = require('express-formidable');
var fs = require('fs');
var async = require('async'); 

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

//  请求最终标记的文本
router.post('/getfinal', (req, res) => {
    var params = req.body;
    console.log(params);
    var filename = params.filename;
    var newname = params.username + params.filename;
    var sql_name = $sql.finaldata.select_name;
    var sql_select = $sql.news.select_name;
    var filepath;
    sql_name += " WHERE newname ='"+ newname +"'"; // 查找用户组长保存的最终版数据集的路径
    sql_select += " WHERE filename ='"+ filename +"'"; // 用户组长没有保存最终版就返回原来的路径

    async.waterfall([
        function(callback){
            // 如果是新创建的文件就将刚才写入的文件地址保存在数据库中
            conn.query(sql_name, function(err, result) {
              if (err) {
                console.log(err);
              }else{
                result = JSON.stringify(result);
                result = JSON.parse(result);
                callback(null,result);
              }
            }) //如果有error异常处理，否则向下一个函数传递参数 result
        },
        function(n, callback){ //接受参数result
            if(n.length == 0){  
                jsonWrite(res, 0);
            }else{
                filepath = n[0].filepath;
                var data = fs.readFileSync(filepath);
                jsonWrite(res, data.toString());
            }
            console.log(n);
        },
    ], function(err, results){
            //如果有error则执行此处函数
            if(err){
                console.log('异常处理');
         }
    })
});


module.exports = router;