numbers = [5,6,1,3,4,7,8]

// numbers.forEach(()=>{}) -> use for itrate through the array. 
numbers.forEach((number) => {console.log(number)})


// numbers.map(() => {}) -> use for itrate through the array and  transform or modify then return a new array.
const newArry = numbers.map((number) => {return number+1})
console.log("New Array: ",newArry)


// numbers.filter(() => {}) -> use for itrate through the array and return a new array with the elements that pass the test.
const filterArray = numbers.filter((number) => {return number%2===0})
console.log("Filter Array: ",filterArray)


// numbers.find(() => {}) -> use for itrate through the array and return the first element that pass the test., returns only one item or object
const element = numbers.find((number)=>{return number===4})
console.log("Target Value: ",element)


// numbers.reduce(() => {}) -> use for itrate through the array and return a single value.return the value as return calculation done in single value
const result = numbers.reduce((sum,number) => {return sum + number},0)
console.log("Sum of Array ",result)


// numbers.findIndex(() => {}) -> use for itrate through the array and return the index of the first element that pass the test.


//numbers.some(()=>{}) -> use for itrate through the array and return true if at least one element pass the test, otherwise return false.
const hasEven = numbers.some((number) => {return number%2===0})
console.log("Has Even Number: ",hasEven)

let marks = [78,50,90,20]
const passFail = marks.some((mark)=>{return mark>60})
if(passFail){
    console.log("Pass")
}else{
    console.log("Fail")
}


