<template>
<body>
  <div id="div_login">
    <div id="div_title"><h1>普通用户登陆</h1></div>
    <div id="midden">
      <div id="peoplechoose">
      <el-menu :default-active="activeIndex" background-color="" mode="horizontal" @select="handleSelect">
    <el-menu-item @click="goManager" class="el-menu-demo" index="1">管理员</el-menu-item>
    <el-menu-item @click="goLeader" class="el-menu-demo" index="2">用户组长</el-menu-item>
    <el-menu-item @click="goUser" class="el-menu-demo" index="3">普通用户</el-menu-item>
      </el-menu>
      </div>
    <br>
    <input placeholder="请输入普通用户账号" type="text" name="username" v-model="ruleForm.username" class="inputinfo"/>
    <br>
    <input placeholder="请输入密码" type="text" name="password" v-model="ruleForm.password" class="inputinfo"/>
    <el-row><el-button @click="submitForm('ruleForm')" value="登陆" class="submitbutton_login" type="warning">登陆</el-button></el-row>
    <el-row><el-button @click="handleCommand()" value="注册" class="submitbutton_registered" type="warning">注册</el-button></el-row>
    </div>
</div>
</body>
</template>

<script>

export default {
  name: 'User',
  data () {
    return {
        errorInfo : false,
        ruleForm: {
            username: '',
            password: '',                   
        },
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
        }
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
    goRegister() {
      this.$router.push('/Register')
    },
    submitForm(ruleForm) {
      const self = this;
      localStorage.setItem('ms_username',self.ruleForm.username);
      localStorage.setItem('ms_user',JSON.stringify(self.ruleForm));
      console.log(JSON.stringify(self.ruleForm));                        
      self.$axios.post('/api/user/findUser',self.ruleForm) //前端接口
      .then((response) => {
          console.log(response);
          if (response.data == -1) {
              self.errorInfo = true;
              self.errInfo = '该用户不存在';
              console.log('该用户不存在')
          } else if (response.data == 0) {
              console.log('密码错误')
              self.errorInfo = true;
              self.errInfo = '密码错误';
              this.$alert('密码错误', '注意⚠️', {
          confirmButtonText: '确定',})
          }
           else {
              this.$router.push('/U');
          }                          
      }).then((error) => {
          console.log(error);
      })
    },
    handleCommand() {
        this.$router.push('/register');
    },

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

