import { edit,add,del } from './toDoPiece.js';


$("#pieces>div").on("click", (event) => {
    

    edit($(event.currentTarget));


});


$("#button-add").on("click", () => {
    add();
});


$("#button-del").on("click", (event) => {

    console.log((event.currentTarget));
    del($(event.currentTarget));


});