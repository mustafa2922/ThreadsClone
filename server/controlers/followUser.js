import { User } from "../Schema/userSchema.js";

const Follower = async ( req , res ) => {
    const {followerID , selectedID} = req.body;

    try{
        await User.findByIdAndUpdate(selectedID , {
            $push: { followers : followerID }
        });
        
        await User.findByIdAndUpdate(followerID,{
            $push:{ following : selectedID  }
        })

        res.status(200).send({status:"200",message:"user followed successfully"})
    }
    catch(error){
        console.log("Error occurred in Follower ----> ", error);
        res.status(500).send({status:"500" , message:"Error Following User"});
    };
}

export default Follower;