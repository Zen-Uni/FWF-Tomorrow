var str = "1234566";
var str1 = "cehnxianrui12345";
var patternBits = /^\w{6,}$/;
var patternAllNumber = /^\d+$/;
if (!patternBits.test(str)) {
    console.log("密码不能少于五位");
} else 
if (patternAllNumber.test(str)) {
    console.log("密码不能全是数字");
}
var checkBits = /^\d{5,}$/;
var checkRight = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/;
//密码要超过5位数
//密码不能全是数字
console.log(patternBits.test(str));
console.log(checkBits.test(str));
console.log(checkRight.test(str1));


//-------------测试使用json
var json = {
    "user1": {
        "username" : "Henry",
        "password" : "123456"
    }
};
var keyInPassword = "123456";
