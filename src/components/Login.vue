<template>
  <div>
    <form>
        <input type="text" name="username" v-model="username" placeholder="用户名" style="width:200px"><br>
        <input type="text" name="password" v-model="password" placeholder="密码" style="width:200px"><br>
        <button @click="addUser">登录</button>
        <button>先去注册</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
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
      this.$axios.post('/api/user/addUser', {
        username: username,
        password: password
      },{}).then((response) => {
        console.log(response);
      })
    },

  }
}
</script>
