<template>
  <div class="mark">
    <!-- 左边的文本框 -->
    <div class="left">
      <!-- 普通用户的标注界面 -->
      <div class="user_mark_place">
        <div v-html = 'filecontent' class="text_content" id="test" contenteditable="true" ></div>
        <div id="allfile" style="display:none"></div>
      </div>
    </div>

    <!-- 右边的标注工具 -->
    <div class="right">
      <el-row>
        <el-button round>触发词</el-button>
        <el-button type="primary" id="get" @click="get" round>参与方</el-button>
        <el-button type="success" @click="time" round>时间</el-button>
        <el-button type="info" @click="save" round>保存</el-button>
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
    //  保存用户当前的编辑，以及计算编辑之后文件的一致性
    save(){
      const self = this;                      
      var filename = localStorage.getItem('name_usermark');
      var username = localStorage.getItem('ms_username');
      var myField = document.getElementById("test");
      var filecontent = myField.innerHTML;
      var data = {'filename': filename, 'username':username, 'filecontent':filecontent}
      // console.log(data);
        this.$axios.post('/api/content/usersave', data).then((response)=>{
            console.log('用于检测一致性的文件个数' + response.data);
            var k = 0;  //和当前节点有交集的节点数
            var m = 0;  //有交集计算一致性
            var n = 0;  //全文的一致性
            if(response.data == 1)
            {
              n = 1;
            }
            else
            {
              var allfile = response.data;
              document.getElementById("allfile").innerHTML = allfile;
              // 一致性检测
              var getnode = document.getElementById("allfile").getElementsByClassName("get");
              var temp = new Array();
              for(var i=0;i<getnode.length;i++)
              {
                var mynode1 = getnode[i];
                var start1 = mynode1.getAttribute("start");
                var end1 = mynode1.getAttribute("end");
                for(var j=0;j<getnode.length;j++)
                {
                  if(j!=i)
                  {
                    var mynode2 = getnode[j];
                    var start2 = mynode2.getAttribute("start");
                    var end2 = mynode2.getAttribute("end");
                    if(start2<end1)
                    {
                      m = m+((end1-start2)/(end2-start1));
                      k++;
                    }
                    else if(start1<end2)
                    {
                      m = m+((end2-start1)/(end1-start2));
                      k++;
                    }
                    else if((start1>=start2)&&(end1<=end2))
                    {
                      m = m+((end1-start1)/(end2-start2));
                      k++;
                    }
                    else if((start1<start2)&&(end2<end1))
                    {
                      m = m+((end2-start2)/(end1-start1));
                      k++;
                    }
                  }
                }
                if(k==0)
                {
                  temp[i]=0;
                }
                else
                {
                  temp[i]=m/k;
                }
                n+=temp[i];
              }
              n = n/getnode.length;
            }

            console.log(n);
            this.$options.methods.storeK(n,this);
        }).then((error) => {
            console.log(error);
        })
    },
    //  将计算出来的k值传到后端，保存到数据库中
    storeK(n,that){
      console.log(n)
      var filename = localStorage.getItem('name_usermark');
      that.$axios.post('/api/content/setk', {'k_value': n, 'filename': filename}).then((response)=>{

        }).then((error) => {
            console.log(error);
        })
    }
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
