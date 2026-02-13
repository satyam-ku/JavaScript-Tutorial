const products = [
    {id:1,name:"LapTop",price: 25000,description:"this is laptop",category:"electronics"},  
    {id:2,name:"Mobile",price: 15000,description:"this is mobile",category:"electronics"},
    {id:3,name:"Tablet",price: 20000,description:"this is tablet",category:"electronics"},
    {id:4,name:"Perfume",price: 250,description:"this is perfume",category:"cosmetics"},  
    {id:5,name:"Pencil",price: 150,description:"this is pencil",category:"stationary"},
    {id:6,name:"Book",price: 200,description:"this is book",category:"stationary"}
]

let cart = []

function addToCart(productId){
    const obj = products.find((product) => product.id == productId)
    // cart = [...cart,{...obj,quantity:1}]
    cart.push({...obj,quantity:1})
}
addToCart(1)
addToCart(3)
addToCart(5)

console.log(cart)

function increment(productId){
    const item = cart.find(product => product.id == productId)
    // cart[index].quantity = cart[index].quantity + 1;
    item.quantity++
}
increment(1)
increment(5)
console.log(cart)


