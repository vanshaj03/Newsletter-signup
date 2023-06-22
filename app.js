 const express = require("express");
 const bodyparser = require("body-parser");
 const request = require("request");
 const https = require("https");

 const app = express();

 app.use(express.static("public"))
 app.use(bodyparser.urlencoded({extended:true}))

 app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
 })
 
 
 app.post("/", function(req, res){
    const firstname =req.body.fName;
    const lastname = req.body.lName;
    const email = req.body.email;
    
    var data ={
        members:  [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname            
                }
            }
        ]
    };
    var Jsondata = JSON.stringify(data)

    // console.log(firstname+ lastname+email);
    const url ="https://us13.api.mailchimp.com/3.0/lists/b60e22e296";
    const options={
        method: "POST",
        auth: "vanshaj12:d693ee5439fb74ec45c1584b30db15aa-us13"

    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){

            if (response.statusCode==200){
                res.sendFile(__dirname+"/success.html")
            }
            else {
                res.sendFile(__dirname+"/failure.html")
            }
            console.log(JSON.parse(data));
        })  
    
       
    })
    request.write(Jsondata);
    request.end();


 })

 app.post("/failure", function(req, res){
    res.redirect("/")
 })

 app.listen(process.env.PORT || 3000, function(){
    console.log("port is listening");
 })
