import mongoose from "mongoose";

export const dbConnection =()=>{
    mongoose.connect(
        "mongodb+srv://raushanikumari5273:raushanik5273@cluster0.mkrhw3h.mongodb.net/?retryWrites=true", 
        {dbName: "EVENT_360"}).then(() =>{
        console.log("Connected to database..")
    }).catch(err=>{
        console.log("Some error occured while connecting to database:", err);

    });
}