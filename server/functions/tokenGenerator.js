import jwt  from 'jsonwebtoken';

const Tokenizer = (dataObj) =>{
    return jwt.sign(dataObj , 'mustafa')
};

export default Tokenizer;