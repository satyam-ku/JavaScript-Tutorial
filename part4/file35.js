const names = ["Surya","Vivek","Raj"]
names.push("Sahin")
console.log(names)
names.pop() // remove last element
console.log(names)
names.shift() //remove first element
console.log(names)
names.unshift("Pravin") //add in the begining of array 
//shift and unshift is slower beacuse of rearrangement
console.log(names)

const name = new Array("Surya","Raj","Vivek")
console.log(name)

names.sort()
console.log(names)
names.reverse()
console.log(names)

// array sorting with numbers
const num = [5,78,96,23,46]
console.log(num.sort((a,b)=> a-b)) //sort in aascending order
console.log(num.sort((a,b)=> b-a)) // sort in descending order

console.log(num.indexOf(23)) //index of 23
console.log(num.lastIndexOf(46)) // last index of 46

console.log(num.includes(5)) //checks element is present or not

console.log(num.slice(1,3)) // give only 2 element

