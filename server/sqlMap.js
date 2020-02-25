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

    //用户组长对上传的文件进行处理
    news: {
      add: 'INSERT INTO news(filename ,filepath) values(?,?)',
      select_name: 'SELECT * from news', 
    },

    //用户对当前标注的文件进行保存
    newsdata:{
      add: 'INSERT INTO newsdata(filename, filepath, username, newname) values(?,?,?,?)',
      select_name: 'SELECT * FROM newsdata',
      update: 'UPDATE newsdata SET filename = ?, filepath = ?, username = ?, newname = ?',
      distinct: 'SELECT DISTINCT(filename) FROM newsdata',
      count: 'SELECT COUNT(*) number FROM newsdata',
      set_k: 'UPDATE newsdata SET kvalue = ?',
      get_k: 'SELECT kvalue FROM newsdata',
      get_username: 'SELECT username FROM newsdata',
    },

    finaldata:{
      add: 'INSERT INTO finaldata(filename, filepath, leadername, newname, finalmark) values(?,?,?,?,?)',
      select_name: 'SELECT * FROM finaldata',
    },
  }
  
module.exports = sqlMap;