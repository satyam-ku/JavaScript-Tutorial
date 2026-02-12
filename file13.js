const names = ["raj", "sanjay", "sachin", "rohit"];
console.log(names);
console.log(names[1]);
names.push("virat");
console.log(names);
const arr = [...names, "dhoni"];
console.log(arr); 
// differense betwween push and spread operator is that push method modifies the original array while spread operator creates a new array with the added element.
