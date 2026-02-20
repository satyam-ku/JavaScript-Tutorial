const employees = ["Jon","caT","Mike","mice"]
for(let e of employees){ // of is use for only arrays
    console.log(e); //print elements of array
}

const student ={
    name:"Johnnn",
    age: 15
}
for(let s of Object.keys(student)){
    console.log(student[s]) //print values of object
}