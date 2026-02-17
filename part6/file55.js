try{
    console.log(num);
} catch(err){
    console.log("Something Went Wrong"); // text message custmize
     console.log(err.name); //name of error
      console.log(err.message); //message of error
       console.log(err); //show whole error
}