// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';

Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;

Vue.config.productionTip = false

Vue.prototype.changeData = function (){//changeData是函数名
  alert('执行成功');
}
    //  标注会见会谈
Vue.prototype.people = function(){
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
  para.setAttribute("title","参与方"); // 节点的属性是参与方
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

Vue.prototype.time = function(){
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
  para.setAttribute("title","时间");
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

Vue.prototype.place = function(){
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
  para.setAttribute("title","地点");
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

Vue.prototype.trigger1 = function(){
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
  para.style.color = "orange";
  para.setAttribute("class","trigger1"); // 节点的属性是参与方
  para.setAttribute("title","触发词");
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

// 标注签署文件
Vue.prototype.sign_people = function(){
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
  para.setAttribute("class","sign_people"); // 节点的属性是参与方
  para.setAttribute("title","签署方");
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

Vue.prototype.sign_paper = function(){
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
  para.setAttribute("class","sign_paper");
  para.setAttribute("title","文件");
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

Vue.prototype.sign_time = function(){
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
  para.setAttribute("class","sign_time");
  para.setAttribute("title","签署时间");
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

Vue.prototype.sign_place = function(){
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
  para.style.color = "purple";
  para.setAttribute("class","sign_place");
  para.setAttribute("title","签署地点");
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

Vue.prototype.trigger2 = function(){
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
  para.style.color = "orange";
  para.setAttribute("class","trigger2"); // 节点的属性是参与方
  para.setAttribute("title","触发词");
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

// 标注设施启用
Vue.prototype.build_people = function(){
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
  para.setAttribute("class","build_people"); // 节点的属性是参与方
  para.setAttribute("title","设施修建方");
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

Vue.prototype.build_name = function(){
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
  para.setAttribute("class","build_name");
  para.setAttribute("title","设施名称");
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

Vue.prototype.build_time = function(){
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
  para.setAttribute("class","build_time");
  para.setAttribute("title","启用时间");
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

Vue.prototype.build_place = function(){
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
  para.style.color = "purple";
  para.setAttribute("class","build_place");
  para.setAttribute("title","启用地点");
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

Vue.prototype.trigger3 = function(){
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
  para.style.color = "orange";
  para.setAttribute("class","trigger3"); // 节点的属性是参与方
  para.setAttribute("title","触发词");
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

// 标注举办活动
Vue.prototype.activity_people = function(){
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
  para.setAttribute("class","activity_people"); // 节点的属性是参与方
  para.setAttribute("title","举办方");
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

Vue.prototype.activity_name = function(){
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
  para.setAttribute("class","activity_name");
  para.setAttribute("title","活动名称");
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

Vue.prototype.activity_time = function(){
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
  para.setAttribute("class","activity_time");
  para.setAttribute("title","活动时间");
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

Vue.prototype.activity_place = function(){
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
  para.style.color = "purple";
  para.setAttribute("class","activity_place");
  para.setAttribute("title","活动地点");
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

Vue.prototype.trigger4 = function(){
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
  para.style.color = "orange";
  para.setAttribute("class","trigger4"); // 节点的属性是参与方
  para.setAttribute("title","触发词");
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

// 用来控制不同时间对应于不同的按钮
Vue.prototype.mySelection = function(){
  var myselect = document.getElementById("select_1");
  var index=myselect.selectedIndex;
  var myevent = myselect.options[index].value;
  console.log(myevent);
  if(myevent=='hjht'){
    // console.log(1)
    document.getElementById("hjht").style.display="inline";
    document.getElementById("qswj").style.display="none";
    document.getElementById("ssqy").style.display="none";
    document.getElementById("jxhd").style.display="none";
  }
  if(myevent=='qswj'){
    document.getElementById("hjht").style.display="none";
    document.getElementById("qswj").style.display="inline";
    document.getElementById("ssqy").style.display="none";
    document.getElementById("jxhd").style.display="none";
  }
  if(myevent=='ssqy'){
    document.getElementById("hjht").style.display="none";
    document.getElementById("qswj").style.display="none";
    document.getElementById("ssqy").style.display="inline";
    document.getElementById("jxhd").style.display="none";
  }
  if(myevent=='jxhd'){
    document.getElementById("hjht").style.display="none";
    document.getElementById("qswj").style.display="none";
    document.getElementById("ssqy").style.display="none";
    document.getElementById("jxhd").style.display="inline";
  }
},

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
