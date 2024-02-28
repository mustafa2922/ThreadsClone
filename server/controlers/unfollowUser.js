import { User } from "../Schema/userSchema.js";

const Unfollower = async (req, res) => {
    const { unfollowerID, selectedID } = req.body;
    try {

        await User.findByIdAndUpdate(selectedID, {
            $pull: { followers: unfollowerID }
        })

        await User.findByIdAndUpdate(unfollowerID, {
            $pull: { following: selectedID }
        })

        res.status(200).send({status:"200",message:"user unfollowed successfully"})
    }

    catch (error) {
        console.log("Error occurred in Unfollower --->", error)
        res.status(500).send({status:"500",message:"Error unfollowing user"})
    }

}

export default Unfollower;