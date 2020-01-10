<template>
  <div class="mark">
    <!-- 左边的文本框 -->
    <div class="left">
      <!-- 普通用户的标注界面 -->
      <div class="user_mark_place">
        <p v-html = 'filecontent'></p>
      </div>
    </div>

    <!-- 右边的标注工具 -->
    <div class="right">

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
}
</script>

<style>
.body{
    width : 85%;
    margin-left: 8%;
}
</style>
