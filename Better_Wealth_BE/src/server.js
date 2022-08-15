const connect= require("./configs/db");

const app= require("./index");

const port= process.env.PORT || 3000;
//!   running server on port 3000

app.listen(port, async() => {

    try {

        await connect();
        console.log("Connected to port 3000");

    }catch(err) {
        
        console.log(err.message);

    }
})