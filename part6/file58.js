// "use strict"
let x = 10 //no error
console.log(x)


x = 10 //no error
console.log(x)

// "use strict"
x = 10 // gives error
console.log(x)

function add(a,a){ // not give error
    console.log(a+a)
}
add(4,5)

function addd(a,b){
    console.log(a+b)
}
addd(4,6)



