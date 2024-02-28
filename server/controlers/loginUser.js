import CheckPassword from "../functions/passwordChecker.js";
import { User } from "../Schema/userSchema.js";
import Tokenizer from "../functions/tokenGenerator.js";

const LoginUser = async (req , res) => {
    try{
        const {email , password} = req.body;
        
        const user = await User.findOne({email});
        
        if (!user){
            return res.status(404).send({status:'404',message:'User does not exist'});
        }
        
        const cryptedPassword = user.password;
        const isCorrectPassword = await CheckPassword(password,cryptedPassword);

        if (!isCorrectPassword){
            return res.status(401).send({status:'401',message:'Incorrect Password'});
        }

        const userId = user._id
        const jwtToken = await Tokenizer({email:email , userId:userId});
        return res.status(200).send({status:'200',message:'Login successfull',token:jwtToken});

    }
    catch(error){
        return res.status(500).send({status:'500',message:'Login failed '})
    }
};

export default LoginUser;