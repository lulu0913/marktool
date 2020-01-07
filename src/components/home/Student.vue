<template>
  <div>
      <p>普通用户</p>
  </div>
</template>

<script>
export default {
  name: 'Student',
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
    gologin(){
      this.$router.push('/login');
    }

  }
}
</script>
