const { th } = require("framer-motion/client")

const emp = {
    name: "John",
    display: function(){
        console.log(this.name)
    }
}
emp.display()

const emp1 = {
    name: "Mice",
    display: function(){
        console.log(this.name)
    }
}
emp1.display()



//prototype
function Employee(name){
    this.name = name;
}

Employee.prototype.display = function(){
    console.log(this.name)
};

const emp11 = new Employee("amit");
const emp12 = new Employee("rajeks")
emp11.display();
emp12.display();

