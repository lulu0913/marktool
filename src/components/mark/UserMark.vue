<template>
  <div class="mark">
    <!-- 左边的文本框 -->
    <div class="left">
      <!-- 普通用户的标注界面 -->
      <div class="user_mark_place">
        <p v-html = 'filecontent' ></p>
        <textarea v-html = 'filecontent' class="text_content" id="test"></textarea>
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
        const myField = document.getElementById("test");
            if (myField.selectionStart || myField.selectionStart === 0) {
                var startPos = myField.selectionStart
                var endPos = myField.selectionEnd
                console.log(startPos);
                console.log(endPos);
                var myvalue = myField.value.substring(startPos, endPos)
                this.filecontent = myField.value.substring(0, startPos) + '\<span style="background-color:#31acfd"\>' + myvalue + '\<\/span\>'
                            + myField.value.substring(endPos, myField.value.length)
            }
    },
    time(){
        const myField = document.getElementById("test");
            if (myField.selectionStart || myField.selectionStart === 0) {
                var startPos = myField.selectionStart
                var endPos = myField.selectionEnd
                console.log(startPos);
                console.log(endPos);
                var myvalue = myField.value.substring(startPos, endPos)
                this.filecontent = myField.value.substring(0, startPos) + '\<span style="background-color:#22e663"\>' + myvalue + '\<\/span\>'
                            + myField.value.substring(endPos, myField.value.length)
            }
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
}
</style>
