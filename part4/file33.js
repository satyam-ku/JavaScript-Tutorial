const student = {
    name: "Abhishek",
    age: 22,
    // city: "Jalandhar"
    marks: {
        math:85,
        sci: 78
    }
}
// names = ["Karan", "Caps", "Nike", "Digjay"]
// const [n1,n2] = names
// console.log(n1)
// console.log(n2)

const {name,age} = student
console.log(name)
console.log(age)

// const {n1,n2} = student //its not work in objects only work in array
// console.log(n1)
// console.log(n2) 

const {name:userName} =student
console.log(userName)

const {city = "Amritsar"} =student
console.log(city)

const {marks:{math}} = student //nested object destructring
console.log(math)


