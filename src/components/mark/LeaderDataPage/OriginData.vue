<template>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="filename" label="已上传文件">
        </el-table-column>

        <el-table-column prop="todo" label="操作" >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">下载</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-main>
</template>

<script>
export default {
    name: 'OriginData',
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
      }
    },
    methods:{  
        show(){          
          const self = this;                      
          self.$axios.post('/api/user/leadershowdata') //前端接口
          .then((response) => {
              // console.log(response);
              // console.log(response.data.length);
              // console.log(response.data[1].id);
              this.tableData = response.data;              
          }).then((error) => {
              console.log(error);
          })         
        },

        handleClick(row) {
          const self = this;                      
          console.log(row.filename);
          var filepath = row.filepath;
          var filename = row.filename;
          var data = {'filepath': filepath, 'filename': filename};
          this.$axios.post('/api/content/txt', data).then((response)=>{
              console.log(response.data);
              var filecontent = response.data;

              // 通过a标签的download属性下载txt文件
              var element = document.createElement('a');
              element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(filecontent));
              element.setAttribute('download', filename);
              element.style.display = 'none';
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
          }).then((error) => {
              console.log(error);
          })
        },

    }

}
</script>

<style>

</style>