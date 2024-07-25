const { onRequest } = require("firebase-functions/v2/https");
const { transporter } = require("./my-nodemailer");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.sendPostNotification = onRequest({ cors: false }, async (req, res) => {
  const clubId = req.body.clubId;

  if (!clubId) {
    return res.status(400).send("Missing test identifier");
  }

  try {
    const clubDocRef = db.collection("clubs").doc(clubId);

    const clubDoc = await clubDocRef.get();
    const clubData = clubDoc.data();

    if (!clubData) return;

    const clubLeaders = clubData.club_leaders.map((leader) => leader.email);

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: clubLeaders,
      subject: `New post in ${clubData.club_name}`,
      text: `You have a new post in the ${clubData.club_name} forum. Check it out!`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email send successfully");
  } catch (error) {
    console.error("Error sending email", error);
    res.status(500).send(error.toString());
  }
});
