const mongoose=require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/LoginSignUpTravelong") /* this command is use to connect node to your database  */
// LoginSignUpTravelong database name h 

.then (()=>
{
    console.log("mongodb connected ");
})
.catch (()=>
{
    console.log ("failed ");
})
// database is created 

// now to create document we need to create a schema

const LogInSchema=new mongoose.Schema({ // this is formate of document and content with in is how doucment look like 

    emailId:
    {
    type:String,
    required:true
    },
    password:
    {
        type:String,
        required:true
    }
    }) 

    // now document schema is created 

    // now to bulid / define the collection part 
module.exports=mongoose.model("Collection1 ",LogInSchema);

    
