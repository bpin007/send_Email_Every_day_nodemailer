//Why i created this API

//  I created this API because three weeks ago, I had an interview that
//  consisted of two rounds. I did very well and was confident that I would be
//  selected, but I didn't get the job. I had no issue with not being selected,
//  but my issue was with the lack of communication.
//  They didn't even update me to say I didn't do well in the interview or that I wasn't a good fit for the role.
//  Something, anything, would have been appreciated.
//  This isn't the first time I've faced this issue,
//  so I created this API to send weekly emails until I get a reply or get blocked.
//  It's just for fun though 😂.

require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const cron = require("node-cron");

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors("*"));

// Function to send emails
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

// Cron job to send email every Friday at 12:15 pm
cron.schedule("15 12 * * 5", () => {
  console.log("Sending email every Friday at 12:15pm...");
  const options = {
    to: "soumarthabanerjee@navneettoptech.com",
    from: process.env.EMAIL_USER,
    subject: "Follow-Up on SDE-1 Interview",
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
