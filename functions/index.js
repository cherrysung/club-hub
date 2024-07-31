const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');

admin.initializeApp();
const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// send email to club leaders when new post created on club forum
exports.sendPostNotification = onDocumentCreated(
  'clubs/{clubId}/posts/{postId}',
  async (event) => {
    const snapshot = event.data;

    if (!snapshot) {
      console.error('No data associated with the event');
      return;
    }

    try {
      const postData = snapshot.data();
      const { clubId } = event.params;

      const clubDocRef = db.collection('clubs').doc(clubId);
      const clubDoc = await clubDocRef.get();
      const clubData = clubDoc.data();

      if (!clubData) {
        console.error(`Club doc does not exist for clubId: ${clubId}`);
        return;
      }

      // array of leader emails
      const clubLeaders = clubData.club_leaders.map((leader) => leader.email);

      if (clubLeaders.length === 0) {
        console.error(`Leader emails not found for clubId: ${clubId}`);
        return;
      }

      const { authorEmail, content } = postData;
      // Don't send email if author is a leader
      if (clubLeaders.includes(authorEmail)) {
        return;
      }

      const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: clubLeaders,
        subject: `New post in ${clubData.club_name}`,
        html: `
        <p>You have a new post in the ${clubData.club_name} forum:</p>
        <br/>
        <p style="padding: 12px; border-left: 3px solid #d0d0d0; font-style: italic;">${content}</p>
        <br/>
        <p>Check it out!</p>
      `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error.toString());
          return;
        }
        console.log(`Email sent successfully: ${info.response}`);
      });
    } catch (error) {
      console.error('Error sending email', error);
    }
  }
);
