<template>
    <!-- 文件显示主体部分 -->
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="filename" label="文件名" width="670">
        </el-table-column>

        <el-table-column prop="number" label="标注人数" width="100">
        </el-table-column>

        <el-table-column prop="todo" label="查看标注" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" width="100">编辑</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="final" label="最终标注" width="100">
        </el-table-column>

        <el-table-column prop="export" label="导出为XML" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
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
          tableData: []
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
    }
}
</script>

<style>

</style>