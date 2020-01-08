var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var bodyParser = require('body-parser');//用于req.body获取值的
var formidable = require('formidable'); //添加到数据库的插件


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
        //console.log(result[0].username);
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
        sql_name += "where username ='"+ params.username +"'";
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
      sql_name += " where name ='"+ params.username +"'";
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
router.post("/postFile",function(req,res,next){
    var form = new formidable.IncomingForm();
    //设置文件上传存放地址
    //form.uploadDir = "./public/images";
    //执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, files) {
        console.log("files:",files)  //这里能获取到图片的信息
        console.log("fields:",fields) //这里能获取到传的参数的信息，如上面的message参数，可以通过fields。message来得到
        
    })
})

module.exports = router;