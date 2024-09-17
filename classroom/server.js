const express = require("express");
const app = express();
const user = require("./routesdemo/user.js");
const post = require("./routesdemo/post.js");
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// app.use(cookieParser("secretcode"));

// //SEND SIGNED COOKIES
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});//color , red
//     res.send("signed Cookie has been set");//done!
// });

// //VERIFY SIGNED COOKIES
// app.get("/verify",(req,res)=>{
//     console.log(req.cookies);//UNSIGNED
//     console.log(req.signedCookies);//SIGNED COOKIE
//     res.send("verified");
// });

// app.get("/getcookies",(req,res)=>{
//    // res.cookie("greet","hello");
//     res.cookie("madein","India");
//     //origin
//     res.cookie("greet","Namaste");
//     res.send("we sent you some/a cookies ");
// });

// app.get("/greet",(req,res)=>{
//     let{name = "anonymous"} = req.cookies;
//     res.send(`hello, ${name} `);
// });

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi, I am root! ");
// });


// // //Index route--USERS
// // app.get("/users",(req,res)=> {
// //     res.send("GET for users! ");
// // });

// // //show route - users
// // app.get("/users/:id",(req,res)=> {
// //     res.send("GET for user id! ");
// // });

// // //new POST route - 
// // app.post("/users",(req,res)=> {
// //     res.send("POST for users! ");
// // });

// // //new DELETE route - users
// // app.post("/users/:id",(req,res)=> {
// //     res.send("DELETE for user id! ");
// // });

// //--------------------------------------------------------------------//
// // //Index route--POST
// // app.get("/posts",(req,res)=> {
// //     res.send("GET for posts! ");
// // });

// // //show route 
// // app.get("/posts/:id",(req,res)=> {
// //     res.send("GET for post id! ");
// // });

// // //new POST route - users
// // app.post("/posts",(req,res)=> {
// //     res.send("POST for posts! ");
// // });

// // //new DELETE route - users
// // app.post("/posts/:id",(req,res)=> {
// //     res.send("DELETE for post id! ");
// // });

// app.use("/posts",post);


//app.use(session({
    // secret: "mysupersecretstring",
    // resave: false,
    // saveUninitialized: true,
    // cookie: { secure: true }
// }));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

// app.get("/test",(req,res)=>{
//     res.send("test successful!");
// });

// app.get("/reqcount",(req,res)=>{
//     // req.session.count = 1;
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// });

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register",(req,res)=>{//?name=arjita
    let {name="anonymous"} = req.query;
    req.session.name = name;
  //  console.log(req.session.name);
   // res.send(name);
   if(name === "anonymous"){
      req.flash("error","user not registered!");
   } else {
      req.flash("success","user registered successfully!");
   }
   res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
   // res.send(`hello, ${req.session.name}`);
   // console.log(req.flash("success"));
   res.locals.successMsg = req.flash("success");
   res.locals.errorMsg = req.flash("error");
   res.render("page.ejs", {name : req.session.name});//, messages : req.flash("success")
});

app.listen(3000,() => {
    console.log("Server is running/listening on port 3000");
});

