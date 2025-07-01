// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.routes.js"; // ✅ Import routes

dotenv.config({
  path: "./env",
});

const app = express();

app.use(express.json()); // ✅ Middleware to parse JSON

// ✅ Mount the user routes
app.use("/api/v1/users", userRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed", err);
  });


// import express from "express";
// const app = express()

// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI} /${DB_NAME} `)
//         app.on("error",(error)=>{
//             console.log("ERROR:",error);
//             throw error
//         })

//         app.listen(process.env.PORT, () =>{
//             console.log(`App is listening on port ${process.env.PORT}`);
            
//         })
//     }catch(error){
//         console.log('ERROR: ', error)
//         throw error
//     }

// })()