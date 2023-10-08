const express = require("express");
const router = express.Router();
const client = require("../grpc_client"); //grpc client

router.post("/addCase", (req, res) => {

    //get data
    const caseObj = {
        name: req.body.name,
        location: req.body.location,
        age: req.body.age,
        infected_type: req.body.infected_type,
        state: req.body.state
    }

    //use the rpc service function in proto
    client.AddCase(caseObj, (err, response) => {
       res.status(200).json({
        message: response.message
       }); 
    });

});

router.get("/listcases", (req, res) => {
    const rows = [
        {
            name: "test 1",
            location: "test location",
            age: 23,
            infected_type: "infected typr",
            state: "test state"
        }
    ];
    
    //use the rpc service function in proto
    const call = client.ListCases();
    
    call.on("data", (data) => {
        rows.push(data);
    });

    call.on("end", () => {
        console.log("Data received successfully");
        res.send(rows); //send data to frontend
    });

    call.on("error", (err) => {
        console.log(`Error : ${err}`);
    })


});

module.exports = router;