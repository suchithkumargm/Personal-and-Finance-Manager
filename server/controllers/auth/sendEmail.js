// utils/sendEmail.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

export const sendEmail = async (recipientEmail, userName, token) => {
    const verificationLink = `http://localhost:5000/auth/user/verify-account?userName=${userName}&token=${token}`;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'gmail' or any other service
        auth: {
            user: EMAIL, // Your email
            pass: PASSWORD   // Your email password
        }
    });

    // Setup email data
    let mailOptions = {
        from: `"Personal and Finance Management" <${EMAIL}>`, // Sender address
        to: recipientEmail, // List of recipients
        subject: 'Verify your Account', // Subject line
        text: 'Please verify your account by clicking the link below', // Plain text body
        html: `<a href="${verificationLink}">Verify Account</a>` // HTML body
    };

    // Send mail with defined transport object
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve('Message sent');
            }
        });
    });
};
