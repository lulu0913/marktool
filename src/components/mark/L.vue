<template>
<div>
<h1>用户组长</h1>
<div id="app">
<el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '4']">
      <el-submenu index="4">
          <template slot="title"><i class="el-icon-upload"></i>上传文件</template>
          <br>
          <el-upload class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="9999"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> 
      </el-submenu>  
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
      <span>组长</span>
        
    </el-header>
    
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
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
  name: 'L',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      msg1: 'hello my app'
    }
  }
}
</script>

<style scoped>
    
</style>

