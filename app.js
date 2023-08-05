//jshint esversion: 6 
const express = require("express");
const request = require("request");
const bodyParse = require("body-parser");
const https =require("https");

const app= express();

app.use(express.static("public"));
app.use(bodyParse.urlencoded(true));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };

    const jsondata =JSON.stringify(data);

    const url="https://us8.api.mailchimp.com/3.0/lists/9ecc2a1bf9";

    const option =
    {
        method:"POST",
        auth: "krishna1:e3bfa881bf0a4210026ec97d57f64fdd-us8"
}
  const request=  https.request(url,option,function(response){

if(response.statusCode===200){
res.sendFile(__dirname +"/success.html");
}
else{
res.sendFile(__dirname+"/failure.html");
}

    response.on("data",function(data){
console.log(JSON.parse(data));
    })
})
request.write(jsondata);
request.end();

});

app.post("/failure", function(req,res){
res.redirect("/");
});

app.listen(process.env.PORT|| 3000,function(req,res){
console.log("server is running on port 3000");
});

//e3bfa881bf0a4210026ec97d57f64fdd-us8
//list id :  9ecc2a1bf9.