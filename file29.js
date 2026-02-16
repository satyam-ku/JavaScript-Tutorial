// function add(a,b){
//     console.log(a);
//     console.log(b);
// }
// add(4,6)
function add(){
    console.log(arguments);
    console.log(arguments.length);
    console.log(arguments[0])
}
add(4,6,7,8)

function add2(...arr){
    let sum = arr.reduce((total,sum)=>{total+sum},0)
    console.log(sum)
}
const result = add2(4,6,7,8)
console.log(result)

