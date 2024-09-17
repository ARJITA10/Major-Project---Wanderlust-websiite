const express = require ("express");
const router = express.Router();

//Index route--POST
router.get("/posts",(req,res)=> {
    res.send("GET for posts! ");
});

//show route 
router.get("/posts/:id",(req,res)=> {
    res.send("GET for post id! ");
});

//new POST route - users
router.post("/posts",(req,res)=> {
    res.send("POST for posts! ");
});

//new DELETE route - users
router.post("/posts/:id",(req,res)=> {
    res.send("DELETE for post id! ");
});

module.exports = router;
