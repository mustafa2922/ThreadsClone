import nodemailer from 'nodemailer';


const sendVerificaionEmail = async (email, VerificationToken) => {
    // creating transporter

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'mustafaraza6372@gmail.com',
            pass: 'zwzc rvdo jxlv mkbk'
        }
    });

    const mailOptions = {
        from:'mustafaraza6372@gmail.com',
        to:email,
        subject:'Email Verification',
        text:`Please click the following link to verify your Account http://192.168.0.127:8000/api/verify/${VerificationToken}`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        if (error.response && error.responseCode === 550) {
            console.log(`Error: The email address ${email} does not exist.`);
            // You might want to handle this case differently, e.g., inform the user or log it for analysis.
        } else {
            console.log('Error in sending email:', error);
        }
    }
};

export default sendVerificaionEmail;