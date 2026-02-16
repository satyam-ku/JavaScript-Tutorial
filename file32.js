const num = [10,20,30,40,50]
// let n1 = num[0]
// let n2 = num[1]
// const [n1,n2] = num // this extracction called destruction (ecmascript)
// console.log(n1)
// console.log(n2)

//rest operators
const [n1,n2,...n3] = num
console.log(n1)
console.log(n2)
console.log(n3) // remaining all elements

//skip values
const [k1,,k2] = num
console.log(k1)
console.log(k2)

//default values
const [a1,a2] = [12,15]
console.log(a1)
console.log(a2)