function greet(){
    console.log("hellloooo .... Worldd!!!")
}
greet()

function greet(name){
    console.log("hellloooo ....!!! "+ name)
}
greet("Raj")

function greet(name,place){
    //console.log("i am "+ name + " from "+ place)
    console.log(`i am ${name} from ${place}`)
}
greet("Raj","lpu")

function add(a,b){
    return a+b;
}
console.log(add(20,30))