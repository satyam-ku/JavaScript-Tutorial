// objects in javascript
const studuent = {
    name: "John",
    age: 20,
    city: "New York",
}
console.log(studuent)
console.log(studuent.name)
studuent.name = "Raj";
console.log(studuent.name)
console.log(studuent.age)
console.log(studuent.city)

// spread operators
//spread operator is used to copy the properties of an object into a new object
const obj = {...studuent,city:"LPU"}
console.log(obj)

const cart = {}
const items = {...cart,"laptop":2}
items = {...cart,"desktop":2}
console.log(items)