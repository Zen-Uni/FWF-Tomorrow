/**
 * @description 点击提交时或按回车触发check（）函数验证邮箱格式
 * @description 密码要求5-10位字母数字下划线
 * @author XXQ
 */
function showOutput(res){
    alert(`登录成功${JSON.stringify(res.data)}`)
}
const submit=document.getElementsByClassName("container-form-logInButton")[0];
submit.addEventListener("click",check);
function check(){
    const password=document.getElementsByClassName('container-form-passwordInput')[0].value;
    const email=document.getElementsByClassName('container-form-userInput')[0].value;
    if(email!=""&&password!=""){
        const needEmail=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        const needPassword=/^\w{5,10}$/;
        if(needEmail.test(email)&&needPassword.test(password)){
            axios.post('http://jsonplaceholder.typicode.com/todos',{email:`${email}`,password:`${password}`})
            //这里的axios需要替换
            .then(res=>{
                showOutput(res);
                console.log(res);
                window.location.href="/testHtml3.html"; //跳转至主页面
            }
            )
            .catch(err=>{alert('登录失败，请重试！'); console.log(err);})
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
    function signUpPage(){
        //跳转至注册页面
        //需完善
    }