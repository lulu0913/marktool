<template>
  <div id="leaderbody">
    <div class="headblock"><h1>{{filename}}</h1></div>
    <div class="marktool">
      <el-row>
        <el-button round>触发词</el-button>
        <el-button type="primary" id="get" @click="get()" round>参与方</el-button>
        <el-button type="success" @click="time()" round>时间</el-button>
      </el-row>
    </div>
    <el-container>
      <el-header>
        <!-- 左边的选择下拉框 -->
        <div class="headleft">
          <div class="sel">
            查看标注：
            <select v-model="selected_1" name="fruit" id="select_1" @change="mySelection_1()"></select>
          </div>
          <div class="finalbutton">
            <el-button type="info" @click="save_1()" round>保存</el-button>
          </div>
        </div>

        <!-- 右边的选择下拉框 -->
        <div class="headright">
          <div class="sel">
            查看标注
            <select v-model="selected_2" name="fruit" id="select_2" @change="mySelection_2()"></select>
          </div>
          <div class="finalbutton">
            <el-button type="info" @click="save_2()" round>保存</el-button>
          </div>
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
        //  标注参与方
        get(){
            var myField = document.getElementById("test");
            var myrange = window.getSelection().getRangeAt(0);//  找到选区
            console.log(window.getSelection().getRangeAt(0));
            var startoffset = myrange.startOffset;
            var endoffset = myrange.endOffset;
            var selectedText = window.getSelection().toString();//  将选区内容转化为字符串存在selectedText变量中
            myrange.deleteContents();// 删除原有的文本
            var para=document.createElement("span");//  用新建的节点代替
            var node=document.createTextNode(selectedText);
            para.appendChild(node);
            para.style.color = "blue";
            para.setAttribute("class","get"); // 节点的属性是参与方
            myrange.insertNode(para); 
            myrange.setStartAfter(para);

            //  获取选区内容的起止位置
            var ele = para.previousElementSibling;
            if(ele){
              startoffset += parseInt(ele.getAttribute("END"));
              endoffset += parseInt(ele.getAttribute("END"));
              para.setAttribute("START",startoffset);
              para.setAttribute("END",endoffset);
              console.log(para);
            }else{
              para.setAttribute("START",startoffset);
              console.log(para);
              para.setAttribute("END",endoffset);  
            }
        },
        time(){
          var myField = document.getElementById("test");
          var myrange = window.getSelection().getRangeAt(0);//  找到选区
          console.log(window.getSelection().getRangeAt(0));
          var startoffset = myrange.startOffset;
          var endoffset = myrange.endOffset;
          var selectedText = window.getSelection().toString();//  将选区内容转化为字符串存在selectedText变量中
          myrange.deleteContents();// 删除原有的文本
          var para=document.createElement("span");//  用新建的节点代替
          var node=document.createTextNode(selectedText);
          para.appendChild(node);
          para.style.color = "green";
          para.setAttribute("class","time"); //节点属性是参与时间
          myrange.insertNode(para); 
          myrange.setStartAfter(para);

          //  获取选区内容的起止位置
          var ele = para.previousElementSibling;
          if(ele){
            startoffset += parseInt(ele.getAttribute("END"));
            endoffset += parseInt(ele.getAttribute("END"));
            para.setAttribute("START",startoffset);
            para.setAttribute("END",endoffset);
            console.log(para);
          }else{
            para.setAttribute("START",startoffset);
            console.log(para);
            para.setAttribute("END",endoffset);  
          }
        },
        save_1(){
          var filename = this.filename;
          var leadername = localStorage.getItem('ms_username');
          var myField = document.getElementById("text_1");
          var filecontent = myField.innerHTML;
          var data = {'filename': filename, 'filecontent':filecontent, 'leadername':leadername};
          this.$axios.post('/api/content/leadersave', data).then((response)=>{
            console.log(response.data);
          }).then((error) => {
              console.log(error);
          })
        },
        save_2(){
          var filename = this.filename;
          var leadername = localStorage.getItem('ms_username');
          var myField = document.getElementById("text_2");
          var filecontent = myField.innerHTML;
          var data = {'filename': filename, 'filecontent':filecontent, 'leadername':leadername};
          this.$axios.post('/api/content/leadersave', data).then((response)=>{
            console.log(response.data);
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
    height: 280px;
    text-align: left;
    margin-left: 3%;
  }

  .marktool{
    height: 60px;
  }

  .finalbutton{
    /* width:300px; */
    /* margin-right:20px;  */
    display: inline-block;
  }

  .sel{
    width: 450px;
    display: inline-block;
  }
</style>