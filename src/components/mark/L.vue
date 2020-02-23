<template>
<div>
<h1>{{ form.username }}组长，您好！</h1>
<div id="app">
<el-container style="height: 500px; border: 1px solid #eee">

  <!-- 侧边栏 -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '4']">
 
        <div>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-upload"></i>上传文件</template>
        
                <input type="file" @change="getFile($event)" size="mini" icon="el-icon-more">
                <el-button @click="submitForm($event)" type="text" size="mini" icon="el-icon-upload">确认上传</el-button>
           
            </el-submenu> 
        </div>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user"></i>新闻小组</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="goMarked">已标注</el-menu-item>
          <el-menu-item index="1-2" @click="goOringin">原始数据集</el-menu-item>
        </el-menu-item-group>
        </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-user"></i>机器学习小组</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">已标注</el-menu-item>
          <el-menu-item index="2-2">原始数据集</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-user"></i>图像识别</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">已标注</el-menu-item>
          <el-menu-item index="3-2">原始数据集</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
 
  <!-- 展示数据集部分 -->
  <router-view></router-view>

  </el-container>
</el-container>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'L',
    data () {
      const item = {
        date: '2016-05-02',
        filename: '王小虎',
        type: '上海市普陀区金沙江路 1518 弄'
      };
      return {
          form:{
              title: 'title',
              content: 'content',
              username: localStorage.getItem('ms_username'),
              file:'',
          },
          tableData: []
      }
    },
    methods: {
        // post文件上传
        getFile(event){
            this.file = event.target.files[0];
            console.log(this.file);
        },
        submitForm(event){
            event.preventDefault();
            let formData = new FormData();
            formData.append('filename', this.file.name);
            formData.append('name', this.form.username);
            formData.append('file', this.file);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            axios.post('http://127.0.0.1:3000/api/user/postFile', formData, config)
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        },
        // 展示原始数据集
        goOringin(){
          this.$router.push('/L/database');
        },
        // 展示标注的数据集
        goMarked(){
          this.$router.push('/L/datamarked');
        },
    },
}
</script>





<style scoped>
    
</style>

