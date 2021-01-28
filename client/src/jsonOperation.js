let users;
let load = new Promise((resolve,reject) => {
    //load('../test-Hans/test.json');
    $.getJSON('../test-Hans/test.json',(result) => {
        resolve(result);
    });
});

export {load,users};