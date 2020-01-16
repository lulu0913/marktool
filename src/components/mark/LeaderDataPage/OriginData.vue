<template>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="filename" label="已上传文件">
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
    }

}
</script>

<style>

</style>