const express = require ("express");
const router = express.Router();

//Index route--USERS
router.get("/",(req,res)=> {
    res.send("GET for users! ");
});

//show route - users
router.get("/:id",(req,res)=> {
    res.send("GET for user id! ");
});

//new POST route - users
router.post("/",(req,res)=> {
    res.send("POST for users! ");
});

//new DELETE route - users
router.post("/:id",(req,res)=> {
    res.send("DELETE for user id! ");
});

module.exports = router;

