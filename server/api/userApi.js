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

// 增加用户接口
router.post('/addUser', (req, res) => {
  let sql = $sql.user.add;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.username, params.password], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});



//查找用户接口
router.post('/findUser', (req, res) => {
    var sql_name = $sql.user.select_name;
    console.log(sql_name);
    var cc = sql_name;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    //console.log(params);
    if (params.username) {
        sql_name += " where username ='"+ params.username +"'";
    }
    // var keywords = JSON.parse(Object.keys(params)[0]);

    //console.log(sql_name);
    conn.query(sql_name, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (!result[0]) {
            res.send('-1');  //查询不出username，data 返回-1
        } 
        else {
            var resultArray = result[0];
            console.log(resultArray.password);
            //console.log(keywords);
            if(resultArray.password == params.password) {
                jsonWrite(res, result);
            } 
        else {
            res.send('0') ;  //passwor不匹配
        }
        }
    })
});

//获取用户信息
router.get('/getUser', (req, res) => {
    var sql_name = $sql.user.select_name;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    console.log(params);
    if (params.username) {
        sql_name += " WHERE username ='"+ params.username +"'";
    }
    conn.query(sql_name, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result[0] === undefined) {
            res.send('-1')   //查询不出username，data 返回-1
        } else {
            jsonWrite(res, result);
        }
    })
});

//  用户组长登录信息验证
router.post('/findLeader', (req, res) => {
  var sql_name = $sql.leader.select_name;
  // var sql_password = $sql.user.select_password;
  var params = req.body;
  //console.log(params);
  if (params.username) {
      sql_name += " WHERE name ='"+ params.username +"'";
  }
  // var keywords = JSON.parse(Object.keys(params)[0]);

  //console.log(sql_name);
  conn.query(sql_name, params.username, function(err, result) {
      if (err) {
          console.log(err);
      }
      console.log(result[0].name);
      if (!result[0]) {
          res.send('-1');  //查询不出name，data 返回-1
      } 
      else {
          var resultArray = result[0];
          console.log(resultArray.password);
          //console.log(keywords);
          if(resultArray.password == params.password) {
              jsonWrite(res, result);
          } 
      else {
          res.send('0') ;  //passwor不匹配
      }
      }
  })
});


//  上传文件
router.use(formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: '../src/assets',//保存图片的目录
    multiples: true, // req.files to be arrays of files
    keepExtensions: true//保留后缀
  }));

/* POST page. */
router.post('/postFile', function(req, res, next) {
    var sql_name = $sql.news.add;
    var params = req.body;
    console.log('文件地址：'+req.files.file.path);
    console.log(req.fields);
    console.log(params);
    console.log(req.files.file.path);
    conn.query(sql_name, [req.fields.filename,req.files.file.path], function(err, result) {
        if (err) {
            console.log(err);
        }
        else {
            jsonWrite(res, result); //把文件存储到数据库，存储成功
        }
    })
});

// 查找news数据集
router.post('/leadershowdata', (req, res) => {
    var sql_name = $sql.news.select_name;

    console.log(sql_name);
    conn.query(sql_name, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (!result[0]) {
            res.send('-1');  //查询不出username，data 返回-1
        } 
        else {
            jsonWrite(res, result);
        }
    })
});

router.post('/usershowdata', (req, res) => {
    var sql_name = $sql.news.select_name;

    console.log('testtt');
    conn.query(sql_name, function(err, result) {
        if (err) {
            console.log(err);
        }
        //  console.log(result);
        if (!result[0]) {
            res.send('-1');  //查询不出username，data 返回-1
        } 
        else {
            jsonWrite(res, result);
        }
    })
});


module.exports = router;