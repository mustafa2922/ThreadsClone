import { User } from "../Schema/userSchema.js";

const GetUsers = async (req,res) => {
    try{
        const loggedInUserID = req.params.userID;
        const users = await User.find({ _id : {$ne : loggedInUserID}});
        console.log("Data retrieved successfully ")
        res.status(200).send({status:"200",message:"Data retrieved successfully",data:users})
    }
    catch(error){
        console.log("Error getting data ---> " , error)
        res.status(500).send({status:"500" , message : "Error getting the users " , err:error})
    }
}

export default GetUsers;