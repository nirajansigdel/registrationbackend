const databaseconnector = require("../Config/db")

const nodemailer = require('nodemailer');
const fs = require('fs');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    // Configure the email transport settings (e.g., SMTP server details)
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'lottie.schowalter50@ethereal.email',
        pass: 'UeKPrjyGUNRTSFSBX5',
    },
});

// Function to send email
const sendMail = (email, otpCode) => {
    // Send mail with the defined transport object
    const mailOptions = {
        from: 'lottie.schowalter50@ethereal.email',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otpCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.messageId);
            console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        }
    });
};

// Function to generate OTP
const generateOTP = (length) => {
    const characters = '0123456789'; // Possible characters for the OTP
    let otp = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters[randomIndex];
    }

    return otp;
};



const forgetpassword = async (req, res) => {
    const otpCode = generateOTP(6); // Generate a new OTP
    const email = req.body.email; // Assign the recipient email address from the request body

    // Send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'lottie.schowalter50@ethereal.email', // Sender address
        to: "lottie.schowalter50@ethereal.email", // List of receivers
        subject: 'YOUR OTP CODE ✔', // Subject line
        text: otpCode, // Plain text body
        // html: `<b>${otpCode}</b>`, // HTML body if needed
    });

    console.log('Message sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

    res.status(200).json({ message: 'OTP code sent successfully.', otpCode });
};




// forgetformvalidation and creating the router

const forgetformvalidation = async (req, res) => {
    const {password} = req.body;
    try {
        const query = 'UPDATE registration SET password = ?';
        databaseconnector.connection.query(query, [password], (error, result) => {
            if (error) {
                return res.status(500).json({ message: "database connection error" })
            }
            return res.status(200).json({ message: "password  update sucessfully" })

        })

    }

    catch (error) {
        return res.status(404).json({ message: "internal server error" })

    }
}

module.exports = {
    sendMail,
    generateOTP,
    forgetpassword,
    forgetformvalidation
};
