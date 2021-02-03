/**
 * @description 点击添加按钮实现输入弹窗，点击旁白实现关闭（界面重新布局后可能需要更改）
 * @author XXQ
 */
var putFocus=document.querySelector('input');
var but=document.getElementsByClassName("but")[0];
but.addEventListener("click",appear);
var popup=document.getElementsByClassName("inputPopup")[0];
function appear(){
    popup.style.display="block";
    but.style.display="none";
    putFocus.focus();   //自动聚焦
}
function close(){
    popup.style.display="none";
    but.style.display="";
}
window.onclick=function(event){
    if(event.target==popup){
        close();
    }
}
/**
 * @description 点击回车弹出添加列表输入框，输入时点击回车关闭添加列表输入框。
 * @author XXQ
 */
document.onkeydown = function (e) { // 回车提交表单
    // 兼容FF和IE和Opera
        var theEvent = window.event || e;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13&&popup.style.display=="block") {
            createCard();
        }
        else if(code == 13&&popup.style.display=="none"){ //点击回车弹出添加列表输入框
            appear();
        }
        else if(code==27&&popup.style.display=="block"){  //点击Esc键退出输入
            close();
        }
    }
/**
 * @description 创建新列表
 * @author XXQ
 */
var listSubmit=document.getElementsByClassName('inputPopup--submit')[0];
listSubmit.addEventListener("click",createCard);
var i=0;
function createCard(){
    i++;
    var inputValue=document.getElementsByClassName('inputPopup--input')[0].value;
    if(inputValue!=""){
    var container=document.getElementsByClassName('container')[0];
    var newCard=document.createElement("div");//创建卡片
    newCard.className=`Newlist list${i}`;//给class名
    container.appendChild(newCard); //插入
    var newCardname=document.createElement('div'); //创建显示列表名称div
    newCardname.className="listName"; //给class
    newCard.appendChild(newCardname);//插入
    newCardname.innerHTML=inputValue;//将输入框内容传入作为列表名称
    var closePot=document.createElement('div');//创建x，点击关闭卡片
    closePot.className=`closeSpan closeSpan${i}`;//给class
    newCard.appendChild(closePot);//插入
    closePot.innerHTML="&#10006";//输入x
    close();
    document.getElementsByClassName('inputPopup--input')[0].value="";//清空输入框
    }
    else{alert('请输入列表名称！')}
    judge();
}

/**
 * @description 删除列表
 * @author XXQ
 */
function judge(){
    var closeSpan=document.getElementsByClassName('closeSpan');
    for(let k=0;k<closeSpan.length;k++){
        closeSpan[k].onclick=function(){
            var parentE=this.parentElement;
            parentE.remove();
            i--;
        }
    }
}
