var fs = require("fs");

fs.readFile('../src/assets/upload_20daef3fe7bb557e7a2a0e7b8669af7a.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取: " + data.toString());
 });