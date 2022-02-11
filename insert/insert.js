//import modules
const express = require('express')
let mongodb = require('mongodb')
//create mongo client
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//import url
let url = require("../url")
//create rest api
router.post("/",(req,res)=>{
    let p_id = req.body.p_id
    let p_name = req.body.p_name
    let p_cost = req.body.p_cost
    let obj = {
        "p_id" : p_id,
        "p_name" : p_name,
        "p_cost" : p_cost
    }
    mcl.connect(url,(err,conn)=>{
        if(err)
        {
            console.log("Error in connection:- ",err)
        }
        else
        {
            let db = conn.db("nodedb")
            db.collection("products").insertOne(obj,(err)=>{
                if(err)
                {
                    res.json({'insert':'failed'})
                }
                else
                {
                    console.log("Data inserted")
                    res.json({'insert':'success'})
                }
            })
        }
    })
})
//export router
module.exports = router