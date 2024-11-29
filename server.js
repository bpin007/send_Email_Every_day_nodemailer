require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const cron = require("node-cron");

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors("*"));

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail(options);
  console.log("Sent:", options);
};

const sendEmailToUser = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptionsTwo = {
    to: options.email,
    from: process.env.EMAIL_USER,
    subject: "Thanks for Subscribing!",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1>Thanks for Subscribing!</h1>
      <p>Hello!</p>
      <p>Thank you for subscribing to our updates. I’m excited to have you on board and to keep you informed about the latest trends and insights in frontend development.</p>
      <p>You'll receive updates on:</p>
      <ul>
        <li>The latest frontend tools and techniques</li>
        <li>New blog posts on best practices</li>
        <li>And much more!</li>
      </ul>
      <p>Stay connected with me on social media:</p>
      <p>
  <a href="https://www.linkedin.com/in/bipin-k-807401203/" style="margin-right: 8px;">
    LinkedIn
  </a>
  <a href="https://www.instagram.com/b_pin_007/" style="margin-right: 8px;">
    Instagram 
  </a>
  <a href="https://github.com/bpin007" style="margin-right: 8px;">
     GitHub 
  </a>
  <a href="https://wa.me/7090326602" style="margin-right: 8px;">
     WhatsApp 
     </a>
      </p>
      <p>Looking forward to sharing valuable content with you!</p>
      <p>Best regards,</p>
      <p>Bipin</p>
    </div>
  `,
  };

  await transporter.sendMail(mailOptionsTwo);
  console.log("Sent:", mailOptionsTwo);
};

cron.schedule("0 11 * * *", () => {
  console.log("Sending email every 11am...");
  // Define the email options (recipient, subject, etc.)
  const options = {
    to: "mithagowda007@gmail.com",
    from: process.env.EMAIL_USER,
    subject: "Scheduled Email Update",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
    <p>Dear Soumartha,</p>
    <p>I hope you’re doing well. I wanted to follow up on the status of my application for the SDE-1 position following my interview on 12/11/2024. I remain very excited about the opportunity to join Navneeth-Toptech.</p>
    <p>I understand that these decisions can take time, and I appreciate all the effort involved in the process. If you have any updates, I would be grateful if you could let me know.</p>
    <p>Thank you again for your time and consideration. I look forward to hearing from you.</p>
    <p>Best regards,</p>
    <p>Bipin K</p>
    </div>
  `,
  };

  sendEmail(options).catch((err) => console.error("Error sending email:", err));
});

app.get("/", (req, res) => {
  res.status(200).send({ message: "welcome folks" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
