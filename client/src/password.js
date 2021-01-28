import {users} from './jsonOperation.js';

let check = (text) => {
    //正则表达式简单的检查密码难度
    let patternBits = /^\w{6,}$/;//少于6位数的密码不行！
    let patternAllNumber = /^\d+$/;//全是数字的密码不行！

    if (!patternBits.test(text)) {
        alert("密码不能少于六位");//暂定
    } else 
    if (patternAllNumber.test(text)) {
        alert("密码不能全是数字");//暂定
    } else {
        alert("good job!");
    }
}



let compare = (text,user) => {
    let testText = user.password;
    //目前仅验证第一个用户密码

    if (testText == text) {
        alert("密码正确")
    };
}



export { check,compare };




