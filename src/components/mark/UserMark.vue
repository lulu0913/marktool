<template>
<div class="mark">
  <div class="headblock"><h1>{{filename}}</h1></div>
  <el-container>
    <!-- 深蓝色的标题区域 -->
    <el-header>
      <div class="sel">
        选择事件类型：
        <select id="select_1" autocomplete="off" @change="mySelection()">
          <option value="会见会谈" selected="selected">会见会谈</option>
          <option value="签署文件">签署文件</option>
          <option value="设施启用">设施启用</option>
          <option value="举行活动">举行活动</option>
        </select>
      </div>
    </el-header>

    <el-container>
      <!-- 内容区 -->
      <el-aside width="400px">
        <div class="hjht">
          <el-row>
            <el-button round>触发词</el-button>
          </el-row>
          <el-row>
            <el-button type="primary" id="people" @click="people" round>参与方</el-button>
            <el-button type="primary" id="time" @click="time" round>时间</el-button>
            <el-button type="primary" id="place" @click="place" round>地点</el-button>
          </el-row>
          <el-row>
            <el-button type="success" @click="save" round>保存</el-button>
          </el-row>
        </div>

      </el-aside>
      <el-main>
        <div class="user_mark_place">
          <div v-html = 'filecontent' class="text_content" id="test" contenteditable="true" ></div>
          <div id="allfile" style="display:none"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: 'UserMark',
  mounted:function(){
    this.delet();
  },
  data(){
    return{
      filecontent:localStorage.getItem('userfilecontent'),
      filename: localStorage.getItem('name_usermark'),

    }
  },
  methods:{
    //  标注参与方
    people(){
      var myField = document.getElementById("test");
      var myrange = window.getSelection().getRangeAt(0);//  找到选区
      // console.log(window.getSelection().getRangeAt(0));
      var startoffset = myrange.startOffset;
      var endoffset = myrange.endOffset;
      var selectedText = window.getSelection().toString();//  将选区内容转化为字符串存在selectedText变量中
      myrange.deleteContents();// 删除原有的文本
      // var para=document.createElement("div");//  用新建的节点代替
      var para=document.createElement("span");//  用新建的节点代替
      // var btn=document.createElement("button");//  用新建的节点代替
      var node=document.createTextNode(selectedText);
      // var val=document.createTextNode("删除");
      para.appendChild(node);
      // btn.appendChild(val);
      para.style.color = "blue";
      para.setAttribute("class","people"); // 节点的属性是参与方
      // para.setAttribute("onclick", "console.log(233)"); 
      para.addEventListener('click', function(){console.log(2333);
        var rawtext = node;
        para.parentElement.removeChild(para);
        myrange.insertNode(rawtext)
      })

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
      para.setAttribute("class","time");
      // 添加删除的监听事件
      para.addEventListener('click', function(){console.log(2333);
        var rawtext = node;
        para.parentElement.removeChild(para);
        myrange.insertNode(rawtext)
      })

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

    place(){
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
      para.style.color = "red";
      para.setAttribute("class","place");
      // 添加删除的监听事件
      para.addEventListener('click', function(){
        var rawtext = node;
        para.parentElement.removeChild(para);
        myrange.insertNode(rawtext)
      })

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
            var k;  //和当前节点有交集的节点数
            var m;  //有交集计算一致性
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
                start1 = parseInt(start1);
                end1 = parseInt(end1);
                k=0;
                m=0;
                console.log("第i次"+i);
                for(var j=0;j<getnode.length;j++)
                {
                  if(j!=i)
                  {
                    var mynode2 = getnode[j];
                    var start2 = mynode2.getAttribute("start");
                    var end2 = mynode2.getAttribute("end");
                    start2 = parseInt(start2);
                    end2 = parseInt(end2);
                    if((start1<=start2)&&(start2<=end1)&&(end1<=end2))
                    {
                      m = m+((end1-start2)/(end2-start1));
                      console.log(i+'->'+j+'========='+end1,start2,end2,start1+'type1');
                      k++;
                    }
                    else if((start2<start1)&&(start1<=end2)&&(end2<=end1))
                    {
                      m = m+((end2-start1)/(end1-start2));
                      console.log(i+'->'+j+'========='+end2,start1,end1,start2+'type2');
                      k++;
                    }
                    else if((start2==start1)&&(end2<end1))
                    {
                      m = m+((end2-start1)/(end1-start2));
                      console.log(i+'->'+j+'========='+end2,start1,end1,start2+'type2');
                      k++;
                    }
                    else if((start1>start2)&&(end1<end2))
                    {
                      m = m+((end1-start1)/(end2-start2));
                      console.log(i+'->'+j+'========='+end1,start1,end2,start2+'type3');
                      k++;
                    }
                    else if((start1<start2)&&(end2<end1))
                    {
                      m = m+((end2-start2)/(end1-start1));
                      console.log(i+'->'+j+'========='+end2,start2,end1,start1+'type4');
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
                console.log(i+'+++++++'+temp[i]);
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
        console.log(response);
        }).then((error) => {
            console.log(error);
        })
    },
    delet(){
      console.log("2333");
      var nodes = document.getElementsByTagName("span");
      // console.log(nodes[5].className)
      for(var i=0; i<nodes.length; i++){
        if(nodes[i].className){
          nodes[i].addEventListener('click', function(){
            console.log(2345);
            console.log(this.innerHTML)
            var rawtext = document.createTextNode(this.innerHTML);
            var node;
            if(this.previousElementSibling){
              node = this.previousElementSibling.nextElementSibling;
              this.parentElement.removeChild(node);
            }
            else if(this.nextElementSibling){
              node = this.nextElementSibling.previousElementSibling;
              this.parentElement.removeChild(node);
            }
            else{
              node = this.parentElement.firstElementChild;
              this.parentElement.removeChild(node);
            }
            // console.log(node);
            var myrange = window.getSelection().getRangeAt(0);
            myrange.insertNode(rawtext);
            // console.log(k)
            // nodes[i].parentElement.removeChild(para);
            })
        }
      }
    },

  }
}
</script>

<style>
  .mark{
    width: 75%;
    margin-left: 12.5%;
  }

  .text_content{
    width: 460px;
    height: 355px;
    text-align: left;
    display: inline-block;
  }

  .headblock{
    height: 100px;
  }

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
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    line-height: 25px;
  }

  .el-row{
    height: 70px;
  }

  .el-button{
    float: left;
    margin-left: 20px;
    margin-top: 30px;
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

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .people:hover
  {
    background-color:yellow;
  }
  .time:hover
  {
    background-color:yellow;
  }
  .place:hover
  {
    background-color:yellow;
  }
</style>
