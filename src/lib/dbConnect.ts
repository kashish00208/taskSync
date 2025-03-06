import mongoose from "mongoose";
const dbConnect = async() =>{
    if(mongoose.connection.readyState >=1 ){
        return ;
    }
    try{
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("MongoDb Connected")
    }catch(error){
        console.log("Error while connecting the database",error)
    }
}
export default dbConnect