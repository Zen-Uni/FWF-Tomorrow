import { check,compare } from './password.js';
import { load,users } from './jsonOperation.js';


load.then((result) => {

    $("#button-check").on("click" , () => {
        check($("#password").val());
    });

    $("#button-compare").on("click", () => {
        compare($("#password").val());
    });

    compare("chan123456",result[0]);

});


