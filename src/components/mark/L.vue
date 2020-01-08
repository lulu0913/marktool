<template>
<div>
<h1>{{ username }}组长，您好！</h1>
<div id="app">
<el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '4']">
 
    <div>
        <h2>get请求</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章内容">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user"></i>小组成员1</template>
        <el-menu-item-group>
          <template slot="title">标注任务</template>
          <el-menu-item index="1-1"><i class="el-icon-menu"></i>6月</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-menu"></i>7月</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-menu"></i>8月</el-menu-item>
        </el-menu-item-group>
        </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-user"></i>小组成员2</template>
        <el-menu-item-group>
          <template slot="title">标注任务</template>
          <el-menu-item index="2-1"><i class="el-icon-menu"></i>9月</el-menu-item>
          <el-menu-item index="2-2"><i class="el-icon-menu"></i>10月</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-user"></i>小组成员3</template>
        <el-menu-item-group>
          <template slot="title">标注任务</template>
          <el-menu-item index="3-1"><i class="el-icon-menu"></i>11月</el-menu-item>
          <el-menu-item index="3-2"><i class="el-icon-menu"></i>12月</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>注销</span>
        
    </el-header>
    
  </el-container>
</el-container>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'App',
    data () {
        return {
            form:{
                title: 'title',
                content: 'content',
                username:  window.localStorage.getItem('ms_username'),
            }
        }
    },
    methods: {
        onSubmit(){
            axios.get('http://127.0.0.1:3000/api/user',{
                params: this.form
            },{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
}
}
</script>





<style scoped>
    
</style>

