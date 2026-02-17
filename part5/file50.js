const clsx = require("clsx")

function p1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("P1 Success")
        },3000)
    })
}

function p2(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            // resolve("P2 Success")
            reject("P2 failed")
        },1000)
    })
}

function p3(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("P3 Success")
        },2000)
    })
}

async function main(){
    try{
    // const result = await Promise.all([p1(),p2(),p3()]); // all resolves then it will run
    // const result = await Promise.race([p1(),p2(),p3()]);  // execution time jiska km h woh pehle ho jayea baki se it=sko mtlb nahi
    // const result = await Promise.any([p1(),p2(),p3()]); // koi ek success ho tho reolve ho jayega sara
    const result = await Promise.allSettled([p1(),p2(),p3()]); 
     console.log(result)
    } catch (err){
        console.log(err)
    }
}

main();