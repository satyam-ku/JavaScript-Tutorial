// const products = ["product1", "product2", "product3"];
const products = [
    {id:1,name:"LapTop",price: 25000,description:"this is laptop",category:"electronics"},  
    {id:2,name:"Mobile",price: 15000,description:"this is mobile",category:"electronics"},
    {id:3,name:"Tablet",price: 20000,description:"this is tablet",category:"electronics"},
    {id:4,name:"Perfume",price: 250,description:"this is perfume",category:"cosmetics"},  
    {id:5,name:"Pencil",price: 150,description:"this is pencil",category:"stationary"},
    {id:6,name:"Book",price: 200,description:"this is book",category:"stationary"}
]
let search = "Book"
// const resultArray = products.map( (product) => {
//     return product
// })

// const resultArray = products.filter( (product) => {
//     return product.name == search
// })

const resultArray = products.filter ((product) => product.name == search)

console.log(resultArray)