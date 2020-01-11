<template>
<div>
<h1>亲爱的普通用户,您好!</h1>
<div id="app">
<el-container style="height: 500px; border: 1px solid #eee">

  <!-- 左侧的导航栏 -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-downloa"></i>下载文本</template>
          <el-button type="text" size="mini" icon="el-icon-more">选择文本</el-button>
          <el-button type="text" size="mini" icon="el-icon-download">确认下载</el-button>
        </el-submenu>   
      <el-menu-item index="2" @click="usershowdata" ><i class="el-icon-error"></i>待完成本文</el-menu-item>
      <el-menu-item index="3"><i class="el-icon-success"></i>已标注文本</el-menu-item>  
      
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-link @click="goUser" icon="el-icon-switch-button" circle>注销</el-link>
    </el-header>
    
    <!-- 文件显示主体部分 -->
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="filename" label="文件名" width="950">
        </el-table-column>

        <el-table-column prop="todo" label="操作" >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
</div>
</div>
</template>

<script>

export default {
  name: 'U',
  data () {
    const item = {
        date: '2016-05-02',
        filename: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
    return {
      tableData: [],
      userfilepath :'cc',
    }
  },
  methods:{
    goUser(){
      this.$router.push('/User');
    },
    //  打开对应的行的文本文件进行编辑
    handleClick(row) {
      const self = this;                      
      console.log(row.filename);
      this.userfilepath = row.filepath;
      let userfilepath = this.userfilepath;
      //this.userfilepath = row.filepath;
      localStorage.setItem('name_usermark',row.filename);
      localStorage.setItem('path_usermark',row.filepath);
      var data = {'userpath': userfilepath}
      console.log(data)
        this.$axios.post('/api/content/abc', data).then((response)=>{
            console.log(response.data);
            localStorage.setItem('userfilecontent',response.data);
            this.$router.push('/UserMark');
        }).then((error) => {
            console.log(error);
        })
    },
    usershowdata()
    {
      const self = this;                      
        self.$axios.post('/api/user/usershowdata') //前端接口
        .then((response) => {
            console.log(response);
            console.log(response.data);
            //console.log(response.data[1].id);
            this.tableData = response.data;
            
        }).then((error) => {
            console.log(error);
        })
    }
  },
  
}
</script>

<style scoped>
    .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

