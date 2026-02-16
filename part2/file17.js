const products = ["product1", "product2", "product3"];
// for(let i=0;i<products.length;i++){
//     console.log(products[i]);
// }

// products.forEach( () => {})
products.forEach( (product) => {console.log(product)}) // for each loop

function controller(f){
    console.log(f);
}
controller(10);

// () => console.log("Helloo...!!")

const f1 = () => console.log("Helloo...!!") // assign function to variable
f1();


function greet(){
    console.log("This is java class")
}
const f2 = () => greet();
f2(); // when we call f2, f2 calls greet function.

function greet1(f){
    f();
}
greet1( () => console.log("This process is called callback function."))

