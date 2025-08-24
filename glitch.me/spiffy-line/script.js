function id_gen(){
  var id=Math.floor(Math.random()*9000000);
  if(id<1000000){
    id=id+1000000;
  }
  return id;
}
var name_list = ["丈夫",
                "妻子",
                "老妈",
                "老爸",
                "女朋友",
                "男朋友",
                "儿子",
                "女儿",
                "姐姐",
                "妹妹",
                "哥哥",
                "弟弟",
                "老师",
                "同学",
                "同桌",
                "情人",
                "恋人",
                "伴侣",
                "soulmate",
                "best friend",
                "boy friend",
                "girl friend",
                "初恋",
                "发小",
                "青梅竹马",
                "启蒙老师",
                "战友",
                "老板",
                "孙子",
                "孙女",
                "徒弟",
                "师傅",
                "远房亲戚",
                "叔叔",
                "阿姨",
                "情敌",
                "姑姑",
                "衣食父母",
                "婶婶",
                "大舅舅",
                "小舅舅",
                "ex",
                "死党",
                "兄弟",
                "BFF",
                "救星",
                "猫咪"];
function get_name(){

  var name;
  if(name_list.length > 0){
    var index = Math.floor(Math.random()*name_list.length);
    name = name_list[index];
    name_list.splice(index,1);
  }else{
    name = "基友";
  }
  return name;
}
$(document).ready(function(){
  $("#come").click(function(){
    var id = id_gen();
    $("#list").append($("<li><a target='_blank' href='https://www.douban.com/people/"+id+"/'>你前前世的"+get_name()+"</a></li>"));
  });
});