var sqlMap = {
    // 普通用户
    user: {
      add: 'INSERT INTO user(username,password) values(?,?)',
      select_name: 'SELECT * from user', 
      update_user: 'UPDATE user set'
    },

    //用户组长
    leader: {
      add: 'INSERT INTO leader(name,password) values(?,?)',
      select_name: 'SELECT * from leader', 
      update_user: 'UPDATE leader set'
    },
  }
  
module.exports = sqlMap;