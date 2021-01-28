var jsonText = `[
    {
        "username" : "Henry",
        "password" : "chan123456"
    },
    {
        "username" : "Amy",
        "password" : "chan123456"
    }
]`;
var users = JSON.parse(jsonText);
console.log(users[0].username);