import bcrypt from 'bcrypt';

const Hasher = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt)
    return hash;
}

export default Hasher
