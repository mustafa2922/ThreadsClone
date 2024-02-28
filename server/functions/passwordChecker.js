import bcrypt from 'bcrypt';

const CheckPassword = async (password, hash) => {
    try {
        const isMatched = await bcrypt.compare(password, hash);
        return isMatched;
    }
    catch (err) {
        return false
    }
}

export default CheckPassword;