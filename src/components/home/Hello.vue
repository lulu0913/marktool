<template>
<body>
  <div id="div_login">
    <div id="div_title"><h1>用户登陆</h1></div>
    <div id="midden">
      <div id="peoplechoose">
      <el-menu :default-active="activeIndex" background-color="" mode="horizontal" @select="handleSelect">
    <el-menu-item @click="goManager" class="el-menu-demo" index="1">管理员</el-menu-item>
    <el-menu-item @click="goLeader" class="el-menu-demo" index="2">用户组长</el-menu-item>
    <el-menu-item @click="goUser" class="el-menu-demo" index="3">普通用户</el-menu-item>
      </el-menu>
      </div>
    <br>
    <input placeholder="请输入账号" type="text" name="userName" class="inputinfo"/>
    <br>
    <input placeholder="请输入密码" type="text" name="passWord" class="inputinfo"/>
    <el-button  value="登陆" @click="open1" class="submitbutton_login" type="warning">登陆</el-button>
    <el-button  value="注册" @click="open2" class="submitbutton_registered" type="warning">注册</el-button>
    </div>
</div>
</body>
</template>

<script>

export default {
  name: 'Hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      msg1: 'hello my app'
    }
  },

  methods: {
  	goUser() {
  		this.$router.push('/User')
    },
    goLeader() {
  		this.$router.push('/Leader')
    },
  	goManager() {
  		this.$router.push('/Manager')
    },
    open1() {
        this.$alert('请选择用户类型', '注意⚠️', {
          confirmButtonText: '确定',
          }
        )},
    open2() {
    this.$alert('请先选择普通用户', '注意⚠️', {
      confirmButtonText: '确定',
      }
    )}
    
  }
}
</script>

<style scoped>
  #div_login{
      width:300px;
      height: 300px;
      background-color:rgba(97, 89, 89, 0.5);
      float:right;
      margin:50px 50px;
      padding: 0px;
      border-top-left-radius:10px;
      border-top-right-radius:10px;
      border-bottom-right-radius:10px;
      border-bottom-left-radius:10px;
              }
  #div_title{
      font-family:"华文黑体";
      width: 100%;
      height: 60px;
      background-color:rgba(58,58,58,0.5);
      text-align: center;
      line-height:60px;
      color:blanchedalmond;
      border-top-left-radius:10px;
      border-top-right-radius:10px;
      border-bottom-right-radius:10px;
      border-bottom-left-radius:10px;
  }
  *{
      margin:0px;
      padding: 0px;
  }
  #midden{
      font-family: "宋体-简";
      width:300px;
      height: 300px;
      background-color: DarkGray;
      border-top-left-radius:10px;
      border-top-right-radius:10px;
      border-bottom-right-radius:10px;
      border-bottom-left-radius:10px;
  }
  .el-menu-demo{
      font-family: 宋体;
      display:inline-block;
      width:100px;
      height:50px;
      font-weight:bold;
      color:blanchedalmond;
      background-color:rgba(58,58,58,0.5);
      text-align:center;
      padding:4px;
      text-decoration:none;
      text-transform:uppercase;
  }
  .inputinfo{
      width: 260px;
      height:25px;
      margin:10px 20px 10px 20px;
  }
  .submitbutton_login{
      font-family: "华文黑体";
      width: 260px;
      height:35px;
      margin:20px 20px 0px 20px;
      background-color:Tan;
      border-top-left-radius:5px;
      border-top-right-radius:5px;
      border-bottom-right-radius:5px;
      border-bottom-left-radius:5px;
  }
  .submitbutton_registered{
      font-family: "华文黑体";
      width: 260px;
      height:35px;
      margin:20px 20px 20px 20px;
      background-color:Tan;
      border-top-left-radius:5px;
      border-top-right-radius:5px;
      border-bottom-right-radius:5px;
      border-bottom-left-radius:5px;
  }
</style>