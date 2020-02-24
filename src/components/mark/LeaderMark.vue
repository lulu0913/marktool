<template>
  <div id="leaderbody">
    <div class="headblock"><h1>{{filename}}</h1></div>
    <el-container>
      <el-header>
        <!-- 左边的选择下拉框 -->
        <div class="headleft">
          <select v-model="selected_1" name="fruit" id="select_1" @change="mySelection_1()">
          </select>
        </div>

        <!-- 右边的选择下拉框 -->
        <div class="headright">
          <select v-model="selected_2" name="fruit" id="select_2" @change="mySelection_2()">
          </select>
        </div>
      </el-header>

        <el-container>
          <!-- 左边框 -->
          <el-main width="49%">
            <div v-html = 'filecontent_1' class="text_content" id="text_1" contenteditable="true"></div>


          </el-main>

          <!-- 右边框 -->
          <el-main width="49%">
            <div v-html = 'filecontent_2' class="text_content" id="text_2" contenteditable="true"></div>
          </el-main>
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
            selected_1: '' ,
            selected_2: '' ,
            filecontent_1:'',
            filecontent_2:'',
        }
    },
    methods:{
        view(){
            var data = {'filename': this.filename};
            var UserData = new Array();
            this.$axios.post('/api/content/leadermark', data).then((response)=>{
                console.log(response.data);
                UserData = response.data;
                // 将标记了本篇数据的用户放到这个下拉框里
                for(var i=0; i<UserData.length; i++)
                {
                    document.getElementById("select_1").options.add(new Option(UserData[i].username, UserData[i].username));
                    document.getElementById("select_2").options.add(new Option(UserData[i].username, UserData[i].username));
                }
                this.$options.methods.mySelection(this, UserData[0].username);
            }).then((error) => {
                console.log(error);
            })
        },

        // 选择要查看的用户，并显示出该用户的标记
        mySelection_1(){
          var username = this.selected_1;
          var filename = this.filename;
          console.log(username);
          console.log(filename);
          var data = {"username": username, "filename":filename};
          this.$axios.post('/api/content/comparison', data).then((response)=>{
            console.log(response.data);
            this.filecontent_1 = response.data;
          }).then((error) => {
              console.log(error);
          })
        },

        // 选择要查看的用户，并显示出该用户的标记
        mySelection_2(){
          console.log(this.selected_2);
          var username = this.selected_2;
          var filename = this.filename;
          var data = {"username": username, "filename":filename};
          this.$axios.post('/api/content/comparison', data).then((response)=>{
            console.log(response.data);
            this.filecontent_2 = response.data;
          }).then((error) => {
              console.log(error);
          })
        },

        // 刷新页面时就执行，选择要查看的用户，并显示出该用户的标记
        mySelection(that, n){
          console.log(that.selected_2);
          var username = n;
          var filename = that.filename;
          var data = {"username": username, "filename":filename};
          that.selected_1=username;
          that.selected_2=username;
          that.$axios.post('/api/content/comparison', data).then((response)=>{
            console.log(response.data);
            that.filecontent_2 = response.data;
            that.filecontent_1 = response.data;
          }).then((error) => {
              console.log(error);
          })
        },
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

  .headblock{
    height: 100px;
  }

  .headleft{
    width: 49%;
    display: inline-block;
  }

  .headright{
    width: 49%;
    display: inline-block;
  }

  .text_content{
    width: 94%;
    text-align: left;
    margin-left: 3%;
  }
</style>