<template>
<div class="mark">
  <div class="headblock"><h1>{{filename}}</h1></div>
  <el-container>
    <!-- 深蓝色的标题区域 -->
    <el-header>
      <div class="sel">
        选择事件类型：
        <select id="select_1" autocomplete="off" @change="this.mySelection">
          <option value="hjht" selected="selected">会见会谈</option>
          <option value="qswj">签署文件</option>
          <option value="ssqy">设施启用</option>
          <option value="jxhd">举行活动</option>
        </select>
      </div>
    </el-header>

    <el-container>
      <!-- 内容区 -->
      <el-aside width="400px">
        <!-- 会见会谈按钮组 -->
        <div id="hjht" style="display:inline">
          <el-row>
            <el-button id="trigger1" @click="trigger1" round>触发词</el-button>
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

        <!-- 签署文件按钮组 -->
        <div id="qswj" style="display:none">
          <el-row>
            <el-button id="trigger2" @click="trigger2" round>触发词</el-button>
          </el-row>
          <el-row>
            <el-button type="primary" id="sign_people" @click="sign_people" round>签署方</el-button>
            <el-button type="primary" id="sign_paper" @click="sign_paper" round>文件</el-button>
            <el-button type="primary" id="sign_time" @click="sign_time" round>签署时间</el-button>
            <el-button type="primary" id="sign_place" @click="sign_place" round>签署地点</el-button>
          </el-row>
          <el-row>
            <el-button type="success" @click="save" round>保存</el-button>
          </el-row>
        </div>

        <!-- 设施启用按钮组 -->
        <div id="ssqy" style="display:none">
          <el-row>
            <el-button id="trigger3" @click="trigger3" round>触发词</el-button>
          </el-row>
          <el-row>
            <el-button type="primary" id="build_people" @click="build_people" round>设施修建方</el-button>
            <el-button type="primary" id="build_name" @click="build_name" round>设施名称</el-button>
            <el-button type="primary" id="build_time" @click="build_time" round>启用时间</el-button>
            <el-button type="primary" id="build_place" @click="build_place" round>设施地点</el-button>
          </el-row>
          <el-row>
            <el-button type="success" @click="save" round>保存</el-button>
          </el-row>
        </div>   

        <!-- 举行活动按钮组-->
        <div id="jxhd" style="display:none">
          <el-row>
            <el-button id="trigger4" @click="trigger4" round>触发词</el-button>
          </el-row>
          <el-row>
            <el-button type="primary" id="activity_people" @click="activity_people" round>举办方</el-button>
            <el-button type="primary" id="activity_name" @click="activity_name" round>活动名称</el-button>
            <el-button type="primary" id="activity_time" @click="activity_time" round>活动时间</el-button>
            <el-button type="primary" id="activity_place" @click="activity_place" round>活动地点</el-button>
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
            var ct; //有标注的类别数
            var m;  //有交集计算一致性
            var finaln = 0; //全文的一致性
            if(response.data == 1)
            {
              finaln = 1;
            }
            else
            {
              var allfile = response.data;
              document.getElementById("allfile").innerHTML = allfile;
              var mykvalue = new Array(19);
              var allclass = ['trigger1', 'trigger2', 'trigger3', 'trigger4', 'people', 'time', 'place', 'sign_people', 'sign_paper', 'sign_time', 'sign_place', 'build_people', 'build_name', 'build_time', 'build_place', 'activity_people', 'activity_name', 'activity_time', 'activity_place'];
              var myclass;
              ct = 0;
              // 一致性检测
              for (myclass in allclass)
              {
                // console.log(allclass[myclass])
                var getnode = document.getElementById("allfile").getElementsByClassName(allclass[myclass]);
                var temp = new Array();
                var n = 0;  //类内的一致性
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
                        console.log(i+'->'+j+'=========',end1,start2,end2,start1,'type1');
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
                if(getnode.length)
                {
                  mykvalue[myclass] = n/getnode.length;
                  ct++;
                }
                else
                {
                  mykvalue[myclass] = 0;
                }
                console.log('mykvalue=', mykvalue[myclass]);
                finaln += mykvalue[myclass];
              }
              finaln = finaln/ct;
              console.log('finaln=', finaln);
            }
            
            this.$options.methods.storeK(finaln,this);
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
    /* line-height: 200px; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    line-height: 25px;
  }

  .el-row{
    padding: 10px;
  }

  .el-button{
    float: left;
    margin: 3px;
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
  .people:hover, .time:hover, .place:hover, .trigger1:hover, .trigger2:hover, .trigger3:hover, .trigger4:hover
  {
    background-color:yellow;
  }
  .sign_time:hover, .sign_people:hover, .sign_paper:hover, .sign_place:hover
  {
    background-color:yellow;
  }
  .build_people:hover, .build_name:hover, .build_time:hover, .build_place:hover
  {
    background-color:yellow;
  }
  .activity_people:hover, .activity_name:hover, .activity_time:hover, .activity_place:hover
  {
    background-color:yellow;
  }
</style>
