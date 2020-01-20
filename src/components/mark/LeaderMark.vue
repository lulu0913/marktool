<template>
  <div>
    <el-container>
      <el-header>{{ filename }}</el-header>

        <el-container>
          <!-- 左边框 -->
          <el-main width="50%">Main</el-main>

          <!-- 右边框 -->
          <el-main width="50%">Main</el-main>
        </el-container>
    </el-container>  
  </div>
</template>

<script>
export default {
    name: 'LeaderMark',
    mounted: function(){
        this.view();
    },
    data(){
        return{
            filename: localStorage.getItem('name_leadermark'),
        }
    },
    methods:{
        view(){
            var data = {'filename': filename}
            this.$axios.post('/api/content/leadermark', data).then((response)=>{
                console.log(response.data);
                localStorage.setItem('userfilecontent',response.data);
                this.$router.push('/LeaderMark');
            }).then((error) => {
                console.log(error);
            })
        }
    }

}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>