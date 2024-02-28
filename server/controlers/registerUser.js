import { User, UserSchemaValidator } from "../Schema/userSchema.js";
import * as crypto from 'crypto';
import Hasher from "../functions/passwordHasher.js";
import sendVerificaionEmail from "../functions/emailSender.js";
import Tokenizer from "../functions/tokenGenerator.js";

const RegisterUser = async (req, res) => {

    UserSchemaValidator.validateAsync(req.body)
    .then( async ()=>{
        try{

            const {name , email , imageURL } = req.body;
            const password = await Hasher(req.body.password);

            const isUserExist = await User.findOne({email});
            if (isUserExist) {
                return res.status(400).send({status:400 , message:"Email Already Registerd"});
            }

            // creating new User
            const newUser = new User({name , email , password , imageURL});

            // generating and storing verification token
            newUser.VerificationToken = crypto.randomBytes(20).toString('hex');

            // saving user in backend
            await newUser.save();

            // sending verification email to user
            await sendVerificaionEmail(newUser.email , newUser.VerificationToken);

            const userId = newUser._id
            const jwtToken = await Tokenizer({email:email , userId:userId});
            return res.status(200).send({status:'200',message:'Registeration Successfull !!',token:jwtToken});

        }
        catch(error){
            return res.status(500).send({status: '500' ,message: `Error registering User`});
        }
    })
    .catch((err)=>{
        const errorString = err.details[0].message;
        return res.status(400).send({ status: 400, type: "Validation Error", message: errorString });    })

};

export default RegisterUser;