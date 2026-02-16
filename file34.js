// function response(user) {
//     console.log(user)
// }

function response({name,email,role}) {
    console.log(name);
    console.log(email);
    console.log(role);
}

const user = {
    name:"Anuj",
    email:"anuj@gmail.com",
    role: "user"
};
response(user)