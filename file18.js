// const products = ["product1", "product2", "product3"];
const products = [
    {id:1,name:"LapTop",price: 25000,description:"this is laptop"},  
    {id:2,name:"Mobile",price: 15000,description:"this is mobile"},
    {id:3,name:"Tablet",price: 20000,description:"this is tablet"}
]
products.forEach( (product) => {console.log(product)})

let cart = []
products.forEach( (product) => {
    product.quantity = 1
    product.total = product.price * product.quantity
    //cart.push(product)
    cart = [...cart,product]
})

console.log(cart)

