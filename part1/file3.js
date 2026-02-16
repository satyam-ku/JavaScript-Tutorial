let a = 10;
let b = 4;
//arithmethic operators
console.log("The sum of a and b is: " + (a+b));
console.log("The difference of a and b is: " + (a-b));
console.log("The product of a and b is: " + (a*b));
console.log("The quotient of a and b is: " + (a/b));
console.log("The remainder of a and b is: " + (a%b));
console.log("The value of a raised to the power b is: " + (a**b));

//comprasin operators
console.log("Is a equal to b? " + (a==b)); //== operator checks only value
console.log("Is a equal to b? " + (a===b)); //=== operator checks both value and data type
console.log("Is a not equal to b? " + (a!=b)); //!= operator checks both value.
console.log("Is a greater than b? " + (a>b));//greater than operator
console.log("Is a less than b? " + (a<b));  //less than operator
console.log("Is a greater than or equal to b? " + (a>=b));//greater than or equal to operator
console.log("Is a less than or equal to b? " + (a<=b));//less than or equal to operator

let x = "10";
let y = 10;
console.log(x==y)
console.log(x===y)

//logical operators
console.log(a>b && a>20)
console.log(a>b || a>20)
console.log(!(a>b))