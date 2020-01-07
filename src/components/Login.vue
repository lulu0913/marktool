<template>
  <div>
    <form>
        <input type="text" name="username" v-model="ruleForm.username" placeholder="用户名" style="width:200px"><br>
        <input type="text" name="password" v-model="ruleForm.password" placeholder="密码" style="width:200px"><br>
        <button type="primary" @click="submitForm('ruleForm')">登录</button>
        <button @click="handleCommand()">注册</button> 
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
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
            } else {
                this.$router.push('/register');
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
