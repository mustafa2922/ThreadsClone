import { User } from "../Schema/userSchema.js";

const Verifier = async (req, res) => {
    try {
        const token = req.params.token;

        // finding user whose from URL's token
        const user = await User.findOne({ VerificationToken: token });

        if (!user) {
            return res.status(404).send({ status: '404', message: 'Invalid Token' });
        };

        // updating user's state
        user.verified = true;
        user.VerificationToken = null;
        await user.save();

        return res.status(200).send({status:'200',message:'User Verified Successfully'})
    }
    catch(error){
        console.log('Error in Verifying Email : ', error);
        return res.status(500).send({status:'500',message:'Error in Verifying Email'})
    }
};

export default Verifier;