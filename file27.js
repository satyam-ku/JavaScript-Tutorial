let score = 90
let result
// if(score>50){
//     result = "PASS"
// } 
// else result = "FAIL"
// console.log(result).

result = score > 50 ? "Pass" : "Fail"
console.log(result)

//another method if only care about true part

let resultt = score>50 && "Pass"
console.log(resultt)

let scoree
let ressult = scoree || 30 // if score has any value then its ok other wise if dont any value it feel default value 30.
console.log(ressult)

