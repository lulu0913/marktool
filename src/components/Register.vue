<template>
  <div>
    <form id = "app">
        <h2 class="form-signin0-heading">普通用户注册</h2>
        <br>
        <div id="mid">
        <input class="form-control" type="text" placeholder="用户名"  name="username" v-model="username">
        <br>
        <input class="form-control" type="text" placeholder="请设置密码" name="password" v-model="password">
        <br>
        <el-row><el-button @click="addUser" value="注册" class="submitbutton_registered" type="warning">注册</el-button></el-row>
        <el-row><el-button @click="goUser" class="submitbutton_registered" type="warning">已有账号，前往登录</el-button></el-row>
        </div>
    </form>
  </div>
  
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: '',
      el:''
    }
  },
  methods: {
    addUser() {
      console.log('hello');
      let username = this.username;
      let password = this.password;

      if(username == ''){
          this.$alert('用户名不能为空', '注意⚠️', {
          confirmButtonText: '确定',}
        )
      }
      else if(password == '')
      {
          this.$alert('密码不能为空', '注意⚠️', {
          confirmButtonText: '确定',}
        )
      }
      else{
        this.$axios.post('/api/user/addUser', { //后端接口路由
        username: username,
        password: password
      },{}).then((response) => {
        console.log(response);
        this.$router.push('/User');
      })
      }
    },
    goUser(){
      this.$router.push('/User');
    }

  }
}
</script>
<style scoped>
    #app{
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
    .form-signin0-heading{
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
    #mid{
        font-family: "宋体-简";
        width:300px;
        height: 300px;
        background-color: DarkGray;
        border-top-left-radius:10px;
        border-top-right-radius:10px;
        border-bottom-right-radius:10px;
        border-bottom-left-radius:10px;
    }
  
    .form-control{
        width: 260px;
        height:20px;
        margin:10px 20px 10px 20px;
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
