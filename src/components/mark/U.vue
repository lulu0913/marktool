<template>
<div>
<h1>亲爱的{{username}},您好!</h1>
<div id="app">
<el-container style="height: 500px; border: 1px solid #eee">

  <!-- 左侧的导航栏 -->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-downloa"></i>数据集</template>
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
        <el-table-column prop="filename" label="文件名" width="750">
        </el-table-column>

        <el-table-column prop="todo" label="状态" >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">可编辑</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="todo" label="操作" >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="todo" label="导出为XML" >
          <template slot-scope="scope">
            <el-button @click="xmlClick(scope.row)" type="text" size="small">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
<!-- 用来生成xml文件，寻找文件节点时使用 -->
<div v-html = 'filetxt' id="filexml" style="display:none" contenteditable="true" ></div>

</div>
</div>
</template>

<script>

export default {
  name: 'U',
  mounted :function() {
    this.usershowdata();
    this.panduan();

  },
  data () {
    const item = {
        date: '2016-05-02',
        filename: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
    return {
      tableData: [],
      userfilepath :'cc',
      username: localStorage.getItem('ms_username'),
      filetxt: '',
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
      let userfilepath = this.userfilepath; //  原数据保存的路径
      localStorage.setItem('name_usermark',row.filename); //  txt文件的名字
      localStorage.setItem('path_usermark',row.filepath);
      var username = localStorage.getItem('ms_username'); // 当前登录用户的名字
      var filename = row.filename;
      var data = {'userpath': userfilepath, 'filename': filename, 'username': username}
      console.log(data);
        this.$axios.post('/api/content/abc', data).then((response)=>{
            console.log(response.data);
            localStorage.setItem('userfilecontent',response.data);
            this.$router.push('/UserMark');
        }).then((error) => {
            console.log(error);
        })
    },

    //用户界面显示组长上传的数据集
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
    },

    // 创建并下载xml文件
    async xmlClick(row) {
      const self = this;                      
      console.log(row.filename);
      let filename = row.filename;
      let filepath = row.filepath;
      let username = localStorage.getItem('ms_username'); 

      var data = {'userpath': filepath, 'filename': filename, 'username': username}
      await this.$axios.post('/api/content/abc', data).then((response)=>{
        console.log(response.data);// 请求到的用户标注过的文本
        localStorage.setItem('filetxt',response.data);
        this.filetxt = response.data;

        // console.log(xmldom); 
        }).then((error) => {
            console.log(error);
        })

      var allclass = ['trigger1', 'trigger2', 'trigger3', 'trigger4', 'people', 'time', 'place', 'sign_people', 'sign_paper', 'sign_time', 'sign_place', 'build_people', 'build_name', 'build_time', 'build_place', 'activity_people', 'activity_name', 'activity_time', 'activity_place'];
      var xmldom = document.implementation.createDocument("", "root", null); // 创建xml对象
      for (var j=0; j<allclass.length; j++)
      {           
        var getnode = document.getElementsByClassName(allclass[j]);
        // console.log(xmldom.documentElement.tagName); //"root"
        for(var i=0;i<getnode.length;i++)
        {
          
          var child = xmldom.createElement("event_argument");
          var nodetxt = document.createTextNode(getnode[i].innerHTML);
          var start = getnode[i].getAttribute("start");
          var end = getnode[i].getAttribute("end");
          xmldom.documentElement.appendChild(child);
          child.appendChild(nodetxt);
          child.setAttribute("START", start);
          child.setAttribute("END", end);
          child.setAttribute("ROLE", allclass[j]);
        }
      }
      console.log(xmldom);
      // var serializer = new XMLSerializer();
      // var xml = serializer.serializeToString(xmldom);// 将xml解析为dom

      // let a = document.createElement('a');
      // let blob = new Blob([xml]); 
      // let objectUrl = URL.createObjectURL(blob);
      // filename = filename.substr(0, filename.length - 3);
      // filename += 'xml';
      // a.setAttribute("href",objectUrl);
      // a.setAttribute("download", filename);
      // a.click();
      var urlObject = window.URL || window.webkitURL || window;
 
      var export_blob = new Blob([xmldom]);
   
      var save_link = document.createElementNS("http://localhost:8081/#/U", "a")
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = filename;
  //     this.$options.methods.fake_click(this, save_link);
    },
  //   fake_click(that, obj) {
  //     var ev = document.createEvent("MouseEvents");
  //     ev.initMouseEvent(
  //         "click", true, false, window, 0, 0, 0, 0, 0
  //         , false, false, false, false, 0, null
  //         );
  //     obj.dispatchEvent(ev);
  //   },
    panduan(){
      var myname = localStorage.getItem('ms_username');
      // console.log('怎样才有东西显示')
      this.$axios.post('/api/modify/pd1', {'myname': myname}).then((response)=>{
        console.log(response);
        if(response.data==-1){
          alert('请先登录');
          this.$router.push('/User');
        }
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

