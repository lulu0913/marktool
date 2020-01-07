var sqlMap = {
    // 用户
    user: {
      add: 'INSERT INTO user(username,password) values(?,?)',
      select_name: 'SELECT * from user', 
      update_user: 'UPDATE user set'
    }
  }
  
module.exports = sqlMap;