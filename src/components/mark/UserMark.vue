<template>
  <div class="mark">
    <!-- 左边的文本框 -->
    <div class="left">
      <!-- 普通用户的标注界面 -->
      <div class="user_mark_place">
        <div v-html = 'filecontent' class="text_content" id="test" contenteditable="true" ></div>
      </div>
    </div>

    <!-- 右边的标注工具 -->
    <div class="right">
      <el-row>
        <el-button round>触发词</el-button>
        <el-button type="primary" id="get" @click="get" round>参与方</el-button>
        <el-button type="success" @click="time" round>时间</el-button>
        <el-button type="info" round>地点</el-button>
      </el-row>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'UserMark',
  data(){
    return{
      filecontent:localStorage.getItem('userfilecontent'),
    }
  },
  methods:{
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
        console.log(this.filecontent);
        }else{
          para.setAttribute("START",startoffset);
          console.log(para);
          para.setAttribute("END",endoffset);  
        console.log(this.filecontent);
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
  }
}
</script>

<style>
.body{
    width : 85%;
    margin-left: 8%;
}
.left{
  width: 60%;
  display: inline-block;
}
.right{
  display: inline-block;
}
.text_content{
  width: 500px;
  height: 150px;
  text-align: left;
}
</style>
