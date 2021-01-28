/**
 * 点击表单提交时触发check（）函数验证邮箱格式
 */
/*
document.getElementsByClassName("form-submit")[0].addEventListener("click",check);
function check(){
    var tem=document.getElementById('input');
    var result=tem.value;
    var need=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if(result==""){
        alert("请输入邮箱")
    }
    else if(need.test(result)){  
    }
    else{
        alert("请输入正确格式邮箱!")
    }
}
*/

/**
 * 点击添加按钮实现输入弹窗
 * 点击旁白实现关闭
 */
var but=document.getElementsByClassName("but")[0];
but.addEventListener("click",appear);
var popup=document.getElementsByClassName("popup")[0];
function appear(){
    popup.style.display="block";
    but.style.display="none";
}
window.onclick=function(event){
    if(event.target==popup){
        popup.style.display="none";
        but.style.display="";
    }
}
var listSubmit=document.getElementsByClassName('popup-form-submit')[0];
listSubmit.addEventListener("click",shut);
function shut(){
    popup.style.display="none";
    but.style.display="";
}

/**
 * 点击回车关闭输入框
 */
document.onkeydown = function (e) { // 回车提交表单
    // 兼容FF和IE和Opera
        var theEvent = window.event || e;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            shut();
        }
    }


/**
 * 修改任务列表名称
 */
var listValue=document.getElementsByClassName('popup-form-input')[0].Value;
var valueTxt=createTextNode(listValue);
listSubmit.addEventListener("click",addList);
function addList(){
    if(valueTxt!=""){
    var newList=document.createElement("div");
    var container=document.getElementsByClassName[0]('container');
    container.insertBefore(newList,popup);
    newList.className="list1";

    }
    else{
        alert('列表名称不能为空！')
    }
}

