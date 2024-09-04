const express = require("express");
const studentRoutes = require("./src/student/routes");
const app = express();
const port = 3000;


app.get('/',(req,res)=>{
    res.json({message:"Its working...."});
})

app.use(express.json());

app.use('/api/v1/students',studentRoutes);


app.listen(port,()=>{
    console.log(`On port ${port}`);
})