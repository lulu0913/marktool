<template>
<div>
  <div class="inputk">
    <p>请输入最小的一致度k值</p>
    <input id="numb">
    <button type="button" @click="abovek()">提交</button>
  </div>
    <!-- 文件显示主体部分 -->
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="filename" label="文件名" width="670">
        </el-table-column>

        <el-table-column prop="number" label="标注人数" width="100">
        </el-table-column>

        <el-table-column prop="k" label="一致性" width="100">
        </el-table-column>

        <el-table-column prop="todo" label="查看标注" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" width="100">编辑</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="export" label="导出为XML" width="100">
          <template slot-scope="scope">
            <el-button @click="xmlClick(scope.row)" type="text" size="small">导出</el-button>
          </template>
        </el-table-column>
        <!-- 如果有最终标注则可以导出为xml，如果没有最终标注那么xml为灰色 -->
      </el-table>
    </el-main>
    <!-- 用来生成xml文件，寻找文件节点时使用 -->
    <div v-html = 'filetxt' id="filexml" style="display:none" contenteditable="true" ></div>
</div>
</template>

<script>
export default {
    name:'NewData', 
    mounted: function(){
        this.show();
    },
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
          tableData: [],
          filetxt: '',
      }
    },
    methods: {
        show(){          
            const self = this;                      
            self.$axios.post('/api/content/datamarked') //前端接口
            .then((response) => {
              console.log(response);
              // console.log(response.data.length);
              // console.log(response.data[1].id);
              this.tableData = response.data;              
            }).then((error) => {
                console.log(error);
            })         
        },

        //  打开对应的行的文本文件进行两个文本比较
        handleClick(row) {
          const self = this;                      
          var filename = row.filename;
          console.log(row.filename);
          localStorage.setItem('name_leadermark',row.filename); //  txt文件的名字
          this.$router.push('/leadermark');
        },
        //展示一致性比k大的数据
        abovek(){
          var x = document.getElementById("numb").value;
          const self = this;                      
          self.$axios.post('/api/content/datamarked') //前端接口
            .then((response) => {
              console.log(response);
              // console.log(response.data.length);
              // console.log(response.data[1].id);
              this.tableData = response.data;  
              var tabledata = this.tableData;
              for(var i=0;i<tabledata.length;i++)
              {
                if (isNaN(x) || x < 0 || x > 1)
                {
                  alert("我亲爱的朋友，请输入0到1范围内的数字！");
                  break;
                }
                else if(tabledata[i].k < x)
                {
                  tabledata.splice(i, 1);
                  i--;
                }
              }
              // console.log(tabledata);            
            }).then((error) => {
                console.log(error);
            })    

        },
        // 创建并下载xml文件
        xmlClick(row) {
          console.log(row.filename);
          let filename = row.filename;
          let username = localStorage.getItem('ms_username'); 

          var data = {'filename': filename, 'username': username}
          this.$axios.post('/api/modify/getfinal', data).then((response)=>{
            console.log(response.data);// 请求到的用户标注过的文本

            if((response.data)==0)
            {
              alert('用户组长还没有确定最终标注，请先确定最终标注！');
            }
            else
            {
              localStorage.setItem('filetxt',response.data);
              this.filetxt = response.data;

              var getnode = document.getElementsByClassName("get");
              var xmldom = document.implementation.createDocument("", "root", null); // 创建xml对象
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
                child.setAttribute("ROLE", "参与方");
              }

              var serializer = new XMLSerializer();
              var xml = serializer.serializeToString(xmldom);// 将xml解析为dom
              console.log(xml);

              let a = document.createElement('a');
              let blob = new Blob([xml]); 
              let objectUrl = URL.createObjectURL(blob);
              a.setAttribute("href",objectUrl);
              a.setAttribute("download", '123.xml');
              a.click();


              console.log(xmldom);
            }
 
            }).then((error) => {
                console.log(error);
            })
        },
    }
}
</script>

<style>
.inputk{
  margin-right: 18%;
}
</style>