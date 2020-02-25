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
//  用户请求打开文本的文字内容
router.post('/abc', (req, res) => {
    var params = req.body;
    console.log(params);
    var filepath = params.userpath;
    var newname = params.username + params.filename;
    var sql_name = $sql.newsdata.select_name;
    console.log(newname);

    sql_name += " WHERE newname ='"+ newname +"'";

    conn.query(sql_name, newname, function(err, result){
      if(err){
        console.log(err);
      }
      //  如果文件原来没有保存过，那么就打开原始文件
      else if (result.length == 0) {
        filepath = params.userpath;
      }
      // 如果文件原来保存过，那么打开保存的内容
      else{
        console.log(result[0].filepath);
        filepath = result[0].filepath;
      }
      fs.readFile(filepath, function (err, data) {
        if (err) {
          console.log(err);
        }else{
        console.log("异步读取: " + data.toString());
        jsonWrite(res, data.toString());
        }
      });
    })
});

//  用户保存编辑的文档，同时进行一致性检测
router.post('/usersave', (req, res) => {
  var params = req.body;
  // console.log(params);
  var newname = params.username + params.filename;
  var filename = params.filename;
  var username = params.username;
  var filepath = '../src/assets/save/' + params.username + params.filename;
  var filecontent = params.filecontent;
  var allfile;

  var sql_select = $sql.newsdata.select_name + " WHERE filename ='"+ filename +"'";
  var sql_ins = $sql.newsdata.add;
  var sql_name = $sql.newsdata.select_name;
  sql_name += " WHERE newname ='"+ newname +"'";

  // 文本的形式写入用户最新保存的标注数据
  // 如果文件不存在就创建一个
  fs.writeFile(filepath, filecontent,  function(err) {
    if (err) {
      return console.error(err);
    }
  });

  async.waterfall([
    function(callback){
        // 如果是新创建的文件就将刚才写入的文件地址保存在数据库中
        conn.query(sql_name, newname, function(err, result) {
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
        if(n.length == 0){  //首次编辑，保存新文件名和路径
          conn.query(sql_ins, [filename, filepath, username, newname], function(err, result){
            if (err) {
              console.log(err);
            }
            else{
              console.log('文件不存在。添加到数据库');
              callback(null,2);
            }
          })
        }else{
          callback(null,2);
        }
    },
    function(n, callback){ //接受参数2
        console.log(n);
        // 获得所有用户标注的该文件内容
        conn.query(sql_select, filename, function(err, result) {
          if (err) {
            console.log(err);
          }
          else
          {
            result = JSON.stringify(result);
            result = JSON.parse(result);
            // console.log(result);
            for(let j=0;j<result.length;j++)
            {
              var data = fs.readFileSync(result[j].filepath);
              allfile += data.toString();
              if(j == result.length-1){
                if(result.length == 1)
                {
                  allfile = 1;
                }
                jsonWrite(res, allfile);
              }
            }
          }
        }) 
    }
  ], function(err, results){
        //如果有error则执行此处函数
        if(err){
            console.log('异常处理');
        }
  })
});

// 用户组长查看用户标注的文件
router.post('/datamarked', (req, res) => {
  var sql_name = $sql.newsdata.distinct;
  var sql_count = $sql.newsdata.count;
  var sql_getk = $sql.newsdata.get_k;

  async.waterfall([
    function(callback){
      conn.query(sql_name, function(err, result) {
        if (err) {
          console.log(err);
        }else{
          result = JSON.stringify(result);
          result = JSON.parse(result);
          callback(null,result);
        }  //如果有error异常处理，否则向下一个函数传递参数result
      })
    },

    function(n, callback){
      let temp = new Array();
      for (let i = 0; i < n.length; i++){
        sql = sql_count + " WHERE filename ='"+ n[i].filename +"'"
        conn.query(sql, function(err, result) {
          if (err) {
            console.log(err);
          }else{
            // console.log(result[0]);
            temp[i] = result[0];
            if(i == n.length-1){
              callback(null, n, temp)
            }
          }
        })
      }
    },

    function(n, temp, callback){ 
      for (let i = 0; i < n.length; i++){
        sql = sql_getk + " WHERE filename ='"+ n[i].filename +"'"
        conn.query(sql, function(err, result) {
          if (err) {
            console.log(err);
          }else{
            // console.log(result[0]);
            n[i].k = result[0].kvalue;
            if(i == n.length-1){
              callback(null, n, temp)
            }
          }
        })
      }
    },

    function(n, temp, callback){ 
      for(let i=0; i<n.length; i++){
        n[i].number = temp[i].number;
      }
      console.log(n);
      jsonWrite(res, n)
    }

  ], function(err, results){
      //如果有error则执行此处函数
      console.log('异常处理');
  })
})

//  用户组长下载文本文件
router.post('/txt', (req, res) => {
  var params = req.body;
  console.log(params);
  var filepath = params.filepath;

  fs.readFile(filepath, function (err, data) {
    if (err) {
      console.log(err);
    }else{
    console.log("异步读取: " + data.toString());
    jsonWrite(res, data.toString());
    }
  });
});

//  将前端算出的k值保存到数据库中
router.post('/setk', (req, res) => {
  var params = req.body;
  var k = params.k_value;
  var filename = params.filename;
  var sql_setk = $sql.newsdata.set_k + " WHERE filename ='"+ filename +"'";
  console.log(k);
  conn.query(sql_setk, k, function(err, result) {
    if (err) {
        console.log(err);
    }
    else
    {
      jsonWrite(res,1)
    }
  })

});

//  获取本篇标注的用户
router.post('/leadermark', (req, res) => {
  var params = req.body;
  var filename = params.filename;
  var sql_getuername = $sql.newsdata.get_username + " WHERE filename ='"+ filename +"'";
  conn.query(sql_getuername, function(err, result) {
    if (err) {
        console.log(err);
    }
    else
    {
      result = JSON.stringify(result); // 将查询结果前面的rowdatapacket去掉
      result = JSON.parse(result);
      console.log(result);
      jsonWrite(res,result);
    }
  })

});

//  用户组长获取用户标注的内容
router.post('/comparison', (req, res) => {
  var params = req.body;
  var filename = params.filename;
  var username = params.username;
  var newname = username + filename;
  var sql_name = $sql.newsdata.select_name;
  sql_name += " WHERE newname ='"+ newname +"'";
  conn.query(sql_name, function(err, result) {
    if (err) {
        console.log(err);
    }
    // 组长没有查找到这个用户标记到的文件
    else if (result.length == 0) 
    {
      console.log("发出bug的声音");
    }
    else
    {
      var filepath = result[0].filepath;
      fs.readFile(filepath, function (err, data) {
        if (err) {
          console.log(err);
        }else{
        console.log("异步读取: " + data.toString());
        jsonWrite(res, data.toString());
        }
      });
    }
  })

});

//  用户组长保存最终标注
router.post('/leadersave', (req, res) => {
  var params = req.body;
  // console.log(params);
  var filename = params.filename;
  var leadername = params.leadername;
  var filecontent = params.filecontent;
  var newname = leadername + filename;
  var filepath = '../src/assets/save/' + leadername + filename;
  var sql_ins = $sql.finaldata.add;
  var sql_name = $sql.finaldata.select_name;
  sql_name += " WHERE newname ='"+ newname +"'";

  // 文本的形式写入用户最新保存的标注数据
  // 如果文件不存在就创建一个
  fs.writeFile(filepath, filecontent,  function(err) {
    if (err) {
      return console.error(err);
    }
  });

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
        if(n.length == 0){  //首次编辑，保存新文件名和路径
          conn.query(sql_ins, [filename, filepath, leadername, newname, 1], function(err, result){
            if (err) {
              console.log(err);
            }
            else{
              console.log('文件之前没有最终标注，在数据库保存最终标注');
              jsonWrite(res, 2);
            }
          })
        }else{
          jsonWrite(res, 2);
        }
    },
  ], function(err, results){
        //如果有error则执行此处函数
        if(err){
            console.log('异常处理');
        }
  })

});

module.exports = router;    