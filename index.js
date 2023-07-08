const express=require ("express")   ; /* it will require the express file  */
const app=express()  ; /* it will start the express*/
const path=require("path");

const hbs=require("hbs");
const Collection1 = require('./mongodb');
const BodyParser=require("body-parser");
// const Collection1=require("./mongodb");
const{json}=require("express");
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}));
const templatePath=path.join(__dirname ,'./views');



app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>
{
     res.render("signup");
})
app.get("/login",(req,res)=>
{
     res.render("login");
})
// app.post("/signup", async (req, res) => {
//   //   try {
//   //     const { emailId, password } = req.body;
  
//   //     const user = new Collection1({
//   //       emailId: emailId,
//   //       password: password,
//   //     });
  
//   //     const userData = await user.save();
//   //     console.log(userData);
//   //     res.status(201).render("login");
//   //   } catch (error) {
//   //     console.log(error.message);
//   //     res.status(500).send("Internal Server Error");
//   //   }
//   // });

// const data = {
//     emailId: req.body.emailId,
//     password: req.body.password
// }
// console.log(data);
// const checking = await Collection1.findOne({ emailId: req.body.emailId })

// try{
// if (checking.emailId === req.body.emailId && checking.password===req.body.password) {
//   res.send("user details already exists");
  
// }
// else{
//     await Collection1.insertMany([data]);
//    }
// }
// catch{
// res.send("wrong inputs");
// }

// res.status(201).render("home", {
//     emailId: req.body.emailId
// })
// })

app.post("/signup", async (req, res) => {
  try {
    const data = {
      emailId: req.body.emailId,
      password: req.body.password
    };
    console.log(data);

    const checking = await Collection1.findOne({ emailId: req.body.emailId });

    if (checking) {
      res.send("User details already exist");
    } else {
      await Collection1.create(data);
      res.status(201).render("login", {
        emailId: req.body.emailId
      });
    }
  } catch (error) {
    console.log(error.message);
    res.send("Error occurred during signup");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await Collection1.findOne({ emailId: req.body.emailId });
    console.log(check);
    if (check) {
      if (check.password === req.body.password) {
        res.render("home");
      } else {
        res.send("Wrong password");
      }
    } else {
      res.send("User not found");
    }
  } catch (error) {
    console.log(error.message);
    res.send("Error occurred during login");
  }
});


// app.post("/login",async (req,res)=>
// {
//     try{
        
//         const check=await Collection1.findOne({emailId:req.body.emailId})

//         if(check.password===req.body.password)
//         {
//             res.render("home");
//         }
//         else{
//             res.send("wrong password");
//         }
//     }
//     catch{
//         res.send("wrong details");
//     }
// })
//     
// await collection.insertMany([data]);// syntax for mongodb ;it will create data and fill it in mongodb
// res.render("home");


app.listen (3000,()=>{
    console.log ("port connect ");
})


