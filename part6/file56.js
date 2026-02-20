const employees = ["Jon","caT","Mike","mice"]
for(let e in employees){
    console.log(e); //print index of array
    console.log(employees[e]); // print the values
}

const student ={
    name:"Johnnn",
    age: 15
}
for(let s in student){
    console.log(s) //print keys of object
    console.log(student[s])// print the values
}