//function as a expression

let a = function greet(){
    console.log("hellloooo .... Worldd!!!")
}
// console.log(a);
a() // calling the function using variable name

// arrow function
let greet = () => {
    console.log("hellloooo .... Worldd!!!")
}
greet()    


let add = (x,y) => {
    console.log(x+y);
}
add(4,5)


let add2 = (x,y) => {
    return x+y;
}
const result = add2(4,5)
console.log(result)