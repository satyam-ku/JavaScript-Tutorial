//converting object to json
const student1 = {
    name:"ramu",
    age: 52
}

console.log(student1)
const result1 = JSON.stringify(student1)
console.log(result1)


//coverting json to string
const student2 = '{"name":"ramu","age":52}'
console.log(student2)
const result2 = JSON.parse(student2)
console.log(result2)

