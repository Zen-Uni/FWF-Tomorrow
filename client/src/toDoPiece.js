import {} from './initToDo.js';


let inputPiece = $("<input></input>").attr({
    "type" : "input",
    "value" : "test",
    "id" : "piece-keyIn"
});
//输入框是重复使用的

let addPiece = (() => {
    let counter = 0;
    return () => {
        //这里还有操作空间
        return $(`<div>未改变${counter++}</div>`).attr({
            "index" : counter   
        });
    }
})();
//使用一个闭包（保存counter）新建piece

//这里inputPiece可以写成是一个return 回来的东西



let edit = (piece) => {

    let backup = piece.replaceWith(inputPiece.val(piece.text()));
    setTimeout(() => {
        //这里假装是一个异步操作，应该在这三种条件下才往下走
        //一是点击空白处
        //二是回车
        //三是给“人”用的“确认”按钮
        backup.on("click",(event) => {

            edit($(event.currentTarget));

        }).text(inputPiece.val()).replaceAll(inputPiece);
    },1000);
}

let add = () => {
    let piece = addPiece();
    $("#pieces").append(piece);
    edit(piece);
}

let del = (piece) => {
    let backup = piece.detach();
    console.log(backup);

    //弹窗（很弱），返回一个值
    //result=true 为确认撤回
    setTimeout(() => {
        if (true) {
            $("#pieces").append(backup);
            //这里没有考虑回到特定位置
        } else {
            //执行真正的删除，并保存
            alert("已删除");
        }
    },1000)
    //测试给三秒钟时间选择是否撤回，实际要求一直等待，所以要用弱弹窗
}

export { edit,add,del };