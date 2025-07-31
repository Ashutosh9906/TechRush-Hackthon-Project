const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASS,
    }
});

async function sendOtp(OTP, recipientEmail) {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: recipientEmail,
        subject: 'OTP for email verification',
        text: `Dear Customer,

Thank you for choosing **Crescent Bank**.

Your One-Time Password (OTP) for email verification is:

🔐 OTP : ${OTP}

This OTP is valid for **5 minutes** and can only be used once.

> ⚠️ Please do not share this OTP with anyone. Crescent Bank will never ask for your OTP over email, phone, or message.

If you did not request this, please ignore this email.

Regards,  
**Team Crescent Bank**  
Secure. Simple. Smart.
`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email Sent:', info.response);
    } catch (error) {
        console.error('❌ Email Send Error:', error);
    }
};

module.exports = {
    sendOtp
}