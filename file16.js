let cart = []
//click on add to cart button on any product
cart = [...cart,{name: "iphone", price: 100000, quantity: 1}]
// console.log(cart)
cart = [...cart,{name: "speaker", price: 1000, quantity: 1}]
console.log(cart)


const order = {
    email:"abc@gmail.com",
    items:cart,
    orderValue: 101000,
    status: "pending"
}

db.orders.insertOne(order)

//create flipkart dbs
//create collections orders > email ,items, orderValue, status,orderdate
//create colllection uses > name , email, password, role
//insert seed data in both collections
//write aggreagte query to display all the orders placed by a particular user
//
