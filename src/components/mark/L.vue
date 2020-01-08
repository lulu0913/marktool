<template>
<div>
<h1>{{ username }}组长，您好！</h1>
<div id="app">
<el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '4']">
      <el-submenu index="4">
          <template slot="title"><i class="el-icon-upload"></i>上传文件</template>
          <br>
           <!--图片，文件的上传与图片展示-->
 <el-upload
          class="upload-demo"
          ref="upload"
          action="/api/user/postFile"
          :on-preview="handlePreview"
          :on-remove="imgRemove"
          :on-change="changeState"
          list-type="picture-card"
          :show-file-list="true"
          :file-list="imgfileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!--        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload"
                             v-if="newFile.length!==0">开始上传
                  </el-button>-->
          <div slot="tip" class="el-upload__tip" :style="'color:'+color">{{errorMessage}}</div>
          <el-dialog :visible.sync="dialogVisible" :modal="false">
            <img height="60%" width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-upload>
 <!--文件展示-->
        <el-upload
          class="upload-demo"
          ref="upload2"
          action="/api/user/postFile"
          :on-remove="fileRemove"
          list-type="text"
          :on-preview="handleFile"
          :show-file-list="true"
          :file-list="fileList"
          :auto-upload="false">
        </el-upload>
      </el-submenu>  
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user"></i>小组成员1</template>
        <el-menu-item-group>
          <template slot="title">标注任务</template>
          <el-menu-item index="1-1"><i class="el-icon-menu"></i>6月</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-menu"></i>7月</el-menu-item>
          <el-menu-item index="1-3"><i class="el-icon-menu"></i>8月</el-menu-item>
        </el-menu-item-group>
        </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-user"></i>小组成员2</template>
        <el-menu-item-group>
          <template slot="title">标注任务</template>
          <el-menu-item index="2-1"><i class="el-icon-menu"></i>9月</el-menu-item>
          <el-menu-item index="2-2"><i class="el-icon-menu"></i>10月</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-user"></i>小组成员3</template>
        <el-menu-item-group>
          <template slot="title">标注任务</template>
          <el-menu-item index="3-1"><i class="el-icon-menu"></i>11月</el-menu-item>
          <el-menu-item index="3-2"><i class="el-icon-menu"></i>12月</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>注销</span>
        
    </el-header>
    
  </el-container>
</el-container>
</div>
</div>
</template>

<script>

export default {
  name: 'L',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      msg1: 'hello my app',
      username:  window.localStorage.getItem('ms_username') ,
      imgUrl:'',//预览地址
      imgTitle:'',
      isShowImg:false,
    
      newFile: [],//新增图片的缓存
      color: '#000000',//错误提示颜色
      fileUrl: 'http://127.0.0.1:8081/#/L',//预览文件的地址
      fileList: [],//文件集合
      imgfileList: [],//图片集合
      base64List: [],//base64集合
      dialogVisible: false,//文件预览窗口状态
      dialogImageUrl: '',   //预览图片的地址
      errorMessage: '只能上传图片，文档等类型文件，且文件大小不能超过50M'
    }
      
  },
     methods: {
            
 
            //todo 图片增加钩子
            changeState(file, fileList) {
                let that = this
                //文件格式[通用算法]
                let str = file.name.split('').reverse().join('');
                let format = str.substring(0, str.indexOf(".")).split('').reverse().join('')
                const imgType = ['jpeg', 'jpg', 'png', 'bmp', 'gif', 'tif', 'tga', 'ico']
                const fileType = ['pdf', 'txt', 'xlsx', 'xls', 'doc', 'docx', 'pptx', 'ppt', 'rar', 'zip', 'z7']
                let isFormat = false
                let formatArr = imgType.concat(fileType)
                for (let i = 0; i < formatArr.length; i++) {
                    if (fileType.concat(imgType)[i] === format) {
                        isFormat = true;
                    }
                }
                if (isFormat === false) {
                    this.$notify({
                        title: '不支持该格式 !',
                        showClose: false,
                        duration: 3000,
                        offset: 100
                    });
                    this.imgfileList.push(file)
                    this.fileList.push(file)
                    this.imgfileList.splice(this.imgfileList.length - 1, 1)
                    this.fileList.splice(this.fileList.length - 1, 1)
                    this.color = "#FF0000"
                    setTimeout(function () {
                        that.color = "#000000"
                    }, 4000)
                    return
                }
                const isLt4M = 50;
                //todo 文件大小判断
                if (file.size / 1024 / 1024 > isLt4M) {
                    this.imgfileList.push(file)
                    this.fileList.push(file)
                    this.$notify({
                        title: '文件不能大于50M !',
                        showClose: false,
                        duration: 3000,
                        offset: 100
                    });
 
                    this.imgfileList.splice(this.imgfileList.length - 1, 1)
                    this.fileList.splice(this.fileList.length - 1, 1)
                    this.color = "#FF0000"
                    let that = this
                    setTimeout(function () {
                        that.color = "#000000"
                    }, 4000)
                    return
                }
                //todo 文件格式判断  【图片格式】
                for (let i = 0; i < imgType.length; i++) {
                    if (imgType[i].toLowerCase() === format.toLowerCase()) {
                        this.imgfileList.push(file)  //仅展示
                        //this.newFile = this.fileFilter()//显示按钮
                        //this.submitUpload()//上传
                        this.fileToBase64(file)
                    }
                }
                //todo 文件格式判断  【非图片格式】
                for (let i = 0; i < fileType.length; i++) {
                    if (fileType[i].toLowerCase() === format.toLowerCase()) {
                        this.fileList.push(file)//仅展示
                        this.imgfileList.push(file)
                        this.imgfileList.splice(this.imgfileList.length - 1, 1)
                        //this.newFile = this.fileFilter()//显示按钮
                        //this.submitUpload()//手动上传
                        this.fileToBase64(file)
 
                    }
                }
 
            },
 
            //todo 图片视图
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //todo 图片移除回调
            imgRemove(file, fileList) {
                this.base64List = []//清空沉积物
                this.imgfileList = fileList
                this.executeDeleteFile(file)
            },
            //todo 文件移除回调
            fileRemove(file, fileList) {
                this.base64List = []//清空沉积物
                this.fileList = fileList
                //this.newFile = this.fileFilter()//显示按钮
                this.executeDeleteFile(file)
            },
 
 
            //todo 执行删除文件【连接后端接口】
            executeDeleteFile(condition) {
                order_api.fileDelete(condition).then(response => {
                    this.refreshFileList()
                    this.$notify({
                        title: '已删除 ' + " " + condition.name + " ",
                        showClose: false,
                        duration: 2000,
                        offset: 100
                    });
                }).catch(error => {
                    //window.location.reload();
                })
 
            },
 
            //todo 自动上传
            fileToBase64(file) {
                let that = this
                let str = file.name.split('').reverse().join('');
                let fileFormat = str.substring(0, str.indexOf(".")).split('').reverse().join('')//文件格式
                let fileName = file.name//文件名
                let ordersData = that.orderData;//当前订单数据
                let reader = new FileReader();
                reader.readAsDataURL(file.raw)
                reader.onload = function (e) {
                    let base = e.target.result;
                    const loading = that.$loading({
                        lock: true,
                        text: '正 在 上 传. . .',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.76)'
                        //loading.close();
                    });
                    order_api.fileUpload({
                        name: fileName,
                        type: fileFormat,
                        base64: base
                    }, ordersData).then(response => {
                        loading.close();
 
                       // if (ordersData.imgNumber===null||ordersData.imgNumber===''){     //todo 只刷一次
                            //调用接口，刷新当前订单数据
                            order_api.findOrderOwnInfo(ordersData).then(response => {
                                const data = response.data.data.data
                                that.ExpIstData = data.instrumentData
                                that.OrderTypeData = data.OrderTypeData
                                that.orderData = data.ordersData
                                that.laborData = data.laboratoryData
                                that.orderQuantity = data.orderQuantity
 
                            })
                       // }
 
                        setTimeout(function () {
                            that.refreshFileList()//刷新图片列表
                            that.$notify({
                                title: '已添加 ' + " " + fileName + " ",
                                showClose: false,
                                duration: 2000,
                                offset: 100
                            });
                        }, 200)
 
                    }).catch(error => {
                        loading.close();
                        setTimeout(function () {
                            that.refreshFileList()
                            that.$notify({
                                title: '请求超时，请重试 ！',
                                showClose: false,
                                duration: 2000,
                                offset: 100
                            });
                        }, 200)
                        //window.location.reload();
                    })
                }
            },
            //todo 点击文件
            handleFile(file) {
                location.href = file.url;
            },
 
            //todo 刷新已上传文件列表
            refreshFileList() {
                this.imgfileList = []
                this.fileList = []
                order_api.refreshFileList(this.orderData).then(response => {
                    const data = response.data.data.data.imgData
                    const imgType = ['jpeg', 'jpg', 'png', 'bmp', 'gif', 'tif', 'tga', 'ico']
                    const fileType = ['pdf', 'txt', 'xlsx', 'xls', 'doc', 'docx', 'pptx', 'ppt', 'rar', 'zip', 'z7']
                    //todo 文件信息回填
                    for (let i = 0; i < data.length; i++) {
                        let imgNumber = data[i].imgNumber
                        let url = data[i].imgUrl
                        let name = data[i].fileName
                        let id = data[i].id
                        let str = url.split('').reverse().join('');
                        let format = str.substring(0, str.indexOf(".")).split('').reverse().join('')
                        for (let i = 0; i < imgType.length; i++) {
                            if (imgType[i].toLowerCase() === format.toLowerCase()) {//属于图片
                                this.imgfileList.push({id, name, url, imgNumber})
                            }
                        }
                        for (let i = 0; i < fileType.length; i++) {
                            if (fileType[i].toLowerCase() === format.toLowerCase()) {//属于文件
                                this.fileList.push({id, name, url, imgNumber})
                            }
                        }
                    }
                }).catch(error => {
 
                })
            },
 
     //todo 过滤掉已上传的文件  【手动上传时启用】
            fileFilter() {
                let imgList = []
                let files = []
                //todo 过滤掉已上传的文件
                if (this.imgfileList.length !== 0) {
                    for (let i = 0; i < this.imgfileList.length; i++) {
                        if (this.imgfileList[i].status === "ready") {
                            imgList.push(this.imgfileList[i])
                        }
                    }
                }
                //todo 过滤掉已上传的文件
                if (this.fileList.length !== 0) {
                    for (let i = 0; i < this.fileList.length; i++) {
                        if (this.fileList[i].status === "ready") {
                            files.push(this.fileList[i])
                        }
                    }
                }
                return imgList.concat(files)
            },
            //todo 开始上传  【暂时不用手动上传】
            submitUpload() {
                console.log("图片", this.imgfileList, "文件", this.fileList)
                let that = this
                that.base64List = []//清空沉积物
                var list = [];
                let fileList = this.newFile = this.fileFilter()//显示按钮
                for (let i = 0; i < fileList.length; i++) {
                    let str = fileList[i].name.split('').reverse().join('');
                    let fileFormat = str.substring(0, str.indexOf(".")).split('').reverse().join('')//文件格式
                    let fileName = fileList[i].name//文件名
                    var reader = new FileReader();
                    reader.readAsDataURL(fileList[i].raw)
                    /*               //todo 错误写法1  【这种写法理论上正确，但最终，list是空值】
                                     var base=''
                                     reader.onload = function () {
                                         base = e.target.result;
                                         list.push({name: fileName, type: fileFormat, base64: base})
                                     };
                                     //todo 错误写法2  【这种写法理论上正确，但最终，list中的base64是空值】
                                     reader.onload = (e) => {
                                         var base = e.target.result;
                                         list.push({name: fileName, type: fileFormat, base64: base})
                                     }*/
                    //todo 正确写法
                    reader.onload = function (e) {
                        var base = e.target.result;
                        that.base64List.push({name: fileName, type: fileFormat, base64: base})
                        if (i === fileList.length - 1) {//解决异步问题
                            start()
                        }
                    }
                }
 
                function start() {
                    list = that.base64List
                    let ordersData = that.ordersData;
                        order_api.fileUpload({list,ordersData}).then(response => {
                        }).catch(error => {
                            //window.location.reload();
                        })
                }
            },
 
        },
}
</script>





<style scoped>
    
</style>

