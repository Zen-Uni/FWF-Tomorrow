/**
 * @description 点击提交时或按回车触发check（）函数验证邮箱格式
 * @description 密码要求5-10位字母数字下划线 需要协调更改
 * @param{string} className 类名
 * @param{string} res 服务器返回信息 ----测试使用，需要删掉----
 * @author XXQ
 */
function $(className){
    return document.getElementsByClassName(className);
}
function showOutput(res){
    alert(`登录成功${JSON.stringify(res.data)}`)
}
const submit=$("container-form-logInButton")[0];
submit.addEventListener("click",check);
function check(){
    const password=$('container-form-passwordInput')[0].value;
    const email=$('container-form-userInput')[0].value;
    if(email!=""&&password!=""){
        const needEmail=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        const needPassword=/^\w{5,10}$/;
        if(needEmail.test(email)&&needPassword.test(password)){
                axios.post('http://60.205.230.224:8000/api/user/login',{email:`${email}`,password:`${password}`}) //{email:`${email}`,password:`${password}`}
                .then(res=>{showOutput(res);console.log(res.data.code)
                    if(res.data.code==0){   //code==0请求成功
                    const _token=res.data.data.token;
                        if(_token){
                            window.localStorage.setItem("token",_token);//res.data.msg代为token信息，给出接口后修改！
                            console.log(localStorage.getItem("token")+"-----------验证token储存！")
                            window.location.href="/testHtml3.html"; //跳转至主页面
                            alert('登录成功！')
                        }
                        else{console.log("未获取到token，登陆失败！")}
                    }
                    else{
                        alert('登录失败，请重试！')
                    }    
                })
                .catch(err=>showOutput(err));
        }
        else if(!needEmail.test(email)){
            alert("请输入正确格式的邮件！")
        }
        else if(!needPassword.test(password)){
            alert("请输入正确格式的密码！")
        }
    }
  else{ alert("请输入邮箱");}
}
document.onkeydown = function (e) { // 回车提交表单
        var theEvent = window.event || e;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            check();
        }
}