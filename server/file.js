
var async = require("async");
 
async.waterfall([
    function(callback){
        console.log(1);
        callback(null,1);
        console.log(3); //如果有error异常处理，否则向下一个函数传递参数 1
    },
    function(n, callback){ //接受参数1
        console.log(n);  //n=1
        callback(null,2);
    },
    function(n, callback){ //接受参数2
        console.log(n);n=2
    }
], function(err, results){
    //如果有error则执行此处函数
    if(err){
        console.log('异常处理');
    }
    else{
        console.log(results);
    }
})