// Hoistingg with Var
// console.log(name)
// var name = "John"

var name
console.log(name)
name = "Jony"

//Hoisting with let and const
let namee
console.log(namee)
namee = "jouky"

//functions are fully hoisted 
greet()
function greet(){
    console.log("Hello World!!")
}