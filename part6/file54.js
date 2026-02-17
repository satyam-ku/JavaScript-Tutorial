function user(){
    let password = "1234";
    function checkPassword(inputPassword){ // checkPassword is closure function
        return password === inputPassword;
    }
    return checkPassword;
}
const checkPassword = user()
console.log(checkPassword("1234"))