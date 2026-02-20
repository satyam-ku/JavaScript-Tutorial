// Q. difference between regular and arrow funtion?

// student = {
//     name:"Nikhil",
//     display: function(){
//         console.log(this.name)
//     }
// }
// student.display()

// student = {
//     name:"Nikhil",
//     display: () => {
//         console.log(this.name)
//     }
// }
// student.display() //undefined

student = {
    name:"Nikhil",
    display(){
        console.log(this.name)
    }
}
student.display()

