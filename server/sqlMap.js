var sqlMap = {
    // 用户
    user: {
      add: 'INSERT INTO user(username,password) values(?,?)'
    }
  }
  
module.exports = sqlMap;