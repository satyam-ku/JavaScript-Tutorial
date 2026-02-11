// let a = 10; // let is block scope variable we can change it but we cannot redeclare it
// var b= 10; // var is global variable we can change it anywhere in the program and we can redeclare it as well
// const c = 10; // constant value we cannot change it

//  let a =10;
//  function f1(){
//     let a  = 30;
//     console.log(a);
//  } 
// f1();
// console.log(a);

let a = 10;
function f1(){
   a = 20;
    if(true){
        let a = 50;
        console.log(a);
    }
    console.log(a);
}
f1();
console.log(a);